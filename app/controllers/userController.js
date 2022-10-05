const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User} = require('../models/userSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/login', async (req, res) =>{


    let user = await User.findOne({userId: req.body.userId});
    isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if(isPasswordValid)
    {
            let userToken = await bcrypt.hash(user.userId, saltRounds); 
            let dbupdate = await User.updateOne({userId: user.userId},{token: userToken})
            res.send({
                responseCode: "000",
                description: "Login Successfull",
                token: userToken
            });
    }
    else
        res.send("Invalid Login");
    
})


module.exports = router;