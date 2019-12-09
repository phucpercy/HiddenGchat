const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signinController');

// Sign In Routes //
router.get('/signin', signinController.signin);