const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const { verifyJwt, upload, s3DeleteImage, validateFiles, validateHashtags } =
  middlewares;

const boardRouter = express.Router();

boardRouter.post(
  '/post',
  verifyJwt,
  validateFiles,
  upload,
  validateHashtags,
  controllers.board.createPost
);
boardRouter.get('/post/:id', controllers.board.getPost);
boardRouter.patch(
  '/post/:id',
  verifyJwt,
  validateFiles,
  upload,
  validateHashtags,
  controllers.board.updatePost
);
boardRouter.delete(
  '/post/:id',
  verifyJwt,
  s3DeleteImage,
  controllers.board.deletePost
);
boardRouter.get('/post-list', controllers.board.getPostList);

module.exports = boardRouter;
