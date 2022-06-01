const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'clone-channel',
    description: `Makes A Copy/Clone Of A Channel`,
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
        const clone = interaction.guild.channels.cache.get(channel.id)
        console.log(`${clone.name} Was Cloned By ${interaction.user.tag} In ${interaction.guild.name}`)
        clone.clone(true)
        
        
        return interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`ff0000`)
                .setDescription(`Cloned channel | <#${clone.name}>`)
            ]
        })

    }
})