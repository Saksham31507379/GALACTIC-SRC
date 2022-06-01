const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'nuke-channel',
    description: `Nuke's A Channel`,
    userPermissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: 'channel',
            description: `Channel To Be Cloned`,
            type: 'CHANNEL',
            required: false
        }
    ],
    run: async({ interaction }) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel
        

        let clone = interaction.guild.channels.create(`${channel.name}`, {
            topic: `${channel.topic}`,
            type: "GUILD_TEXT"
        }).then((ch) => {
            ch.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`**This Channel Just Got Nuked!**`)
                    .addField(`Nuked By `, `\`${interaction.user.tag}\``)
                ]
            })
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor(`BLUE`)
                    .setDescription(`**${ch} was Nuked!**`)
                ]
            })
        })
        
        channel.delete();
        
        
        

    }
})