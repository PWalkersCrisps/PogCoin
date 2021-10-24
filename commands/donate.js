const mongoose = require('mongoose');

module.exports = {
    name: "donate",
    description: "Donate a coin to someone",
    cooldown: 5,
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        let userMentioned = message.mentions.members.first();

        try{
            if(userMentioned.users.first().bot) return message.author.send("YOU IDIOT THAT WAS A BOT???")
            else if (userMentioned.roles.first()) return message.author.send("YOU IDIOT THAT WAS A ROLE???")
            else if (!userMentioned.users.first()) return message.channel.send('You need to mention a user.'); //If no one was mentioned in the message then the rest of the script wont execute
            else if (message.author.id === userMentioned.users.first().id) return message.channel.send("You cant donate to yourself...")
            const amount = args[1] || 1;

            profileDataSender = await profileModel.findOne({userID: message.author.id}); //Gets the profile data of the sender
            if(profileDataSender.coins < amount) return message.channel.send(`<@${message.author.id}> Bruh, are you actually this broke? Try giving people coins when you actually have some pogcoins <:nioCyoR:891377626831290509> <:staremock:821120707035267133>`); //Using the profile data from earlier, the bot makes a check if the user actually has any coins, if not the rest of the script wont execute, and then the bot mocks them
            else if (amount < 1) return message.channel.send(`<@${message.author.id}> Actually say a valid number???`)

            const senderResponse = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
                userID: message.author.id, //looks for the record of the message author's account
            }, {
                $inc: {
                    coins: -amount, //decreases the amount of coins that the author has by the stated amount
                    coinsDonated: amount,
                }
            });
            
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

            const reciverResponse = await profileModel.findOneAndUpdate({ //finds the profile of the user that the author mentioned then updates it
                userID: message.mentions.users.first().id,
            }, {
                $inc: {
                    coins: amount, //increases the amount of coins that the mentioned has by 1
                    coinsReceived: amount,
                    totalCoinsEarnt: amount,
                }
            });

            const pogCoinDonate = new MessageEmbed()
            .setColor('#00ffff')
            .setTimestamp()
            .setFooter('Reddit Gold Replacement?');

            pogCoinDonate.addFields(
                { name: 'pog Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a pog Coin?!?`}
            )


            // if (amount === 1){
            //     pogCoinDonate.addFields(
            //         { name: 'pog Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a pog Coin?!?`}
            //     )
            // }
            // else if (amount > 1){
            //     pogCoinDonate.addFields(
            //         { name: 'pog Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> ${amount} pog Coins?!?`}
            //     )    
            // }

            message.channel.send({ embeds: [pogCoinDonate] });
        }
        catch(err){
            console.log(err);
        }
    }
}