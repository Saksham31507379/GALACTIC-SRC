const { GiveawaysManager } = require('discord-giveaways');
const client = require('../index')


const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
        
        botsCanWin: false,
        embedColor: "DEFAULT",
        embedColorEnd: 'RANDOM',
        reaction: '<:sh_giveaway:958298425164697630>'
    },
    messages: {
        giveaway: "<:sh_giveaway:958298425164697630> **Started Giveaway** <:sh_giveaway:958298425164697630>",
        drawing: 'Ends In ${timestamp}',
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
module.exports = manager;