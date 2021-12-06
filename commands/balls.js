module.exports = {
    name: "balls",
    description: "balls",
    async execute(client, interaction, MessageEmbed, profileModel, profileData){
        const ballsEmbed = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Penith Replacement?')
        .addFields(
            {name: "Penis", value: "Cock and balls\nCock and balls\nCock and balls\nCock and balls\nCock and balls"}
        );

        interaction.reply({ embeds: [ballsEmbed] });
    }
}