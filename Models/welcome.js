const mongoose = require('mongoose')

const welcomeSchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
})

module.exports = mongoose.model("welcome", welcomeSchema)