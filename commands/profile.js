module.exports = {
    name: "profile",
    description: "Gets the profile of the user",
    async execute(Discord, client, args, message, MessageEmbed, profileModel){

        userPinged = message.mentions.users.first();

        if(userPinged === undefined){
            const profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id

            const userProfile = new MessageEmbed()
            .setTitle(message.author.username)
            .setThumbnail(message.member.avatarURL())
            .addFields(
                {name: `Pogcoin Stats`, value: `Total Coins: ${profileData.totalCoinsEarnt}\nTotal Donated: ${profileData.coinsDonated}\nTotal Recieved: ${profileData.coinsRecived}`},
                {name: `Gamble Stats`, value: `Net Gambled: ${profileData.netGamble}`},
                {name: `Rob Stats`, value: `Successful Robberies: ${profileData.robSuccess}\nFailed Robberies: ${profileData.robFails}\nTimes Robbed: ${profileData.timesRobbed}`},
            )
        }
        else if (userPinged.bot || message.mentions.roles.first()) return message.author.send("YOU IDIOT THAT WAS A BOT???")
        else{
            const profileDataPinged = profileData = await profileModel.findOne({userID: userPinged.id}); //Attempts to look for a user in the DB with the user's id
            if(!profileDataPinged) //If there was no profile data of the mentioned user then it will create a new account on the database
            {
                let newUser = await profileModel.create({
                    userID: userPinged.id,
                    coins: 1,
                });
                //const savedUser = await newUser.save();
            }
        
        }



        const pogCoinPing = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?')
        .addFields(
            {name: "", value: ``} //Its creates a time stamp for the message then compares it to when the message is actually sent to get a mostly accurate representation of the Client/Server delay
        );

        message.channel.send({ embeds: [pogCoinPing] }) 
    }
}