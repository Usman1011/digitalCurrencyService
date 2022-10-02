const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    walletId: Number,
    access: [],
    userMode: String
  });

const User = mongoose.model('users', userSchema);

module.exports.User = User;

