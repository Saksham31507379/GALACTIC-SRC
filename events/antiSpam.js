const schema = require('../Models/antiMentionSchema')
const client = require('../index')

client.on("messageCreate", async(message) => {
  const member = message.guild.members.cache.get(message.author.id)
    if(member.permissions.has("MANAGE_MESSAGES")) return;
    schema.findOne({
        Guild: message.guild.id
      }, async(err, data) => {
        if(data){
             if(message.content.length >= 500){
           message.delete()
           let manimsg = await message.channel.send(`${message.author} Stop Spamming!`)
           setTimeout(() => {
            manimsg.delete()
        }, 3000);
           
         }
        } else {
          return
        }
      })

})
