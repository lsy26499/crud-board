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
      const [post] = await models.board.findPostById({ id });
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
      res.status(200).send('123');
    } catch (error) {}
  },
  deletePost: async (req, res) => {
    try {
      res.status(200).send('123');
    } catch (error) {}
  },
  getPostList: async (req, res) => {
    try {
      res.status(200).send('123');
    } catch (error) {}
  },
};
