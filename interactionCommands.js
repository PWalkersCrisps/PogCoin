const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
        new SlashCommandBuilder().setName('about')
        .setDescription('what da hell is this bot about?'),

        new SlashCommandBuilder().setName('auction')
        .setDescription('Only whooshie can use this')
        .addStringOption(option => option.setName('input').setDescription('Enter [start/end]'))
        .addUserOption(option => option.setName('target').setDescription('Who is being sold / Who brought this?'))
        .addIntegerOption(option => option.setName('amount').setDescription('How much?')),


];