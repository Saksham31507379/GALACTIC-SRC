const Levels = require('discord-xp')
const client = require('../index')
const schema = require('../Models/levelupSystemSchema')
const { MessageEmbed } = require("discord.js")
Levels.setURL("ur URL :D")

client.on("messageCreate", async (message) => {
  if(message.author.bot) return;
    
  schema.findOne({
    Guild: message.guildId,
  }, async(err, data) => {
    if(data){
      const randomAmountOfXp = Math.floor(Math.random() * 5) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      const levelupembed = new MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
      .setTitle(`Level Up!`)
      .setFooter(`This Message Would Be Deleted In 10 Seconds`)
      .addField(`Level`, `${user.level}`, false)
      .addField(`Xp`, `\`${user.xp}\``, false)
      .setDescription(`**Hey ${message.author} Congratulations You Have Leveled Up to ${user.level} Xp - ${user.xp}**`)
      const sentmsg = await message.channel.send({ content: `${message.author}`, embeds: [levelupembed] });
      setTimeout(() => {
        sentmsg.delete()
      }, 10000)
    }
    
    }
  })
  
  });