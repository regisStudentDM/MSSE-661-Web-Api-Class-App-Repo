const express = require('express');
const controller = require('../controllers/auth.controller');

const authRoutes = express.Router()

authRoutes.post('/register', controller.registerUser); // http://localhost:3000/api/auth/register
authRoutes.post('/login', controller.login); // http://localhost:3000/api/auth/login

module.exports = authRoutes;