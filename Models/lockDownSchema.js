const { model, Schema } = require("mongoose")

module.exports = model("lockDownData", 
new Schema({
    Guild: String,
    Channel: String,
    Reason: String,
    Time: String
}))