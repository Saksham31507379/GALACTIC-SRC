const schema = require('../Models/antilinkSchema')
const client = require('../index');
const { MessageEmbed, Permissions } = require('discord.js');

client.on("messageCreate", async(message) => {
  let links = ["https://", "www.", ".com", ".in", ".gift", "discrod."]
    if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
    schema.findOne({
        Guild: message.guild.id
      }, async(err, data) => {
        if(data){
            if(links.includes(message.content)){
           message.delete()
           let sentmsg = await message.channel.send({
             content: `${message.author}`,
             embeds: [
               new MessageEmbed()
               .setColor("BLUE")
               .setDescription(`Links are Disabled in this guild!`)
             ]
           })
           setTimeout(async() => {
             sentmsg.delete()
           }, 4000)
         }
        } else {
          return
        }
      })

})
