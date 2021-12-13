const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
        new SlashCommandBuilder()
        .setName('about')
        .setDescription('what da hell is this bot about?'),

        new SlashCommandBuilder()
        .setName('auction')
        .setDescription('Only whooshie can use this')
        .addSubcommand(subcommand =>
                subcommand
                        .setName('start')
                        .setDescription('Start an auction')
                        .addUserOption(option => option.setName('target').setDescription('Who are you auctioning?').setRequired(true))
                        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to sell someone for?').setRequired(true)))
        .addSubcommand(subcommand =>
                subcommand
                        .setName('end')
                        .setDescription('End an auction')
                        .addUserOption(option => option.setName('target').setDescription('Whos buying them?').setRequired(true))
                        .addIntegerOption(option => option.setName('amount').setDescription('How much did they buy someone for?').setRequired(true))),

        new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check how broke you or someone else is')
        .addUserOption(option => option.setName('target').setDescription('Who\'s money do you want to see?')),

        new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Buys an item from the shops')
        .addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true)),

        new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Get your daily coin, but beware, there is a 50% chance of getting nothing!'),

        new SlashCommandBuilder()
        .setName('donate')
        .setDescription('Gibvs someone money')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?').setRequired(true)),

        new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Gamble all of your life savings away')
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),

        new SlashCommandBuilder()
        .setName('give')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to give?').setRequired(true)),

        new SlashCommandBuilder().setName('himari')
        .setDescription('Why?????'),

        new SlashCommandBuilder().setName('ltgcheck')
        .setDescription('Lets hear his advice'),

        new SlashCommandBuilder().setName('nya')
        .setDescription('UwU OwO OmO im very hornmy'),

        new SlashCommandBuilder().setName('profile')
        .setDescription('Who are you... or who are they?')
        .addUserOption(option => option.setName('target').setDescription('Whos profile do you want to see??')),

        new SlashCommandBuilder().setName('ping')
        .setDescription('Replies with server latinency'),

        new SlashCommandBuilder().setName('remove')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to remove?').setRequired(true)),

        new SlashCommandBuilder().setName('reset')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to reset?').setRequired(true)),
/*
        new SlashCommandBuilder().setName('rob')
        .setDescription('Doing a bit of stealing')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to steal from?').setRequired(true)),
*/
        new SlashCommandBuilder().setName('shop')
        .setDescription('view what you want to buy'),

        new SlashCommandBuilder().setName('slots')
        .setDescription('Gamble all of your life savings away')
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?').setRequired(true)),


];