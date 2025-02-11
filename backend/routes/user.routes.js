const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authUser = require('../middleware/user.auth');

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/logout', authUser, userController.userLogout);

module.exports = router;