const express = require('express');
const router = express.Router();
const {resolveToken} = require ('../services/userService');
const {getUserInfo} = require('../services/userService');


router.use('/digitalwallet', async (req, res, next) =>{
    console.log("Authentication MiddleWare: ");

    try
    {
        
        let token = req.get('x-authenticated-user-id');
        let user = await resolveToken(token);
        if(user)
        {
            req.userId = user.userId;
            req.walletId = user.walletId;
            next();
            
        }
        else
        {
            res.send("User Not Authenticated");
        }
    }
    catch(ex)
    {
        console.log("User Not authenticated: " + ex);
        res.send("User Not Authenticated: " + ex);
    }
    
});

module.exports = router;