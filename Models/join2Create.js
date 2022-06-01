const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
       Guild: String,
       Channel: String,
})

module.exports = mongoose.model('join2Create', Schema)