const profileModel = require("./models/profileSchema.js");
const coinCooldown = new Set();

module.exports = {
	name: 'messageCreate',
	async execute(message) {


        ///-----Pogcoin RNG-----//
        if (Math.random() < 0.01){
            if(message.author.bot) return;
            if (!coinCooldown.has(message.author.id)) { //goes to check if the cooldowns map *DOESNT* habe the author's
                const response = await profileModel.findOneAndUpdate({
                    userID: message.author.id, //looks for the id of the author
                }, {
                    $inc: {
                        coins: 1, //when the id of the author is found, it gives them one coin
                        totalCoinsEarnt: 1
                    }
                });
                
            
                const pogCoinEmbedReward = new MessageEmbed() //Starts the proccess for creating an embed
                .setColor('#ffff00')
                .setTimestamp()
                .setFooter('Reddit Gold Replacement?');    
                
                if (message.member.roles.cache.some(role => role.name === 'He/Him')){ //checks if the auther has the he/him role
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good boy`},
                    )        
                }
                else if (message.member.roles.cache.some(role => role.name === 'She/Her')){ //checks if the auther has the she/her role
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good girl`},
                    )        
                }
                else{ //If the user has the they/them or dont have a gender role, it will always default to this
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good child`},
                    )            
                }
            
                message.author.send({ embeds: [pogCoinEmbedReward] }); //sends the embed that was just created
                
                coinCooldown.add(message.author.id); //Adds a cooldown to the id of the author
                setTimeout(() => {
                    // Removes the user from the set after a while
                    coinCooldown.delete(message.author.id);
                }, 60 * 60000); //First number is minutes the second one times it because it is in milliseconds
            }
        }

        let profileData;
        try{
    
            profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id
            if(!profileData) //Checks if the user has any data in the DB
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
        } 
        catch(err){
            console.error(err) //if mongoose had a problem trying to create a new user, then it will log it in the console rather then crashing
        }
    }
}