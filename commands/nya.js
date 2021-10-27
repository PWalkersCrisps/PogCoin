const lewdImages = require("../arrays/lewdImages")

module.exports = {
    name: "nya",
    description: "uwu",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        try{
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
        }
        catch(err){
            console.log(err);
        }

    }

}