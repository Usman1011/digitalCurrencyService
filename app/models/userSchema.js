const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    walletId: String,
    access: [],
    package: String,
    password: String,
    token: String
  });

const User = mongoose.model('users', userSchema);

module.exports.User = User;

