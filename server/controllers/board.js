const models = require('../models');

module.exports = {
  createPost: async (req, res) => {
    try {
      console.log(req);
      const { body, decoded, file } = req;
      const { post } = body;
      const parsedPost = JSON.parse(post);
      const { title, content, summary } = parsedPost;
      const { userId } = decoded;
      const imageUrl = file?.location ? file?.location : null;

      if (title.trim() === '') {
        res.status(400).send('제목을 입력해주세요');
        return;
      }

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const data = await models.board.createPost({
        id: user.id,
        title,
        content,
        summary,
        imageUrl,
      });
      res.status(200).send({ id: data.insertId });
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  getPost: async (req, res) => {
    try {
      const { params } = req;
      const { id } = params;
      const [post] = await models.board.findFullPostDataById({ id });
      if (post) {
        res.status(200).send({ post });
        return;
      } else {
        res.status(404).send('존재하지 않는 게시물');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  updatePost: async (req, res) => {
    try {
      const { body, params, decoded } = req;
      const { title, content, summary } = body;
      const { id } = params;
      const { userId } = decoded;

      if (title.trim() === '') {
        res.status(400).send('제목을 입력해주세요');
        return;
      }

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const [post] = await models.board.findPostById({ id });
      if (post.userId !== user.id) {
        res.status(403).send('유효하지 않은 요청');
        return;
      }
      await models.board.updatePost({ title, content, summary, id });
      res.status(200).send('게시글 업데이트 성공');
    } catch (error) {
      console.log(error);
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
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const [post] = await models.board.findPostById({ id });
      if (post.userId !== user.id) {
        res.status(403).send('유효하지 않은 요청');
        return;
      }

      await models.board.deletePost({ id });
      res.status(200).send('게시글 삭제 성공');
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  getPostList: async (req, res) => {
    try {
      const posts = await models.board.getPostList();
      res.status(200).send({ posts });
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
};
