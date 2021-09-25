module.exports = {
    name: "leaderboard",
    description: "Displays the top 10 users",
    async execute(client, message, args, Discord, profileData, MessageEmbed){








        const royCoinLeaderBoard = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#6603fc')
        .addTitle('Roy Coin Leaderboards')
        .setDescription('Some description here') //Temp description, ig just write something creative here
        .addFields(
            { name: `1`, value: ``},
            { name: `2`, value: ``},
            { name: `3`, value: ``},
            { name: `4`, value: ``},
            { name: `5`, value: ``},
            { name: `6`, value: ``},
            { name: `7`, value: ``},
            { name: `8`, value: ``},
            { name: `9`, value: ``},
            { name: `10`, value: ``},
        )
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');    
        message.author.send({ embeds: [royCoinLeaderBoard] }); //sends the embed that was just created


    }
}