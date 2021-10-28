const lewdImages = require("../arrays/lewdImages")
const talkedRecently = new Set();

module.exports = {
    name: "nya",
    description: "uwu",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if (talkedRecently.has(message.guild.id)) {
                message.channel.send(`<@${message.author.id}> its a server cooldown, wait like 10 mins`);
            } else {
                const random_hex_color_code = () => {
                    let n = (Math.random() * 0xfffff * 1000000).toString(16);
                    return '#' + n.slice(0, 6);
                };

                let uwuEmbed = new MessageEmbed()
                .setImage(lewdImages[Math.floor(Math.random() * lewdImages.length)])
                .setColor(random_hex_color_code())
                .setTitle("Damn these people really being horny???")
                .setFooter("If you see anyone else being horny on main, screenshot it and send it to PWC");

                message.channel.send({ embeds: [uwuEmbed] });
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.guild.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.guild.id);
                }, 60 * 60000);
            }
        }
        catch(err){
            console.log(err);
        }

    }

}