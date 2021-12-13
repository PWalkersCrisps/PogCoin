const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'gamble',
    description: 'gamble your life savings away',
    data: new SlashCommandBuilder().setName('gamble')
    .setDescription('Gamble all of your life savings away')
    .addIntegerOption(option => option.setName('amount').setDescription('How much do you want to gamble?')),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileModel, profileData) {
        const amount = interaction.options.getInteger('int');
        if (amount < 1) return interaction.reply({ content: `<${interaction.user.id}> Please can you actually try to gamble something?`, ephemeral: true });
        if (profileData.coins < amount) return interaction.reply({ content: 'Actually have enough coins??', ephemeral: true });


        const pogCoinGamble = new MessageEmbed() // Starts the proccess for creating an embed
        .setTimestamp();

        let probability;
        if (amount > 70) probability = 0.2;
        else probability = ((-amount + 100) / 2) / 75;

        if (Math.random() < probability) {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id, // looks for the id of the author
            }, {
                $inc: {
                    coins: amount, // when the id of the author is found, it gives them one coin
                    totalCoinsEarnt: amount * 2,
                    netGamble: amount,
                },
            });
            pogCoinGamble
            .setFooter('Holy shit you actually won?')
            .setColor('YELLOW')
            .addFields(
                { name: '!!!YOU WON!!!', value: `<@${interaction.user.id}> HOLY FUCKING SHIT YOU ACTUALLY WON? I PROBABLY SHOULD GIVE YOU ${amount * 2} <:pogcoin:899662337399750666>` },
            );
        }
        else {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id, // looks for the id of the author
            }, {
                $inc: {
                    coins: -amount, // when the id of the author is found, it gives them one coin
                    netGamble: -amount,
                },
            });
            pogCoinGamble
            .setFooter('Vegas Replacement?')
            .setColor('RED')
            .addFields(
                { name: 'YOU LOST!', value: `<@${interaction.user.id}> omg you actually lost ${amount} <:pogcoin:899662337399750666>, i really want to make fun of you` },
            );
        }

        interaction.reply({ embeds: [pogCoinGamble] });
    },
};