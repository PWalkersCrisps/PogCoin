const { SlashCommandBuilder } = require('@discordjs/builders');
const { createProfile } = require('../modules/profileData.js');
const { model } = require('../models/profileSchema.js');

module.exports = {
    name: 'balance',
    description: 'check your balance',
    data: new SlashCommandBuilder().setName('balance')
    .setDescription('Check how broke you or someone else is')
    .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?')),

    async execute(client, interaction, MessageEmbed) {

        const userPinged = interaction.options.getUser('target');
        let profileData = await model.findOne({ userID: interaction.user.id }); // Attempts to look for a user in the DB with the user's id

        const pogCoinBalance = new MessageEmbed()
        .setColor('#ff00ff')
        .setTimestamp()
        .setFooter('Bitcoin Replacement?');

        if (!userPinged) {
            pogCoinBalance.addFields(
                { name: 'pog Coin Bank', value: `You have ${profileData.coins} <:pogcoin:899662337399750666> pogcoins` },
            );
        }
        else if (userPinged.bot) { return interaction.reply({ content: 'YOU IDIOT THAT WAS A BOT???', ephemeral: true }); }
        else {
            const profileDataPinged = profileData = await model.findOne({ userID: userPinged.id }); // Attempts to look for a user in the DB with the user's id
            if (!profileDataPinged) { // If there was no profile data of the mentioned user then it will create a new account on the database
                const newUser = await model.create({
                    userID: userPinged.id,
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


            pogCoinBalance.addFields(
                { name: 'pog Coin Bank', value: `<@${userPinged.id}> has ${profileDataPinged.coins} <:pogcoin:899662337399750666>` },
            );
        }

        interaction.reply({ embeds: [pogCoinBalance] });


    },
};