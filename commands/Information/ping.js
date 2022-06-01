const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed;
const config = require('../../config.json')
const Discord = require('discord.js')

module.exports = new Command({
  // options
  name: "ping",
  description: `get ping of bot`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    const ping = config.token
    // Code
    interaction.followUp({
      embeds: [
        new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`**Calaculating Bot's Current Ping...**`)
      ],
        ephemeral: true
      
    }).then((msg) => {
      msg.edit({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("BLUE")
          .addField(`Api Latency`, `\`\`\`js\n${client.ws.ping}\`\`\``, true)
        ],
          ephemeral: true
      })
    })
    console.log(`ping.js loaded`)
    
  },
});

