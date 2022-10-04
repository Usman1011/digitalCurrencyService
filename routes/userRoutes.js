const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.use('/', userController);

module.exports = router;