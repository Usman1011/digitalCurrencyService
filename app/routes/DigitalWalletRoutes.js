const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');


router.use('/transaction', transactionController);

module.exports = router;