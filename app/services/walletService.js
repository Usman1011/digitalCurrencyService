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
            

            let res = await Wallet.updateOne({walletId:walletId}, {"$inc": {balance: amount*(-1)}})
            if(res.acknowledged)
            {
                debitBalanceResponse = {
                isBalanceDebited: true,
                description: "Success"
                }
            }
            console.log("Balance Debited Successfully");
        }
        else
        {
            debitBalanceResponse = {
                isBalanceDebited: false,
                description: "InSufficient Balance"
            }
            console.log(debitBalanceResponse.description);

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

    console.log("getPackagePrice Method: ");
    let price = null;
    try
    {
        let res = await Package.findOne({package:package});
        price = res.price;
        return price;
    }
    catch (ex)
    {
        console.log("Error Fetching Price: " + ex); 
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

const mock =async (body) =>{

        console.log("Mock Service");
        let response = await axios({
        method: 'post',
        url: 'https://633c138ff11701a65f6e38ba.mockapi.io/api/v1/debitcard/card',
        data: {
          "cardNumber": body.cardNumber,
          "amount": body.amount
        }
        });

        console.log("ResponseCode: ");
        return response.data;
        
}
module.exports.mock = mock;
