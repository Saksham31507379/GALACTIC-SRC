const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = new Command({
    name: 'reminder-set',
    description: `Set's A Reminder`,
    options: [
        {
            name: 'time',
            description: `Time to be reminded on`,
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: `Reason for the reminder`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const time = interaction.options.getString('time')
        const reason = interaction.options.getString('reason')
        const mstime = ms(time)

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_tick:958961439853395988> ** Reminder Set!**`)
                .addField(`Ends in`, `${mstime}`, true)
                .addField(`Reason`, `${reason}`, true)
            ],
            ephemeral: true
        })
        setTimeout(() => {
            interaction.user.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`Reminder`)
                    .setDescription(`**Your Reminder Just Ended!**`)
                    .addField(`Reason`, `\`${reason}\``, true)
                ]
            })
        }, mstime);
    }
})