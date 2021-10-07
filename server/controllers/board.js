const models = require('../models');
const { s3 } = require('../middlewares');
const logger = require('../config/winston');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { body, decoded, files } = req;
      const { title, content, hashtag } = body;
      const { userId } = decoded;
      if (title.trim() === '') {
        logger.warn('bad request');
        res.status(400).send('제목을 입력해주세요');
        return;
      }
      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const existHashtag = await models.hashtag.findHashtags({ hashtag });
      const fileteredHashtag = hashtag.filter((tag) => {
        const found = existHashtag.find((item) => item.name === tag);
        return found ? false : true;
      });
      if (fileteredHashtag.length > 0) {
        await models.hashtag.createHashtags({
          hashtag: fileteredHashtag,
        });
      }
      const hashtags = await models.hashtag.findHashtags({ hashtag });
      const hashtagIds = hashtags.map((tag) => tag.id);

      const data = await models.board.createPost({
        id: user.id,
        title,
        content,
      });
      const boardId = data.insertId;
      await models.hashtag.insertBoardAndHashtag({ boardId, hashtagIds });

      if (files.length > 0) {
        const images = files.map((file) => ({
          url: file.location,
          name: file.key,
        }));
        await models.board.insertImages({ images, boardId });
      }
      const images = files.length > 0 ? files.map((file) => file.location) : [];

      logger.info('success');
      res
        .status(200)
        .send({ id: boardId, title, hashtag: hashtags, content, images });
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  getPost: async (req, res) => {
    try {
      const { params } = req;
      const { id } = params;
      const [post] = await models.board.findFullPostDataById({ id });
      const hashtag = await models.hashtag.findBoardHashtags({
        boardIds: [post.id],
      });
      const images = await models.board.getImagesUrlAndName({ boardId: id });
      if (post) {
        logger.info('success');
        res.status(200).send({ post: { ...post, hashtag, images } });
        return;
      } else {
        logger.warn('post not found');
        res.status(404).send('존재하지 않는 게시물');
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  updatePost: async (req, res) => {
    try {
      const { body, params, decoded, files } = req;
      const { images } = body;
      const { title, content, hashtag } = body;
      const { id } = params;
      const { userId } = decoded;

      if (title.trim() === '') {
        logger.warn('bad request');
        res.status(400).send('제목을 입력해주세요');
        return;
      }

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const postHashtags = await models.hashtag.findBoardHashtags({
        boardIds: [id],
      });
      const deletedHashtag = postHashtags.filter((tag) => {
        const found = hashtag.find((item) => item === tag.name);
        return found ? false : true;
      });
      // 해당 게시글에 없던 해시태그
      const fileteredHashtag = hashtag.filter((tag) => {
        const found = postHashtags.find((item) => item.name === tag);
        return found ? false : true;
      });
      if (deletedHashtag.length > 0) {
        const hashtagIds = deletedHashtag.map((tag) => tag.id);
        await models.hashtag.deleteBoardHashtag({ hashtagIds });
      }
      if (fileteredHashtag.length > 0) {
        // 기존 db에 저장되어 있던 해시태그
        const storedHashtags = await models.hashtag.findHashtags({
          hashtag: fileteredHashtag,
        });
        // db에 없는 해시태그
        const newHashtags = fileteredHashtag.filter((tag) => {
          const found = storedHashtags.find((item) => item.name === tag);
          return found ? false : true;
        });
        if (newHashtags.length > 0) {
          await models.hashtag.createHashtags({
            hashtag: newHashtags,
          });
        }
      }

      const hashtags = await models.hashtag.findHashtags({ hashtag });
      const addedHashtags = hashtags.filter((tag) => {
        const found = fileteredHashtag.find((item) => item === tag.name);
        return found ? true : false;
      });
      if (addedHashtags.length > 0) {
        const hashtagIds = addedHashtags.map((tag) => tag.id);
        await models.hashtag.insertBoardAndHashtag({
          boardId: foundPost.id,
          hashtagIds,
        });
      }

      const [foundPost] = await models.board.findPostById({ id });
      if (foundPost.userId !== user.id) {
        logger.warn('forbidden');
        res.status(403).send('유효하지 않은 요청');
        return;
      }
      await models.board.updatePost({ title, content, id });

      const resultHashtag = await models.hashtag.findBoardHashtags({
        boardIds: [foundPost.id],
      });
      console.log(resultHashtag);

      // 이미 존재하는 이미지 수정 처리
      const postedImages = !images
        ? []
        : typeof images === 'string'
        ? [images]
        : images;
      const imageNames = postedImages.map((image) => {
        const splittedUrl = image.split('/');
        return splittedUrl[splittedUrl.length - 1];
      });
      const savedImages = await models.board.getImages({ boardId: id });
      const deletedImages = savedImages.filter(
        (image) => !imageNames.includes(image.name)
      );
      if (deletedImages.length) {
        const keys = deletedImages.map((image) => ({ Key: image.name }));
        await models.board.deleteImagesById({ images: deletedImages });
        s3.deleteObjects(
          {
            Bucket: 'crudprojectimage',
            Delete: {
              Objects: [...keys],
            },
          },
          function (err, data) {
            if (err) {
              throw new Error(err.stack);
            }
          }
        );
      }

      // 새 이미지 업로드
      if (files.length > 0) {
        const images = files.map((file) => ({
          url: file.location,
          name: file.key,
        }));
        await models.board.insertImages({ images, boardId: id });
      }

      logger.info('success');
      res.status(200).send({
        id,
        title,
        content,
        images: [...postedImages, ...files.map((file) => file.location)],
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  deletePost: async (req, res) => {
    try {
      const { params, decoded } = req;
      const { id } = params;
      const { userId } = decoded;

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const [post] = await models.board.findPostById({ id });
      if (post.userId !== user.id) {
        logger.warn('forbidden');
        res.status(403).send('유효하지 않은 요청');
        return;
      }

      await models.board.deletePost({ id });
      logger.info('success');
      res.status(200).send('게시글 삭제 성공');
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  getPostList: async (req, res) => {
    try {
      const { query } = req;
      const { page, pageSize, search } = query;
      const [totalItemNumber] = await models.board.getPostsCount({ search });
      const totalItems = totalItemNumber['COUNT(*)'];
      const totalPages = Math.ceil(totalItems / pageSize);

      const post = await models.board.getPostList({
        start: page * pageSize,
        pageSize,
        search,
      });

      const boardIds = post.map((item) => item.id);
      const hashtags = await models.hashtag.findBoardHashtags({ boardIds });

      const posts = post.map((item) => {
        const { id } = item;
        const postHashtags = hashtags.filter((tag) => tag.boardId === id);
        return { ...item, hashtag: postHashtags };
      });

      const pagination = {
        page: Number(page),
        pageSize: Number(pageSize),
        totalItems,
        totalPages,
      };
      logger.info('success');
      res.status(200).send({ posts, pagination });
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
};
