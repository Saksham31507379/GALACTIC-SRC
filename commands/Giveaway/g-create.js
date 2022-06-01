const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const manager = require('../../events/giveawayClient')
const client = require('../../index')

module.exports = new Command({
    name: 'g-create',
    description: `Create's A Giveaway in Your Server`,
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'duration',
            description: `Duration Of The Giveaway`,
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: `Number of winners who can win this giveaway`,
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: `Prize to be given`,
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: `Giveaway to be held in channel`,
            type: 'CHANNEL',
            required: false
        }
    ],
    run: async({ interaction }) => {
        const duration = interaction.options.getString('duration')
        const winnerCount = interaction.options.getInteger('winners')
        let channel = interaction.options.getChannel('channel') || interaction.channel

        
        const prize = interaction.options.getString('prize')
        interaction.followUp({
            embeds:[
                new MessageEmbed()
                .setColor("BLUE")
                .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/wrapped-gift_1f381.png")
                .setTitle(`Started Giveaway!`)
                .setDescription(`**Started Giveaway! In ${channel}**`)
                .addField(`Duration`, `${duration}`, true)
                .addField(`Prize`, `${prize}`, true)
                .addField(`Total Winners`, `${winnerCount}`, true)
            ]
        })

        const winnerembed = new MessageEmbed()
        .setColor(`ff0000`)
        .setDescription(`{winners} **Won {this.prize}**`)
        .addField(`MessageURL`, `{this.messageURL}`)

        manager.start(channel, {
            duration: ms(duration),
            winnerCount: winnerCount,
            prize: prize,
            embedColor: "ff0000",
            messages: {
                giveaway: "<:sh_giveaway:958298425164697630> **Started Giveaway** <:sh_giveaway:958298425164697630>",
                drawing: 'Ends In {timestamp}',
                inviteToParticipate: 'React with <:sh_giveaway:958298425164697630> to participate! | ID - {this.messageId}',
                noWinner: '**Giveaway cancelled, Because no one Participated**',
                winMessage: { content: `{winners}`, embed: new MessageEmbed().setColor("BLUE").setDescription("Congratulations {winners} You Won! [{this.prize}({this.messageURL})") }
            }
            
            
        })
    }
})