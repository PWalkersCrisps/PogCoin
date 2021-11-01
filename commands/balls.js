module.exports = {
    name: "balls",
    aliases: ["penis", "penith", "cock"],
    cooldown: 1,
    description: "balls",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        if(message.channel.id === "816008277619638332") return message.channel.send(`Please use this in <#899055241104879616> or else this chat will be spammed`);
        const ballsEmbed = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#ffff00')
        .setTimestamp()
        .setFooter('Penith Replacement?')
        .addFields(
            {name: "Penis", value: "Cock and balls\nCock and balls\nCock and balls\nCock and balls\nCock and balls"}
        );

        message.channel.send({ embeds: [ballsEmbed] }) 
    }
}