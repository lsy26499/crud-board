const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.post('/signin', controllers.signIn);
router.post('/signup', controllers.signUp);
router.get('/check-userId', controllers.checkIsIdExist);
router.get('/check-email', controllers.checkIsEmailExist);

module.exports = router;
