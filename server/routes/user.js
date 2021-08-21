const express = require('express');
const controllers = require('../controllers');

const userRouter = express.Router();

userRouter.post('/signin', controllers.user.signIn);
userRouter.post('/signup', controllers.user.signUp);
userRouter.get('/find-id', controllers.user.findId);
userRouter.get('/check-user', controllers.user.findUserById);
userRouter.patch('/update-password', controllers.user.updatePassword);

module.exports = userRouter;
