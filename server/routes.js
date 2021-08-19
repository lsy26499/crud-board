const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/signin', controllers.signIn);
router.post('/signup', controllers.signUp);
router.get('/find-id', controllers.findId);
router.get('/find-password', controllers.findPassword);

module.exports = router;
