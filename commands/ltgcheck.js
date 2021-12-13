const talkedRecently = new Set();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'ltgcheck',
    description: 'ltgcheck',
    data: new SlashCommandBuilder().setName('ltgcheck')
    .setDescription('Lets hear his advice'),
    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileModel, profileData) {
        try {
            if (talkedRecently.has(interaction.guild.id)) {
                interaction.reply(`<@${interaction.author.id}> its a server cooldown, wait like 1 min`);
            }
            else {
                const randomImg = [
                    'https://cdn.discordapp.com/attachments/816008277619638332/903245120399355924/image0-40.png',
                    'https://cdn.discordapp.com/attachments/816008277619638332/905492943845093456/B927E6C3-934F-4D5D-83B6-63FC7534B741.jpg',
                ];

                const random_hex_color_code = () => {
                    const n = (Math.random() * 0xfffff * 1000000).toString(16);
                    return '#' + n.slice(0, 6);
                };

                const ltgEmbed = new MessageEmbed()
                .setImage(randomImg[Math.floor(Math.random() * randomImg.length)])
                .setColor(random_hex_color_code())
                .setTitle('Low Tier God\'s advice');

                interaction.reply({ embeds: [ltgEmbed] });

                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(interaction.user.guild.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(interaction.user.guild.id);
                }, 1 * 60000);
            }
        }
        catch (err) {
            console.error(err);
        }
    },
};