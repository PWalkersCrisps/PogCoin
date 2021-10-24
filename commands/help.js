const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Helps the user with commands",
    cooldown: 5,
    async execute(Discord, client, args, message, profileModel, profileData){

        try{
            const cmdChoice = args[0];

            const pogCoinEmbedHelp = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#bc73f0')
            .setTimestamp()
            .setFooter('Wikipedia Replacement?');    

            console.log(cmdChoice)

            switch(cmdChoice){

                case "ping":
                    pogCoinEmbedHelp.addFields(
                        {name: "Permissions", value: "Anyone can use it"},
                        {name: "Usage", value: `**${process.env.DISCORD_PREFIX}ping**`},
                        {name: "Command", value: "Pings the server this bot is hosted on so that you can see the delay between discord and it"}
                    );
                    break;
                case "balance":
                    pogCoinEmbedHelp.addFields(
                        {name: "Permissions", value: "Anyone can use it"},
                        {name: "Usage", value: `**${process.env.DISCORD_PREFIX}balance**`},
                        {name: "Command", value: "Checks how much pogcoins you have"}
                    );
                    break;
                case "donate":
                    pogCoinEmbedHelp.addFields(
                        {name: "Permissions", value: "Anyone can use it"},
                        {name: "Usage", value: `**${process.env.DISCORD_PREFIX}donate**`},
                        {name: "Command", value: "Donates 1 pogcoin to the mentioned user, alternativly you react to someones message with :pogcoin:"}
                    );
                    break;
                case "give":
                    pogCoinEmbedHelp.addFields(
                        {name: "Permissions", value: "Only admins can use it"},
                        {name: "Usage", value: `**${process.env.DISCORD_PREFIX}give [amount]**`},
                        {name: "Command", value: "Give [amount]\nWith this you can make fun of people who gained more money"}
                    );
                    break;
                case "remove":
                    pogCoinEmbedHelp.addFields(
                        {name: "Permissions", value: "Only admins can use it"},
                        {name: "Usage", value: `**${process.env.DISCORD_PREFIX}remove [amount]**`},
                        {name: "Command", value: "Removes [amount]\nWith this you can make fun of people who lost their money"}
                    );
                    break;
                case undefined:
                    pogCoinEmbedHelp.addFields(
                        {name: "Help", value: "This is the help command"},
                        {name: "Current prefix", value: `${process.env.DISCORD_PREFIX}`},
                        {name: "Commands", value: `Ping - Pings the Server
                        Profile {user} - Check your profile or someone else's
                        Balance {user} - Check your current pogcoin balance
                        Donate {user} [amount] - Give someone a pogcoin
                        Shop - Lists the current items in the shop
                        Buy [item] - Buys the selected item, given that you have enough money
                        Gamble [amount] - Gamble for double or nothing
                        About - The about for this bot
                        
                        Give {user} [Amount] - **Admin Command** - Give the user some coins
                        Remove {user} [amount] - **Admin Command** - Remove coins from the user
                        Reset {user} - **Admin Command** - Makes the mentioned user have the default amount of coins and stats`}
                    );
                    break;
            }

            message.channel.send({ embeds: [pogCoinEmbedHelp] });
        }
        catch(err){
            console.log(err)
        }
    }
}