const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const schema = require("./Models/join2Create")
const Topgg = require("@top-gg/sdk")
const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    // Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Intents.FLAGS.GUILD_INTEGRATIONS,
    //Intents.FLAGS.GUILD_WEBHOOKS,
    //Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    //Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Intents.FLAGS.GUILD_MESSAGE_TYPING,
     Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
});
module.exports = client;

const { token } = require("./settings/config");



// Global Variables



client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.snipes = new Collection();
client.commands = new Collection();
client.mcommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
let voiceManager = new Collection();


// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["event_handler", "slash_handler", "lockDownhandler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
const mongoose = require("mongoose")


    const dbURL = "mongoDBURL"
    if (!dbURL) console.log("url not found")

    mongoose.connect(dbURL).then(() => console.log(`Connected to Database: | Mongoose | Version -  ${mongoose.version}`));

    //Join 2 Create
client.on("voiceStateUpdate", async(oS, nS) => {
  const { member, guild } = oS;
  const newChannel = nS.channel
  const oldChannel = oS.channel
  schema.findOne({
    Guild: guild.id
  }, async(err, data) => {
    const channel = client.channels.cache.get(data.Channel)

    module.exports = channel;
    const JTC = channel.id;

    if(oldChannel !== newChannel && newChannel && newChannel.id === JTC){
      const voiceChannel = await guild.channels.create(`🔊〢${member.user.username}'s Channel`, {
        type: "GUILD_VOICE",
        parent: newChannel.parent,
        permissionOverwrites: [
          {
            id: member.id,
            allow: ["CONNECT", "SPEAK", "STREAM"],
            deny: "MANAGE_CHANNELS"
          },
          {
            id: guild.roles.everyone,
            allow: ["VIEW_CHANNEL"],
            deny: ["CONNECT", "MANAGE_CHANNELS"]
          }
        ]
      })
      voiceManager.set(member.id, voiceChannel.id);
      await newChannel.permissionOverwrites.edit(member, {CONNECT: false})
      setTimeout(() => {
        newChannel.permissionOverwrites.delete(member)
      }, 30 * 1000);

      return setTimeout(() => {
        member.voice.setChannel(voiceChannel)
      }, 1000)
    }
    const JTCchannel = voiceManager.get(member.id)
    if(JTCchannel && oldChannel.id === JTCchannel && (!newChannel || newChannel.id !== JTCchannel)){
      voiceManager.set(member.id, null)
      oldChannel.delete()
    }
  })
  
})

//Lockdown
const DB = require("./Models/lockDownSchema")


    DB.find().then(async (documentsArray) =>  {
        documentsArray.forEach((d) => {
            const Channel = client.guilds.cache.get(d.Guild).channels.cache.get(d.Channel)

            if(!Channel) return;

            const TimeNow = Date.now();

            if(d.Time < TimeNow )
            return Channel.permissionOverwrites.edit(d.Guild, {
                SEND_MESSAGES: null
            })
            const ExpireDate = d.Time - Date.now();

            setTimeout(async() => {
                Channel.permissionOverwrites.edit(d.Guild, {
                    SEND_MESSAGES: null
                })
                await DB.deleteOne({ Channel: Channel.id });
            }, ExpireDate)
        })
    })

   
process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [Error_Handling] :: Multiple Resolves");
  console.log(type, promise, reason);
});