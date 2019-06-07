const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/sign-up', authController.getSignUp);

router.post('/login', authController.postLogin);

router.post('/sign-up', authController.postSignUp);

router.post('/logout', authController.postLogout);

module.exports = router;