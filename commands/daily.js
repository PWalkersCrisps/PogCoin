module.exports = {
    name: "daily",
    description: "get coins daily at a chance",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if(profileData.dailyTimestamp + 86400 <= Date.now() / 1000){

                let pogCoinDaily = new MessageEmbed()
                .setColor('#ab5612')
                .setTimestamp()
                .setFooter('Wages in america replacement?');

                if(Math.random() < 0.5){
                    const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                        userID: message.author.id, //looks for the record of the message author's account
                    }, {
                        $set: {
                            dailyTimestamp: Date.now()/1000,
                        },
                        $inc: {
                            coins: 1,            
                        }

                    });
                    pogCoinDaily.addFields(
                        {
                            name: `Daily coins`,
                            value: `<@${message.author.id}> you gained a coin have a nice time`
                        }
                    )


                }
                else {

                    pogCoinDaily.addFields(
                        {
                            name: `Daily coins`,
                            value: `<@${message.author.id}> nah, lol. no coin for you`
                        }
                    )
                }

                
                message.channel.send({ embeds: [pogCoinDaily] });

            }
            else{
                message.channel.send(`<@${message.author.id}> you are still on cooldown, you just need to wait ${profileData.dailyTimestamp + 86400 - Date.now() / 1000} seconds\n\n\n do the math yourself, NERD!!`)
            }
        }
        catch(err){
            console.error(err)
        }
    }
}