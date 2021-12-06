const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
        new SlashCommandBuilder().setName('about')
        .setDescription('what da hell is this bot about?'),

        new SlashCommandBuilder().setName('auction')
        .setDescription('Only whooshie can use this')
        .addStringOption(option => option.setName('input').setDescription('Enter [start/end]'))
        .addUserOption(option => option.setName('target').setDescription('Who is being sold / Who brought this?'))
        .addIntegerOption(option => option.setName('amount').setDescription('How much?')),

        new SlashCommandBuilder().setName('balance')
        .setDescription('Check how broke you or someone else is')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?')),

        new SlashCommandBuilder().setName('buy')
        .setDescription('Buys an item from the shops')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),

        new SlashCommandBuilder().setName('daily')
        .setDescription('Get your daily coin, but beware, there is a 50% chance of getting nothing!'),

        new SlashCommandBuilder().setName('donate')
        .setDescription('Gibvs someone money')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to donate to?'))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to donate?')),

        new SlashCommandBuilder().setName('gamble')
        .setDescription('Gamble all of your life savings away')
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?')),

        new SlashCommandBuilder().setName('give')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?'))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to give?')),

        new SlashCommandBuilder().setName('help')
        .setDescription('Imagine using a help command, this command hasnt been updated since the first update'),

        new SlashCommandBuilder().setName('himari')
        .setDescription('Why?????'),

        new SlashCommandBuilder().setName('ltgcheck')
        .setDescription('Lets hear his advice'),

        new SlashCommandBuilder().setName('nya')
        .setDescription('UwU OwO OmO im very hornmy'),

        new SlashCommandBuilder().setName('ping')
        .setDescription('Replies with server latinency'),

        new SlashCommandBuilder().setName('profile')
        .setDescription('Who are you... or who are they?')
        .addUserOption(option => option.setName('target').setDescription('Whos profile do you want to see??')),

        new SlashCommandBuilder().setName('ping')
        .setDescription('Replies with server latinency'),

        new SlashCommandBuilder().setName('remove')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Whos balance do you want to edit?'))
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to remove?')),

        new SlashCommandBuilder().setName('reset')
        .setDescription('Admin command lol')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to reset?')),

        new SlashCommandBuilder().setName('rob')
        .setDescription('Doing a bit of stealing')
        .addUserOption(option => option.setName('target').setDescription('Who do you want to steak from?')),

        new SlashCommandBuilder().setName('shop')
        .setDescription('view what you want to buy'),

        new SlashCommandBuilder().setName('slots')
        .setDescription('Gamble all of your life savings away')
        .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?')),

        


];