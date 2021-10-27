module.exports = {
    name: "rob",
    description: "steal someones money",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            const userPinged = message.mentions.members.first();
            if(!userPinged) return message.channel.send(`<@${message.author.id}> can you actually try to steal from someone?`);

            profileDataPinged = await profileModel.findOne({userID: userPinged.id});
            if(Math.round(profileData.coins * (5/100)) < 1) return message.channel.send(`<@${message.author.id}> you dont have enough coins, just dont be broke`);
            else if(profileDataPinged.coins < 0) return message.channel.send(`<@${userPinged.id}> doesn't have enough coins for you to nick them`);

            function getRandomInt(max) {
                return Math.round(Math.random() * max);
            }

            let pogCoinRob = new MessageEmbed() //Starts the proccess for creating an embed
            .setTimestamp()

            
            if(Math.random() < 0.35){
                const coinsGainedRNG = getRandomInt()
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
                        coins: -coinsGainedRNG, //when the id of the author is found, it gives them one coin
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
            console.log(err);
        }
    }
}
