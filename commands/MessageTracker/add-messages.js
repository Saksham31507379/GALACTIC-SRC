const Messages = require("discord-messages")
const { MessageEmbed } = require("discord.js")
const { Command } = require("reconlx")
const client = require("../../index")

module.exports = new Command({
    name: `messages-subtract`,
    description: `Remove's Messages From A User`,
    options: [
        {
            name: `user`,
            description: `messages to be removed from`,
            type: "USER",
            required: true
        },
        {
            name: `amount`,
            description: `amount of messages to be removed`,
            type: 'INTEGER',
            required: true
        }
    ],
    userPermissions: ["MANAGE_GUILD"],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user')
        const amount = interaction.options.getInteger('amount')

        Messages.setMessages(user, interaction.guildId, amount);
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_Greentick:969629657001504880> Successfully Removed \`${amount}\`Messages from ${user.tag}`)
            ]
        })
    }
})