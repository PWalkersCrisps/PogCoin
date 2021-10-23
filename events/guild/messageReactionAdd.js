module.exports = (Discord, client, reaction, user) =>{
    /*
    if(reaction.message.author.bot) return user.send("YOU IDIOT THAT WAS A BOT???")

    // When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

    if(!(reaction.emoji.id ===  '900766174189604914')) return;

    profileData1 = await profileModel.findOne({userID: user.id}); //Gets the profile data of the sender
    try //If there was no profile data of the mentioned user then it will create a new account on the database
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
    catch(err){
        console.log(err)
    }

    if(profileData1.coins < 1) return user.send(`<@${user.id}> Bruh, are you actually this broke? Try giving people coins when you actually have some pogcoins`); //Using the profile data from earlier, the bot makes a check if the user actually has any coins, if not the rest of the script wont execute, and then the bot mocks them

    const response1 = await profileModel.findOneAndUpdate({ //finds the profile of the author then updates it
        userID: user.id, //looks for the record of the message author's account
    }, {
        $inc: {
            coins: -1, //decreases the amount of coins that the author has by the stated amount
            coinsDonated: 1,
        }
    });
    
    profileData2 = await profileModel.findOne({userID: reaction.message.author.id}); //Gets the profile data of the user mentioned
    if(!profileData2) //If there was no profile data of the mentioned user then it will create a new account on the database
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

    const response2 = await profileModel.findOneAndUpdate({ //finds the profile of the user that the author mentioned then updates it
        userID: reaction.message.author.id,
    }, {
        $inc: {
            coins: 1, //increases the amount of coins that the mentioned has by 1
            coinsReceived: 1,
            totalCoinsEarnt: 1,
        }
    });

    const pogCoinDonate = new MessageEmbed()
    .setColor('#00ffff')
    .setTimestamp()
    .setFooter('Reddit Gold Replacement?')
    .addFields(
        { name: 'Pog Coin Charity', value: `<@${user.id}> just gave you a Pog Coin?!?`}
    );

    reaction.message.author.send({ embeds: [pogCoinDonate] });
    */
};