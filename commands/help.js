const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Helps the user with commands",
    async execute(Discord, client, args, message, profileModel, profileData){

        const cmdChoice = args[0];

        const royCoinEmbedHelp = new MessageEmbed() //Starts the proccess for creating an embed
        .setColor('#bc73f0')
        .setTimestamp()
        .setFooter('Wikipedia Replacement?');    

        console.log(cmdChoice)

        switch(cmdChoice){

            case "ping":
                royCoinEmbedHelp.addFields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: `**${process.env.DISCORD_PREFIX}ping**`},
                    {name: "Command", value: "Pings the server this bot is hosted on so that you can see the delay between discord and it"}
                );
                break;
            case "balance":
                royCoinEmbedHelp.addFields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: `**${process.env.DISCORD_PREFIX}balance**`},
                    {name: "Command", value: "Checks how much roycoins you have"}
                );
                break;
            case "donate":
                royCoinEmbedHelp.addFields(
                    {name: "Permissions", value: "Anyone can use it"},
                    {name: "Usage", value: `**${process.env.DISCORD_PREFIX}donate**`},
                    {name: "Command", value: "Donates 1 roycoin to the mentioned user, alternativly you react to someones message with :roycoin:"}
                );
                break;
            case "give":
                royCoinEmbedHelp.addFields(
                    {name: "Permissions", value: "Only admins can use it"},
                    {name: "Usage", value: `**${process.env.DISCORD_PREFIX}give [amount]**`},
                    {name: "Command", value: "Give [amount]\nWith this you can make fun of people who gained more money"}
                );
                break;
            case "remove":
                royCoinEmbedHelp.addFields(
                    {name: "Permissions", value: "Only admins can use it"},
                    {name: "Usage", value: `**${process.env.DISCORD_PREFIX}remove [amount]**`},
                    {name: "Command", value: "Removes [amount]\nWith this you can make fun of people who lost their money"}
                );
                break;
            case undefined:
                royCoinEmbedHelp.addFields(
                    {name: "Help", value: "This is the help command"},
                    {name: "Current prefix", value: `${process.env.DISCORD_PREFIX}`},
                    {name: "Commands", value: `Ping - Pings the Server\nBalance - Check your current roycoin balance\nDonate {user} - Give someone a roycoin\nShop - Lists the current items in the shop\nBuy [item] - Buys the selected item, given that you have enough money\nGive {user} [Amount] - **Admin Command** - Give the user some coins \nRemove {user} [amount] - **Admin Command** - Remove coins from the user `}
                );
                break;
        }

        message.channel.send({ embeds: [royCoinEmbedHelp] });

    }
}