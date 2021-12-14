const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ] });

const mongoose = require('mongoose');
const fs = require('fs');
const { createProfile } = require('./modules/profileData.js');
const { model } = require('./models/profileSchema.js');
const blockedUsers = require('./arrays/blockedUsers.js');

require('dotenv').config();

// /-----Command/Event Handlers-----///
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commands = new Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
    else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// -----Mongoose----- //
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the MongoDB database');
}).catch((err) => {
    console.error(err);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (blockedUsers.includes(interaction.member.id)) return;

    const command = client.commands.get(interaction.commandName);

    let profileData;
    try {
        profileData = await model.findOne({ userID: interaction.user.id });
        if (!profileData) {
            createProfile(interaction.user.id);
        }
    }
    catch (err) {
        console.error(err);
    }

    if (!command) return;

    try {
        await command.execute(client, interaction, MessageEmbed, MessageActionRow, MessageButton, model, profileData);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// /-----Login-----///
client.login(process.env.DISCORD_TOKEN);