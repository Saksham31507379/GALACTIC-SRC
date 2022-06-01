const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
      id: String,
      webhookid: String,
      webhooktoken: String,
      channel: String,
})

module.exports = mongoose.model('logSchema', Schema)