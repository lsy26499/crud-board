const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/signin', controllers.signIn);
router.post('/signup', controllers.signUp);
router.post('/signout', controllers.signOut);

module.exports = router;
