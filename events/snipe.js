const client = require("../index")
const snipe = require("../Models/snipeSchema")

client.on("messageDelete", async(message) => {
    let data = await snipe.findOne({ channelId: message.channelId })

    if(!data){
        let newdata = new snipe({
            channelId: message.channelId,
            message: message.content,
            author: message.author.tag,
            time: Math.floor(Date.now() / 1000)
        })

        return await newdata.save()
    }
    await snipe.findOneAndUpdate({
        channelId: message.channelId,
        message: message.content,
        author: message.author.tag,
        time: Math.floor(Date.now() / 1000)
    })
})