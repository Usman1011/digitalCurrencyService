const express = require('express');
const router = express.Router();
const {resolveToken} = require ('../services/userService');
const {authenticateUser} = require('../services/userService');


router.use('/digitalwallet', async (req, res, next) =>{
    console.log("Authentication MiddleWare");
    let token = req.get('user-id');
    let userId = resolveToken(token);

    let isUserAuthenticated = await authenticateUser(userId);
    if(isUserAuthenticated)
    {
        console.log("User Authenticated");
        next();
    }
    else
        res.send("User Not Authenticated");
    
});

module.exports = router;