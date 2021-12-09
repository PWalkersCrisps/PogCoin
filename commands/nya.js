const lewdImages = require('../arrays/lewdImages');
const talkedRecently = new Set();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'nya',
    description: 'uwu',
    data: new SlashCommandBuilder().setName('nya')
    .setDescription('UwU OwO OmO im very hornmy'),
    async execute(client, interaction, MessageEmbed, profileModel, profileData) {
        try {
            if (talkedRecently.has(interaction.guild.id)) {
                interaction.reply(`<@${interaction.user.id}> its a server cooldown, wait like 20 mins`);
            }
            else {
                const random_hex_color_code = () => {
                    const n = (Math.random() * 0xfffff * 1000000).toString(16);
                    return '#' + n.slice(0, 6);
                };

                const uwuEmbed = new MessageEmbed()
                .setImage(lewdImages[Math.floor(Math.random() * lewdImages.length)])
                .setColor(random_hex_color_code())
                .setTitle('Damn these people really being horny???')
                .setFooter('If you see anyone else being horny on main, screenshot it and send it to PWC');

                interaction.reply({ embeds: [uwuEmbed] });
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(interaction.guild.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(interaction.guild.id);
                }, 20 * 60000);
            }
        }
        catch (err) {
            console.error(err);
        }

    },

};