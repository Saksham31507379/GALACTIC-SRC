const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
       Guild: String,
       Member: String,
})

module.exports = mongoose.model('whitelistConfig', Schema)