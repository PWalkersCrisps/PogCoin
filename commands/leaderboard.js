module.exports = {
    name: "leaderboard",
    description: "Displays the top 10 users",
    async execute(client, message, args, Discord, profileData, MessageEmbed){








        const royCoinLeaderBoard = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#6603fc')
        .setTitle('Roy Coin Leaderboards')
        .setDescription('Some description here') //Temp description, ig just write something creative here
        .addFields(
            { name: `1`, value: `1`},
            { name: `2`, value: `2`},
            { name: `3`, value: `3`},
            { name: `4`, value: `4`},
            { name: `5`, value: `5`},
            { name: `6`, value: `6`},
            { name: `7`, value: `7`},
            { name: `8`, value: `8`},
            { name: `9`, value: `9`},
            { name: `10`, value: `10`},
        )
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');    
        message.author.send({ embeds: [royCoinLeaderBoard] }); //sends the embed that was just created


    }
}