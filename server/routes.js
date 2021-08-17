const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/signin', controllers.signIn);
router.post('/signup', controllers.signUp);
router.get('/check-email', controllers.checkIsEmailExist);
router.post('/signout', controllers.signOut);

module.exports = router;
