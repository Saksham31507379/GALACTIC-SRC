const mongoose = require("mongoose")

let Schema = new mongoose.Schema({
    Guild: String,
    Command: String,
    Status: String
})

module.exports = mongoose.model("commandConfig", Schema)