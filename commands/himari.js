const talkedRecently = new Set();

module.exports = {
    name: "himari",
    description: "uwu",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if (talkedRecently.has(message.guild.id)) {
                message.channel.send(`<@${message.author.id}> its a server cooldown, wait like 2 mins`);
            } else {
                const random_hex_color_code = () => {
                    let n = (Math.random() * 0xfffff * 1000000).toString(16);
                    return '#' + n.slice(0, 6);
                };

                let uwuEmbed = new MessageEmbed()
                .setImage("https://cdn.discordapp.com/attachments/816008277619638332/903704994337947678/attachment-7.gif")
                .setColor(random_hex_color_code())
                .setTitle("WHY DO YOU DO THIS???")
                .setFooter("Please do not ruin the innocence of Himari, we all love them");

                message.channel.send({ embeds: [uwuEmbed] });
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.guild.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.guild.id);
                }, 20 * 60000);
            }
        }
        catch(err){
            console.error(err);
        }

    }

}