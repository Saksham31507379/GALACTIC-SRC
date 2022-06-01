const mongoose = require("mongoose")

const snipe = new mongoose.Schema({
    channelId: String,
    message: String,
    author: String,
    time: Number
})

module.exports = mongoose.model("snipeSchema", snipe)