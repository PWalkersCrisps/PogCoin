module.exports = {
    name: "auction",
    description: "Sell someone else",
    async execute(Discord, client, args, message, MessageEmbed, profileModel, profileData){
        
        try{


            const reddit = require('@elchologamer/random-reddit');

            let options = {
            imageOnly: true,
            allowNSFW: false,
            };

            var title;
            var content;
            reddit.getPost('Eyebleach', options).then(post => { //Make sure to change 'memes' with whatever subreddit you want

                title = post.title
                content = post.text

            })

            let blessedImagesEmbed = new MessageEmbed()
            .setTitle(title)
            .setImage(content);

            message.channel.send({ embeds: [blessedImagesEmbed] });


        }
        catch(err){
            console.error(err)
        }
    }
}

