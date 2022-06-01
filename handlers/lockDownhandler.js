const client = require("../index")
const DB = require("../Models/lockDownSchema")

module.exports = async(client) => {
    DB.find().then(async (documentsArray) =>  {
        documentsArray.forEach((d) => {
            const Channel = client.guilds.cache.get(d.Guild).channels.cache.get(d.Channel)

            if(!Channel) return;

            const TimeNow = Date.now();

            if(d.Time < TimeNow )
            return Channel.permissionsOverwrites.edit(d.Guild, {
                SEND_MESSAGES: null
            })
            const ExpireDate = d.Time - Date.now();

            setTimeout(async() => {
                Channel.permissionsOverwrites.edit(d.Guild, {
                    SEND_MESSAGES: null
                })
                await DB.deleteOne({ Channel: Channel.id });
            }, ExpireDate)
        })
    })
}