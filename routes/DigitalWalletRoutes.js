const express = require('express');
const router = express.Router();
const transactionConroller = require('../controllers/transactionController.js');

// router.get('/pay', (req, res) => {
//     console.log("Payment Transaction");
//     res.send("Payment Transactions");
// });
// router.use('/transaction', authentication);
router.use('/transaction', transactionConroller);

module.exports = router;