const express = require('express');
// const { login ,register } = require('../controller/authController');
const {login, register} =require('../controllers/authController.js')

const router = express.Router();
//  /auth is already added in base path
router.post('/login', login).post('/register', register);

exports.router = router;