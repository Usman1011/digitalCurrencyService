const mongoose = require('mongoose');

const packagesSchema = new mongoose.Schema({
    package: String,
    price: Number
  });

const Package = mongoose.model('packages', packagesSchema);

module.exports.Package = Package;

