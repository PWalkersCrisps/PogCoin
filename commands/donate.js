const mongoose = require('mongoose');

module.exports = {
    name: "donate",
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        if (!message.mentions.users.first()) {
            message.channel.send('You need to mention a user.'); //If no one was mentioned in the message then the rest of the script wont execute
            return;
        }
        //let amount = 1;
        //if (args.length) amount = args[1];

        profileDataSender = await profileModel.findOne({userID: message.author.id}); //Gets the profile data of the sender
        if(profileDataSender.coins <= 0) return message.channel.send(`<@${message.author.id}> Bruh, are you actually this broke? Try giving people coins when you actually have some roycoins <:nioCyoR:891377626831290509> <:staremock:821120707035267133>`); //Using the profile data from earlier, the bot makes a check if the user actually has any coins, if not the rest of the script wont execute, and then the bot mocks them

        const senderResponse = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
            userID: message.author.id, //looks for the record of the message author's account
        }, {
            $inc: {
                coins: -1, //decreases the amount of coins that the author has by the stated amount
            }
        });
        
        profileDataMentioned = await profileModel.findOne({userID: message.mentions.users.first().id}); //Gets the profile data of the user mentioned
        if(!profileDataMentioned) //If there was no profile data of the mentioned user then it will create a new account on the database
        {
            let newUser = await profileModel.create({
                userID: message.mentions.users.first().id,
                coins: 0,
            });
            //const savedUser = await newUser.save();
        }

        const reciverResponse = await profileModel.findOneAndUpdate({ //finds the profile of the user that the author mentioned then updates it
            userID: message.mentions.users.first().id,
        }, {
            $inc: {
                coins: 1, //increases the amount of coins that the mentioned has by 1
            }
        });

        const royCoinDonate = new MessageEmbed()
        .setColor('#00ffff')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');

        royCoinDonate.addFields(
            { name: 'Roy Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a Roy Coin?!?`}
        )


        // if (amount === 1){
        //     royCoinDonate.addFields(
        //         { name: 'Roy Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> a Roy Coin?!?`}
        //     )
        // }
        // else if (amount > 1){
        //     royCoinDonate.addFields(
        //         { name: 'Roy Coin Charity', value: `<@${message.author.id}> just gave <@${message.mentions.users.first().id}> ${amount} Roy Coins?!?`}
        //     )    
        // }

        message.channel.send({ embeds: [royCoinDonate] });

    }
}