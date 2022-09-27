const express = require('express');
const router = express.Router();

router.get('/pay', (req, res) => {
    console.log("Payment Transaction");
    res.send("Payment Transactions");
});

router.get('/buy', (req, res) => {
    console.log("Buy Transaction");
});

module.exports = router;