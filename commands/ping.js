const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    description: "pings the server to see the delay between the client and the server",
    async execute(args, profileData){

        client.on("messageCreate", async (message) =>{ 
            const royCoinPing = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Reddit Gold Replacement?')
            .addFields(
                {name: "Ping Pong", value: `🏓Latency is ${Date.now() - message.createdTimestamp}ms.`} //Its creates a time stamp for the message then compares it to when the message is actually sent to get a mostly accurate representation of the Client/Server delay
            );

            message.channel.send({ embeds: [royCoinPing] }) 
        })
    }
}