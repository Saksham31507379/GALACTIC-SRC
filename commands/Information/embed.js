const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'embed',
    description: `Send's Embed Message`,
    premium: true,
    run: async({ client, interaction, args, prefix }) => {
        const simplydjs = require("simply-djs")
        simplydjs.embedCreate(interaction,{
            embedColor:"ff0000",
            credit: false
        })
        interaction.channel.send(`Check Your DM's ${interaction.user} To Know How To Use This Command`)

        interaction.user.send(`Hey ${interaction.user}, Looks Like You Don't Know How To use embed command`)
        interaction.user.send({
            embeds: [
                new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
                .setTitle(`To Use Embed`)
                .addFields(
                    {
                        name: 'Color',
                        value: `To Set Embed's Color Click On \`Color\` From Dropdown menu and Send Color's Code For Eg \`#ff0000\``,
                        inline: true
                    },
                    {
                        name: 'Title',
                        value: `To Set Title Select \`Title\` from Dropdown menu and Send Title Which you want to set`,
                        inline: false
                    },
                    {
                        name: 'Description',
                        value: `To Set Embed's Description Select \`Description\` from Dropdown menu and Send Description Which You Want to set`
                    },
                    {
                        name: 'Image/Thumbnail',
                        value: `To Set Embed's Image or Thumbnail Select \`Image\` or \`Thumbnail\` from Dropdown menu and send url of Image/Thumbnail Which you want to set`
                    },
                    {
                        name: 'Last Step',
                        value: `After You Are Done Click On \`Done\` Button And Delete The Message From Which You Were Controling The Embed`
                    }
                )
            ]
        })

    }
})