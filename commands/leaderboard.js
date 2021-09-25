const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const mongoose = require("mongoose");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "leaderboard",
    description: "Displays the top 10 users",
    async execute(message, args, profileData){

        const id = profileData.userID;
        const coins = profileData.coins;

        const query = new mongoose.Query();
        const res = query.sort({coins: 'desc'})

        let LeaderboardEmbed = new MessageEmbed()
        .setTitle("Roy Coins Leaderboard")

        if (res.length === 0){ //No results gathered
            LeaderboardEmbed.setColor("RED");
            LeaderboardEmbed.addField("No data shown", "Sucks for that to happen");
        }
        else if (res.length < 10){ //Less then 10 results gathered
            LeaderboardEmbed.setColor("#8c03fc");
            for(i = 0; i < res.length; i++){
                let memberLB = message.guild.cache.get(res[i].userID) || "User Left";
                if (memberLB === "User Left"){
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB}`, `**Roy Coins: ${res[i].coins}**`);
                }
                else{
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB.user.name}`, `**Roy Coins: ${res[i].coins}**`)
                }
            }
        }

        message.channel.send({ embeds: [LeaderboardEmbed] });

    }
}