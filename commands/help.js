const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Helps the user with commands",
    async execute(Discord, client, args, message, profileModel, profileData){

        const cmdChoice = args[1];

        const royCoinEmbedHelp = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#bc73f0')
        .setTimestamp()
        .setFooter('Reddit Gold Replacement?');    

        switch(cmdChoice){

            case "ping":
                royCoinEmbedHelp.addfields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: "**>ping**"},
                    {name: "Command", value: "Pings the server this bot is hosted on so that you can see the delay between discord and it"}
                )
                break;
            case "balance":
                royCoinEmbedHelp.addfields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: "**>balance**"},
                    {name: "Command", value: "Checks how much roycoins you have"}
                )
                break;
            case "donate":
                royCoinEmbedHelp.addfields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: "**>donate**"},
                    {name: "Command", value: "Donates 1 roycoin to the mentioned user, alternativly you react to someones message with :roycoin:"}
                )
                break;
            case "give":
                royCoinEmbedHelp.addfields(
                    {name: "Permissions", value: "Only admins can use it"},
                    {name: "Usage", value: "**>give [amount]"},
                    {name: "Command", value: "Give [amount]\nWith this you can make fun of people who gained more money"}
                )
                break;
            case "remove":
                royCoinEmbedHelp.addfields(
                    {name: "Permissions", value: "Only admins can use it"},
                    {name: "Usage", value: "**>remove [amount]"},
                    {name: "Command", value: "Removes [amount]\nWith this you can make fun of people who lost their money"}
                )
                break;
        }

        message.channel.send({ embeds: [royCoinEmbedHelp] });

    }
}