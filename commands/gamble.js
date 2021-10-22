module.exports = {
    name: "gamble",
    description: "gamble for nothing or double",
    async execute(Discord, client, args, message, MessageEmbed, profileModel){

        profileData = await profileModel.findOne({userID: message.author.id});

        const amount = args[0];

        if(!amount) return message.channel.send("Please can you tell me how much youre willing to gamble");

        if (profileData.coins < amount) return message.channel.send("Gamble when you actually have enough money");

        const pogCoinFlip = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Pogcasino Replacement?')

        let randomCoinChance = Math.floor(Math.random() * 50)+1
        if (randomCoinChance === 1){
            const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.author.id, //looks for the record of the message author's account
            }, {
                $inc: {
                    coins: amount, //decreases the amount of coins that the author has by the stated amount
                    netGamble: amount,
                    totalCoinsEarnt: amount,
                }
            });

            pogCoinFlip.setColor("YELLOW")
            pogCoinFlip.addFields(
                {name: "You won!!", value: `Damn <@${message.author.id}>, you just beat the odds and gained ${amount}!!!!`}
            );
        }
        else {
            const response = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.author.id, //looks for the record of the message author's account
            }, {
                $inc: {
                    coins: -amount, //decreases the amount of coins that the author has by the stated amount
                    netGamble: -amount,
                }
            }); 

            pogCoinFlip.setColor("RED")
            pogCoinFlip.addFields(
                {name: "You lost!!", value: `Damn <@${message.author.id}>, you just lost ${amount} `}
            );
        }

        message.channel.send({ embeds: [pogCoinFlip] }) 
    }
}