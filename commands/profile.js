module.exports = {
    name: "profile",
    description: "Gets the profile of the user",
    async execute(Discord, client, args, message, MessageEmbed, profileModel){
        try{
            userPinged = message.mentions.members.first();

            const userProfile = new MessageEmbed()
            .setTitle(message.author.username)

            if (userPinged.bot || message.mentions.roles.first()) return message.author.send("YOU IDIOT THAT WAS A BOT???")
            else if(userPinged === undefined){
                let profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id
                
                userProfile
                .addFields(
                    {name: `Pogcoin Stats`, value: `Total Coins: ${profileData.totalCoinsEarnt}\nTotal Donated: ${profileData.coinsDonated}\nTotal Recieved: ${profileData.coinsReceived}`},
                    {name: `Gamble Stats`, value: `Net Gambled: ${profileData.netGamble}`},
                    {name: `Rob Stats`, value: `Successful Robberies: ${profileData.robSuccess}\nFailed Robberies: ${profileData.robFails}\nTimes Robbed: ${profileData.timesRobbed}`},
                )
                .setThumnail(message.author.displayAvatarURL({ dynamic: true , size: 2048 , format: "png" }))
        
            }
            else{
                let profileDataPinged = await profileModel.findOne({userID: userPinged.id}); //Attempts to look for a user in the DB with the user's id
                if(!profileDataPinged) //If there was no profile data of the mentioned user then it will create a new account on the database
                {
                    let newUser = await profileModel.create({
                        userID: message.author.id,
                        coins: 1,
                        dailyTimestamp: 0,
                        robTimestamp: 0,
                        totalCoinsEarnt: 0,
                        coinsDonated: 0,
                        coinsReceived: 0,
                        netGamble: 0,
                        robSuccess: 0,
                        robFails: 0,
                        timesRobbed: 0,
                    });
                    //const savedUser = await newUser.save();
                }
                userProfile
                .addFields(
                    {name: `Pogcoin Stats`, value: `Total Coins: ${profileDataPinged.totalCoinsEarnt}\nTotal Donated: ${profileDataPinged.coinsDonated}\nTotal Recieved: ${profileDataPinged.coinsReceived}`},
                    {name: `Gamble Stats`, value: `Net Gambled: ${profileDataPinged.netGamble}`},
                    {name: `Rob Stats`, value: `Successful Robberies: ${profileDataPinged.robSuccess}\nFailed Robberies: ${profileDataPinged.robFails}\nTimes Robbed: ${profileDataPinged.timesRobbed}`},
                )
                .setThumnail(userPinged.displayAvatarURL({ dynamic: true , size: 2048 , format: "png" }))                
            }

            const profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id


            message.channel.send({ embeds: [userProfile] }); 
        }
        catch(err){
            console.log(err);
        }
    }
}