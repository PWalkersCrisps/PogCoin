const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'caravans',
    description: 'Play caravans from fallout new vegas',
    data: new SlashCommandBuilder().setName('caravans')
    .setDescription('Play caravans from fallout new vegas')
    .addUserOption(option => option.setName('target').setDescription('Who are you auctioning?').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to sell someone for?').setRequired(true)),

    async execute(client, interaction, MessageEmbed, profileModel, profileData) {
        console.log('Caravans');
        switch (interaction.options.getSubcommand()) {
            case 'start':
                break;
            case 'forfeit':
                break;
            case 'rules':
                
                break;
        }
    },
};