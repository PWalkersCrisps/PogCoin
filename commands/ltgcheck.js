const talkedRecently = new Set();

module.exports = {
    name: "ltgcheck",
    description: "ltgcheck",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
            if (talkedRecently.has(message.guild.id)) {
                message.channel.send(`<@${message.author.id}> its a server cooldown, wait like 1 min`);
            } else {
                const randomImg = [
                    "https://cdn.discordapp.com/attachments/816008277619638332/903245120399355924/image0-40.png",
                    "https://cdn.discordapp.com/attachments/882364852964847727/902245848841322566/0c6431c4e4c2357157b2a20217ca47dccff72becdf0e333050606c73d0c7118d_1.jpg",
                ]

                const random_hex_color_code = () => {
                    let n = (Math.random() * 0xfffff * 1000000).toString(16);
                    return '#' + n.slice(0, 6);
                };

                let ltgEmbed = new MessageEmbed()
                .setImage(randomImg[Math.floor(Math.random() * randomImg.length)])
                .setColor(random_hex_color_code())
                .setTitle("Low Tier God's advice")
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.guild.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.guild.id);
                }, 1 * 60000);
            }
        }
        catch(err){
            console.error(err);
        }
    }
}