const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: `unhide`,
    description: `Unhide's A Channel`,
    userPermissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: 'channel',
            description: `Channel to be Unhided`,
            type: 'CHANNEL',
            required: false
        }
    ],
    run: async({ interaction }) => {
        let channel = interaction.options.getChannel('channel') || interaction.channel
        channel.type === "GUILD_VOICE"

        if(!channel.viewable){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(` 
                    <:sh_cross:958962612454961182> I Don't Have Access To ${channel}`)
                ]
            })
        }

        channel.permissionOverwrites.edit(interaction.guild.id, { VIEW_CHANNEL: true, CONNECT: true});

        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_tick:958961439853395988> ${channel} was Unhided Successfully!`)
            ]
        }) 
    } 
})