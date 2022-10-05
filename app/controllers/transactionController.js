const express = require('express');
const router = express.Router();
const {isUserPremium} = require('../services/userService');
const {upgradeToPremium} = require('../services/userService');
const {debitBalance} = require('../services/walletService');
const {getPackagePrice} = require('../services/walletService');
const {creditBalance} = require('../services/walletService')

const {packages} = require('../constants/Wallet');
const {mock} = require('../services/walletService');
const { json } = require('express');

//Paying Through The Wallet to upgrade to Premium User
router.post('/upgradeuser', async (req, res) =>{

    console.log("Pay Transaction");

    if(await isUserPremium(req.userId))
        res.send("User Already Upgraded To Premium");    
    else
    {
        let price = await getPackagePrice(packages[1]);
        if(price)
        {
            var debitBalanceResponse = await debitBalance(req.walletId, price);
            if(debitBalanceResponse.isBalanceDebited)
            {
                var isUserUpgraded = await upgradeToPremium(req.userId);
                if(isUserUpgraded)
                res.json(
                    {
                            responseCode: 0,
                            description: "Success"
                    });
                else
                    res.send("Transaction Failed");
            }
            else
            {
                res.send("Transaction Failed: " + JSON.stringify(debitBalanceResponse.description));
            }
        }
        else
        {
            res.send("Price Not Configured In DB");
        }

        
    }
    
})


//Adding Money To The Wallet
router.post('/topup', async (req, res) =>{

    console.log("Topup Transaction");
    let {body} = req; 
    try
    {   
        let mockResponse = await mock(body);
        if(mockResponse.responseCode === "000")
        {
            let creditBalanceResponse = creditBalance(req.walletId, req.body.amount);
            if(creditBalanceResponse)
            {
                res.json(
                {
                        responseCode: 0,
                        description: "Success"
                });
            }
        }
        else
        {
            res.json(
                {
                    responseCode: mockResponse,
                    description: "Transaction Failed"
                });
        }
    }
    catch(ex)
    {
        res.send("TopUp Transaction Failed: " + ex);
    }
})

module.exports = router;