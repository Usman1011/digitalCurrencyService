const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    walletId: String,
    balance: Number
  });

const Wallet = mongoose.model('user_wallets', walletSchema);

module.exports.Wallet = Wallet;

