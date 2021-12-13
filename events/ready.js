const { CLIENT_ID, GUILD_ID } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = require('../arrays/interactionCommands.js');

require('dotenv').config();

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const currentDate = date + ' @ ' + time;

const activityMessage = 'the glorious sounds of capitalism';
const activityType = ['PLAYING', 'LISTENING', 'STREAMING', 'WATCHING'];

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        try {
            const readyMessage = `${client.user.tag} is online, hopefully it works`;

            console.log(readyMessage);

            client.user.setActivity(activityMessage, {
                type: activityType[1],
            });

            const rest = new REST({
                version: '9',
            }).setToken(process.env.DISCORD_TOKEN);

            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        }
        catch (err) {
            console.error(err);
        }
    },
};