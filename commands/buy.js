const items = require("../economy/shopitems");


module.exports = {
    name: "ping",
    description: "pings the server to see the delay between the client and the server",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){

        let role = message.guild.roles.cache.find(r => r.id === items.find().roleid);

        if(!args[0]) return message.channel.send("Actually try to buy something?")
        const itemToBuy = args[0].toLowerCase();

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.channel.send("Actually try to buy a real item??")

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;
        if(profileData.coins < itemPrice) return message.channel.send("Man... youre broke, get more more roycoins");

        message.author.roles.add(role)

    }
}