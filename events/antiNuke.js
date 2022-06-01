const client = require("../index")
const Discord = require("discord.js")
const schema = require("../Models/antiNukeschema")
const whitelistConfig = require("../Models/whitelistConfig")


client.on("channelCreate", async(member) => {
    
    
    const audit = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE"
    });

    let entries = await audit.entries.first()

    let author = entries.executor;
    const aumember = await member.guild.members.fetch(author.id)

    if(author.id === client.user.id) return;
    if(author.id === member.guildId) return;
   
     schema.findOne({
        Guild: member.guildId,

    }, async(err, data) => {
        if(data){
             whitelistConfig.findOne({
                Guild: member.guildId,
                Member: author.id,
            }, async(err, data) => {
                if(data) return;
                 else {
                    if(!data){
                        member.delete();
                        await aumember.ban({days: `7`, reason: `${client.user.username} Security | AntiNuke System `})
                        
                    }
                }
            })
            
        }
    })
    
     
})

client.on("channelDelete", async(member) => {
    const audit = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_CREATE"
    });

    let entries = await audit.entries.first()

    let author = entries.executor;
    const aumember = await member.guild.members.fetch(author.id)

    if(author.id === client.user.id) return;
    if(author.id === member.guildId) return;
   
     schema.findOne({
        Guild: member.guildId,

    }, async(err, data) => {
        if(data){
             whitelistConfig.findOne({
                Guild: member.guildId,
                Member: author.id,
            }, async(err, data) => {
                if(data) return;
                 else {
                    if(!data){
                        member.clone()
                        await aumember.ban({days: `7`, reason: `${client.user.username} Security | AntiNuke System `})
                        
                    }
                }
            })
            
        }
    })
})
