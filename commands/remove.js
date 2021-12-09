const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'remove',
    description: 'give a player some coins',
    data: new SlashCommandBuilder().setName('remove')
    .setDescription('Admin command lol')
    .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to remove?')),

    async execute(client, interaction, MessageEmbed, profileModel, profileData) {


        try {
            if (!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || !interaction.user.id == '426455031571677197') return interaction.reply(`<@${interaction.user.id}> actually have permissions to use the command next time`);
            const amount = interaction.options.getInteger('int');
            try {
            const targetData = await profileModel.findOne({ userID: message.mentions.users.first().id });
            if (!targetData) {
                const newUser = await profileModel.create({
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
                // const savedUser = await newUser.save();
            }

            const response = await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                userID: message.mentions.users.first().id, // looks for the record of the message author's account
            }, {
                $inc: {
                    coins: -amount, // decreases the amount of coins that the author has by the stated amount
                },
            });

            return message.channel.send(`<@${message.mentions.users.first().id}> has just lost ${amount} coins\n\nmake fun of them!! :emock:`);
            }
 catch (err) {
            console.error(err);
            }
        }
        catch (err) {
            console.error(err);
        }
    },
};
