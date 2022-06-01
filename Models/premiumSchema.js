const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
       User: String,
       Time: String,
})

module.exports = mongoose.model('premiumSchema', Schema)