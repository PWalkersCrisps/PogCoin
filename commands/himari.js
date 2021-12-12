const talkedRecently = new Set();
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'himari',
    description: 'uwu',
    data: new SlashCommandBuilder().setName('himari')
    .setDescription('Why?????'),

    async execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, profileSchema, cooldownSchema, profileData) {
        if (talkedRecently.has(interaction.guild.id)) {
            interaction.channel.send(`<@${interaction.author.id}> its a server cooldown, wait like 2 mins`);
        }
        else {
            const random_hex_color_code = () => {
                const n = (Math.random() * 0xfffff * 1000000).toString(16);
                return '#' + n.slice(0, 6);
            };

            const uwuEmbed = new MessageEmbed()
            .setImage('https://cdn.discordapp.com/attachments/816008277619638332/903704994337947678/attachment-7.gif')
            .setColor(random_hex_color_code())
            .setTitle('WHY DO YOU DO THIS???')
            .setFooter('Please do not ruin the innocence of Himari, we all love them');

            interaction.reply({ embeds: [uwuEmbed] });

            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(interaction.guild.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(interaction.guild.id);
            }, 2 * 60000);
        }
    },

};