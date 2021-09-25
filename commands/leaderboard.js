//THIS IS NOT MY CODE ITS FROM A TUTORIAL, IF YOU CAN FIND BETTER CODE, PLEASE DO MODIFY THIS, I WILL APPRECIATE IT A LOT
//TUTORIAL: https://www.youtube.com/watch?v=NFOoUhiUrbk

//I DO HAVE TO MENTION IF THIS IS BEING EXPANDED APON, THIS IS NOT VERY EFFICIENT, THE MORE USERS IT HAS TO READ THEN THE LONGER IT WILL TAKE


const { Collection } = require("discord.js");

module.exports = {
    name: "leaderboard",
    description: "Displays the top 10 users",
    async execute(client, message, args, Discord, profileData, MessageEmbed){


        const leaderBoardCollection = new Collection()

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = profileData.userID;
                const coins = profileData.coins;
                return coins !== 0 ? Collection.set(id, {
                    id,
                    bal,
                })
                :null
            })
        )

        const data = Collection.sort((a, b) => b.coins - a.coins).first(10)

        const royCoinLeaderBoard = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#6603fc')
        .setTitle('Roy Coin Leaderboards')
        .setDescription(
            data.map((v, i) => {
                return `${i+1}) ${client.user.cache.get(v.id).tag} => ${v.coins} Roy Coins`
            })
        )
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');    
        message.channel.send({ embeds: [royCoinLeaderBoard] }); //sends the embed that was just created


    }
}