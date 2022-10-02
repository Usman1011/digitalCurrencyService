const {User} = require('../models/userSchema');


const resolveToken = (token) =>{

    console.log("Resolve Token Function: " + token);
    let userId = 'usman';
    return userId;

};

module.exports.resolveToken = resolveToken;

const authenticateUser = async (userId) =>
{
    console.log("AuthenticateUser");
    let flag = false;
    let result = await User.findOne({userId: userId})

    if(result)
    {
        return true;
    }
    return false;
    
}

module.exports.authenticateUser = authenticateUser;
