const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
       Guild: String,
       levelUpChannel: String,
       levelUpMessage: String,
       NoExpRole: String
})

module.exports = mongoose.model('levelupSystemSchema', Schema)