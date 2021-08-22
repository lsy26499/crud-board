const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const { verifyJwt } = middlewares;

const boardRouter = express.Router();

boardRouter.post('/post', verifyJwt, controllers.board.createPost);
boardRouter.get('/post/:id', controllers.board.getPost);
boardRouter.patch('/post/:id', verifyJwt, controllers.board.updatePost);
boardRouter.delete('/post/:id', verifyJwt, controllers.board.deletePost);
boardRouter.get('/post-list', controllers.board.getPostList);

module.exports = boardRouter;
