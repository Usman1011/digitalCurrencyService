const {User} = require('../models/userSchema');


const resolveToken = async (token) =>{

    try
    {
        console.log("Resolve Token Function: " + token);
        user = await User.findOne({token:token});

    }
    catch(ex)
    {
        console.log("Failed To Resolve Token: " + ex)
    }
    
    return user;

};

module.exports.resolveToken = resolveToken;

const getUserInfo = async (userId) =>
{
    console.log("AuthenticateUser" + userId );
    let result = {
        isUserExist: false
    }
    try
    {
        result = await User.findOne({userId: userId})
        console.log("Result: " + result.walletId);
        if(result)
        {
            result.isUserExist = true;
        }
    }
    catch(ex)
    {
        console.log("Get User Info Error: " + ex);
    }
    return result;
    
}
module.exports.getUserInfo = getUserInfo;

const isUserPremium = async (userId) =>{
    console.log("isUserPremium Method");
    
    try
    {
        let res = await User.findOne({userId:userId});
        if(res.package === 'premium')
        {
            console.log("User is Already Set to Premium");
            return true;
        }
        
        return false;
    }
    catch(exception)
    {
        console.log("isUserPremium Method Error: " + exception);
        return false;
    }
}
module.exports.isUserPremium = isUserPremium;

const upgradeToPremium = async (userId)=> 
{
    console.log("UpgradeToPremium Method")
    let res = await User.updateOne({userId:userId},
        {
            package:"premium"
        })

    console.log(userId + " upgraded to premium: " + JSON.stringify(res.acknowledged)); 
    return res.acknowledged
}

module.exports.upgradeToPremium = upgradeToPremium;
