const {Wallet} = require('../models/walletSchema');
const {Package} = require('../models/packageSchema');
const axios = require('axios');


const debitBalance = async (walletId, amount) =>{

    let debitBalanceResponse = {}
    try
    {
        console.log("DebitBalance Method: ");
        let userWallet = await Wallet.findOne({walletId: walletId});
        if( userWallet.balance >= amount)
        {
            console.log("if Con")

            let res = await Wallet.updateOne({walletId:walletId}, {"$inc": {balance: amount*(-1)}})
            if(res.acknowledged)
            {
                debitBalanceResponse = {
                isBalanceDebited: true,
                description: "Success"
                }
            }
        }
        else
        {
            console.log("else Con")
            debitBalanceResponse = {
                isBalanceDebited: false,
                description: "InSufficient Balance"
            }
        }
        
        
    }   
    catch(exception)
    {
        console.log("DebitBalance Method Exception: " + exception);
        debitBalanceResponse = {
            isBalanceDebited: false,
            description: exception
        }
    }
    return debitBalanceResponse;
}
module.exports.debitBalance = debitBalance;

const getPackagePrice = async (package) =>{

    console.log("getPackagePrice Method: " + package);
    let price = null;
    try
    {
        let res = await Package.findOne({package:package});
        price = res.price;
        return price;
    }
    catch (ex)
    {
        console.log("Error Fetching Price" + ex); 
    }
}

module.exports.getPackagePrice = getPackagePrice;

const creditBalance = async (walletId, amount) =>{

    console.log("creditBalance Method: " + amount + " " + walletId);
    let response = false;
    try
    {
        let res = await Wallet.updateOne({walletId:walletId}, {"$inc": {balance: amount }})
        response = res.acknowledged;
    }
    catch (ex)
    {
        response = false
        console.log("Error Crediting Balance" + ex); 
    }
}

module.exports.creditBalance = creditBalance;

const mock =async (cardNumber) =>{

        console.log("Mock Service");
        let response = await axios({
        method: 'post',
        url: 'https://633c138ff11701a65f6e38ba.mockapi.io/api/v1/debitcard/card',
        data: {
          "cardNumber": cardNumber
        }
        });

        console.log("ResponseCode: " + response.data);
        return response.data;
        
}
module.exports.mock = mock;
