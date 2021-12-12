const { profileSchema, cooldownSchema } = require('../models/profileSchema.js');
const { createProfile } = require('../modules/profileData.js');
const coinCooldown = new Set();
const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'messageCreate',
	async execute(message) {

        let profileData;
        try {
            profileData = await profileSchema.findOne({ userID: message.user.id });
            if (!profileData) {
                createProfile(message.user.id);
            }
        }
        catch (err) {
            console.error(err);
        }

        // /-----Pogcoin RNG-----//
        if (Math.random() < 0.01) {
            if (message.author.bot) return;
            if (!coinCooldown.has(message.author.id)) { // goes to check if the cooldowns map *DOESNT* habe the author's
                const response = await profileSchema.findOneAndUpdate({
                    userID: message.author.id, // looks for the id of the author
                }, {
                    $inc: {
                        coins: 1, // when the id of the author is found, it gives them one coin
                        totalCoinsEarnt: 1,
                    },
                });


                const pogCoinEmbedReward = new MessageEmbed() // Starts the proccess for creating an embed
                .setColor('#ffff00')
                .setTimestamp()
                .setFooter('Reddit Gold Replacement?');

                if (message.member.roles.cache.some(role => role.name === 'He/Him')) { // checks if the auther has the he/him role
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: 'Youve been rewarded with a pog Coin for being a good boy' },
                    );
                }
                else if (message.member.roles.cache.some(role => role.name === 'She/Her')) { // checks if the auther has the she/her role
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: 'Youve been rewarded with a pog Coin for being a good girl' },
                    );
                }
                else { // If the user has the they/them or dont have a gender role, it will always default to this
                    pogCoinEmbedReward.addFields(
                        { name: 'pog Coin', value: 'Youve been rewarded with a pog Coin for being a good child' },
                    );
                }

                message.author.send({ embeds: [pogCoinEmbedReward] }); // sends the embed that was just created

                coinCooldown.add(message.author.id); // Adds a cooldown to the id of the author
                setTimeout(() => {
                    // Removes the user from the set after a while
                    coinCooldown.delete(message.author.id);
                }, 60 * 60000); // First number is minutes the second one times it because it is in milliseconds
            }
        }
    },
};