const { Permissions } = require('discord.js');
const mongoose = require('mongoose');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'give',
    description: 'give a user some coins',
    data: new SlashCommandBuilder().setName('give')
    .setDescription('Admin command lol')
    .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?'))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to give?')),

    async execute(client, interaction, MessageEmbed, profileModel, profileData) {

        try {
            if (!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || !interaction.user.id == '426455031571677197') return interaction.reply({ content: `<@${interaction.user.id}> actually have permissions to use the command next time`, ephemeral: true });

            const amount = interaction.options.getInteger('int');
            if (amount % 1 != 0 || amount <= 0) return interaction.reply({ content: 'Ayo if you want to actually give money make it an actual number', ephemeral: true });

            try {
            const targetData = await profileModel.findOne({ userID: interaction.options.getMember('target').id });
            if (!targetData) {
                const newUser = await profileModel.create({
                    userID: interaction.options.getMember('target').id,
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
            }
 catch (err) {
                console.error(err);
            }

            const response = await profileModel.findOneAndUpdate({ // finds the profile of the author then updates it
                userID: interaction.options.getMember('target').id, // looks for the record of the message author's account
            }, {
                $inc: {
                    coins: amount, // decreases the amount of coins that the author has by the stated amount
                },
            });

            return interaction.reply(`<@${interaction.options.getMember('target').id}> has just been given ${amount} coins\n\nmake fun of them ig?`);

        }
        catch (err) {
            console.error(err);
        }
    },
};
