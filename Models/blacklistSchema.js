const mongoose = require("mongoose")

 let blacklist = new mongoose.Schema({
     User: String,
     Reason: String
 })

 module.exports = mongoose.model("blacklistSchema", blacklist)