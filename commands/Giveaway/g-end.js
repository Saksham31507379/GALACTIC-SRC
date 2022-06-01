const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const manager = require('../../events/giveawayClient')
const client = require('../../index')

module.exports = new Command({
    name: 'g-end',
    description: `End's a Giveaway in Your Server`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: 'messageid',
            description: `Msg id of the giveaway to be ended`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const messageid = interaction.options.getString('messageid')

        manager.end(messageid).then(() => {
            interaction.followUp('Success! Giveaway ended!');
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }
})