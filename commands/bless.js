module.exports = {
    name: "auction",
    description: "Sell someone else",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        
        try{


            const { getImage } = require('random-reddit')

            const image = await getImage('eyebleach')

            let blessedImagesEmbed = new MessageEmbed()
            .setImage(image);

            message.channel.send({ embeds: [blessedImagesEmbed] });


        }
        catch(err){
            console.error(err)
        }
    }
}

