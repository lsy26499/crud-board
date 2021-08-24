const models = require('../models');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { body } = req;
      const { id, title, content } = body;
      await models.board.createPost({ id, title, content });
      res.status(200).send('게시글 작성 성공');
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
      const { body, params } = req;
      const { author, title, content } = body;
      const { id } = params;
      const [post] = await models.board.findPostById({ id });
      if (post.author !== author) {
        res.status(403).send('유효하지 않은 요청');
        return;
      }
      await models.board.updatePost({ title, content, id });
      res.status(200).send('게시글 업데이트 성공');
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  deletePost: async (req, res) => {
    try {
      const { body, params } = req;
      const { author } = body;
      const { id } = params;
      const [post] = await models.board.findPostById({ id });
      if (post.author !== author) {
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
