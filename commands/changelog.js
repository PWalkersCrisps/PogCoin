module.exports = {
    name: "changelog",
    aliases: ["cl"],
    cooldown: 5,
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, args, cmd, message, MessageEmbed, profileModel, profileData){
        /* 
        const pogCoinChangeLog = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#1a7e3f')
        .setTimestamp()
        .setFooter('Browser History Replacement?')

        const choice = args[0];

        switch(choice){
            case "1.1.0b":
                break;
            case undefined:
                pogCoinChangeLog
                .addFields(
                    {name: `List of possible choices`, value: `1.1.0b - Gamble Update
                    1.2.0b - Aliases update
                    `}
                );
                break;
        }

        message.channel.send({ embeds: [pogCoinChangeLog] }) 
        */
    }
}