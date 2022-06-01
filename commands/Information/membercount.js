const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "membercount",
  description: `membercount of server`,
  userPermissions: ['SEND_MESSAGES'],
  botPermissions: ['SEND_MESSAGES'],
  premium: true,
  category: "Information",
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    interaction.followUp({embeds : [
        new MessageEmbed()
        .setColor("#ff000")
        .setDescription(`${interaction.guild.memberCount}`)
        .setTitle("Members")
        .setTimestamp()
        
    ]})
    console.log(`membercount.js loaded`)
  },
});