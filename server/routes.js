const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/signin', controllers.signIn);
router.get('/signup', controllers.signUp);

module.exports = router;
