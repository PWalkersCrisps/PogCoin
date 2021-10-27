const cooldowns = new Set();

module.exports = {
    name: "balance",
    aliases: ["bal", "bank", "coins", "money", "pogcoins"],
    cooldown: 5,
    description: "check your balance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel){

        const userPinged = message.mentions.users.first();

        profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id

        const pogCoinBalance = new MessageEmbed()
        .setColor('#ff00ff')
        .setTimestamp()
        .setFooter('Bitcoin Replacement?');

        if(userPinged === undefined){
            pogCoinBalance.addFields(
                { name: 'pog Coin Bank', value: `You have ${profileData.coins} <:pogcoin:899662337399750666> pogcoins`}
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
        

            pogCoinBalance.addFields(
                { name: 'pog Coin Bank', value: `<@${userPinged.id}> has ${profileDataPinged.coins} <:pogcoin:899662337399750666>`}
            )    
        }

        message.channel.send({ embeds: [pogCoinBalance] });

        
    }
}