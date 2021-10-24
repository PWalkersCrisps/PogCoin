module.exports = {
    name: "profile",
    cooldown: 5,
    description: "Gets the profile of the user",
    async execute(Discord, client, args, message, MessageEmbed, profileModel){

        userPinged = message.mentions.users.first();

        /*if(userPinged === undefined){
            const profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id

            const userProfile = new MessageEmbed()
            .setTitle(message.author.username)
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
        
        }*/

        const profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id

        const userProfile = new MessageEmbed()
        .setTitle(message.author.username)
        .addFields(
            {name: `Pogcoin Stats`, value: `Total Coins: ${profileData.totalCoinsEarnt}\nTotal Donated: ${profileData.coinsDonated}\nTotal Recieved: ${profileData.coinsReceived}`},
            {name: `Gamble Stats`, value: `Net Gambled: ${profileData.netGamble}`},
            {name: `Rob Stats`, value: `Successful Robberies: ${profileData.robSuccess}\nFailed Robberies: ${profileData.robFails}\nTimes Robbed: ${profileData.timesRobbed}`},
        )

        message.channel.send({ embeds: [userProfile] }) 
    }
}