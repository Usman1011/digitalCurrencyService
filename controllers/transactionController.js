const express = require('express');
const router = express.Router();


router.post('/pay', (req, res) =>{
    console.log("Pay Transaction");
    res.send("TransactionController");
})

module.exports = router;