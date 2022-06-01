const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { userInfo } = require('os');

module.exports = new Command({
    name: 'avatar',
    
    ownerOnly: false,
    description: `Get's Avatar Of A User`,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["EMBED_LINKS"],
    options: [
        {
            name: 'user',
            description: 'select the user whose avatar u want',
            type: 'USER',
            required: true,
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user')
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`**[PNG](${user.avatarURL({dynamic: true, format: "png"})}) | [JPG](${user.avatarURL({dynamic: true, format: "jpg"})}) | [GIF](${user.avatarURL({dynamic: true, size: 1024, format: "gif"})}**`)
                .setTitle("User Avatar")
                .setAuthor({
                    name: `${user.tag}`,
                    iconURL: `${user.displayAvatarURL({dynamic: true})}`
                })
                .setImage(`${user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`)
            ]
        })
          interaction.channel.send({components:[row]})
    }
})