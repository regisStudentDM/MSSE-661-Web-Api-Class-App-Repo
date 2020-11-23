const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

const userRoutes = express.Router()

userRoutes.get('/me', userController.getMe); // http://localhost:3000/api/user/me
userRoutes.post('/me/update', verifyToken, authController.updateUser); // http://localhost:3000/api/user/me/update

module.exports = userRoutes;