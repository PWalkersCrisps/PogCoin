const mongoose = require("mongoose");

module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    cooldown: 5,
    description: "Displays the top 10 users",
    async execute(Discord, client, args, cmd, message, MessageEmbed, profileModel, profileData){

        /*
        const id = profileData.userID;
        const coins = profileData.coins;

        const query = new mongoose.Query();
        const res = query.sort({coins: 'desc'})

        let LeaderboardEmbed = new MessageEmbed()
        .setTitle("pog Coins Leaderboard")

        console.log(res);

        if (res.length === 0){ //No results gathered
            LeaderboardEmbed.setColor("RED");
            LeaderboardEmbed.addField("No data shown", "Sucks for that to happen");
        }
        else if (res.length < 10){ //Less then 10 results gathered
            LeaderboardEmbed.setColor("#8c03fc");
            for(i = 0; i < res.length; i++){
                let memberLB = message.guild.members.cache.get(res[i].userID) || "User Left";
                if (memberLB === "User Left"){
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB}`, `**pog Coins: ${res[i].coins}**`);
                }
                else{
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB.user.name}`, `**pog Coins: ${res[i].coins}**`)
                }
            }
        }
        else{ //More then 10 results gathered
            LeaderboardEmbed.setColor("#8c03fc");
            for(i = 0; i < 10; i++){
                let memberLB = message.guild.members.cache.get(res[i].userID) || "User Left";
                if (memberLB === "User Left"){
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB}`, `**pog Coins: ${res[i].coins}**`);
                }
                else{
                    LeaderboardEmbed.addField(`${i + 1}. ${memberLB.user.name}`, `**pog Coins: ${res[i].coins}**`)
                }
            }
        }


        message.channel.send({ embeds: [LeaderboardEmbed] });
        */
    }
}