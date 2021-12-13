const { SlashCommandBuilder } = require('@discordjs/builders');
const { createProfile } = require('../modules/profileData.js');

module.exports = {
    name: 'balance',
    description: 'check your balance',
    data: new SlashCommandBuilder().setName('balance')
    .setDescription('Check how broke you or someone else is')
    .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?')),

    async execute(client, interaction, MessageEmbed, profileModel, profileData) {

        const userPinged = interaction.options.getUser('target');
        profileData = await profileModel.findOne({ userID: interaction.user.id }); // Attempts to look for a user in the DB with the user's id

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
            const profileDataPinged = await profileModel.findOne({ userID: userPinged.id }); // Attempts to look for a user in the DB with the user's id


            pogCoinBalance.addFields(
                { name: 'pog Coin Bank', value: `<@${userPinged.id}> has ${profileDataPinged.coins} <:pogcoin:899662337399750666>` },
            );
        }

        interaction.reply({ embeds: [pogCoinBalance] });


    },
};