module.exports = {
    name: "rob",
    description: "steal someones money",
    async execute(client, interaction, MessageEmbed, profileModel, profileData){
        /*
        try{
            if(message.channel.id === "903398509171060749") return message.channel.send(`Please use this in <#899055241104879616> or else this chat will be spammed`);
            const userPinged = message.mentions.members.first();
            if(!userPinged) return message.channel.send(`<@${message.author.id}> can you actually try to steal from someone?`);
            else if(message.mentions.members.first().bot) return message.author.send("YOU IDIOT THAT WAS A BOT???")
            else if (message.mentions.roles.first()) return message.author.send("YOU IDIOT THAT WAS A ROLE???")


            profileDataPinged = await profileModel.findOne({userID: userPinged.id});
            if(profileData.coins < 2) return message.channel.send(`<@${message.author.id}> you dont have enough coins, just dont be broke`);
            else if(profileDataPinged.coins < 0) return message.channel.send(`<@${userPinged.id}> doesn't have enough coins for you to nick them`);

            function getRandomInt(max) {
                return Math.round(Math.random() * max);
            }

            function randomCoinRNG(){
                if(profileDataMentioned.coins > 65){
                    return Math.random() < 0.15 * 66/40
                }
                return Math.random() < 0.15 * profileDataMentioned.coins/40
            }

            let pogCoinRob = new MessageEmbed() //Starts the proccess for creating an embed
            .setTimestamp()

            profileDataMentioned = await profileModel.findOne({userID: message.mentions.users.first().id}); //Gets the profile data of the user mentioned
            if(!profileDataMentioned) //If there was no profile data of the mentioned user then it will create a new account on the database
            {
                let newUser = await profileModel.create({
                    userID: message.mentions.users.first().id,
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
            
            if(randomCoinRNG()){
                const coinsGainedRNG = getRandomInt(profileDataMentioned.coins)
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: coinsGainedRNG, //when the id of the author is found, it gives them one coin
                        totalCoinsEarnt: coinsGainedRNG,
                        robSuccess: 1,
                    }
                });
                const response2 = await profileModel.findOneAndUpdate({
                    userID: userPinged.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: -coinsGainedRNG, //when the id of the author is found, it gives them one coin
                        timesRobbed: 1,
                    }
                });
                pogCoinRob
                .setFooter('Holy shit you actually stole their money??')
                .setColor('YELLOW')
                .addFields(
                    {name: `!You thief!`, value: `<@${message.author.id}> you stole ${coinsGainedRNG} <:pogcoin:899662337399750666> from <@${userPinged.id}>, dont think they will be too happy with you`}
                )
            }
            else{
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: -2, //when the id of the author is found, it gives them one coin
                        robFails: 1,
                    }
                });
                const response2 = await profileModel.findOneAndUpdate({
                    userID: userPinged.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: 2, //when the id of the author is found, it gives them one coin
                        totalCoinsEarnt: 1,
                    }
                });
                pogCoinRob
                .setFooter('Haha you got caught')
                .setColor('RED')
                .addFields(
                    {name: `🚓You got caught🚓`, value: `<@${message.author.id}> YOU GOT CAUGHT, as a fine, the police made you give 2 pogcoins <:pogcoin:899662337399750666> to <@${userPinged.id}>. Think about robbing people next time`}
                )
            }

            message.channel.send({ embeds: [pogCoinRob] });

        }
        catch(err){
            console.error(err);
        }
        */
    }
}
