const Discord = require('discord.js')
const { Command } = require('reconlx')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const recongvy = require('reconlx')
const ms = require('ms')
const client = require('../../index')

module.exports = new Command({
    name: 'giveaway',
    description: `Create's a Giveaway in ur server`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: 'duration',
            description: `Duration of the giveaway`,
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: `Winners for the giveaway`,
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: `Prize of the giveaway`,
            type: 'STRING',
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const duration = interaction.options.getString('duration');
        const winnercount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');

       new recongvy.GiveawayClient({mongooseConnectionString: config.mongooseConnectionString, defaultColor: `AQUA`, emoji: "<:sh_enabled:958324826383220766>", client: `${client}`})
            
        
        
    }
})