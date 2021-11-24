const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const prefix = process.env.DISCORD_PREFIX;
const mongoose = require("mongoose");
const { MessageEmbed } = require('discord.js');
const profileModel = require("./models/profileSchema.js");
const blockedUsers = require("./arrays/blockedUsers.js");
const fs = require("fs");

require("dotenv").config();

const coinCooldown = new Set();

///-----Command/Event Handlers-----///

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.events = new Discord.Collection();

try{
    ['event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord)
    })
}
catch(err){
    console.error(err);
}

///-----Mongoose-----///
mongoose.connect(process.env.MONGODB_SRV, { //idk what this shit does
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to the MongoDB database`)
}).catch((err) => {
    console.error(err);
});

///-----Executes When Message Is Created-----///
client.on("messageCreate", async(message) => {

    ///-----Pogcoin RNG-----//

    if (Math.random() < 0.01){
        if(message.author.bot) return;
        if (!coinCooldown.has(message.author.id)) { //goes to check if the cooldowns map *DOESNT* habe the author's
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id, //looks for the id of the author
            }, {
                $inc: {
                    coins: 1, //when the id of the author is found, it gives them one coin
                    totalCoinsEarnt: 1
                }
            });
            

            const pogCoinEmbedReward = new MessageEmbed() //Starts the proccess for creating an embed
            .setColor('#ffff00')
            .setTimestamp()
            .setFooter('Reddit Gold Replacement?');    
            
            if (message.member.roles.cache.some(role => role.name === 'He/Him')){ //checks if the auther has the he/him role
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good boy`},
                )        
            }
            else if (message.member.roles.cache.some(role => role.name === 'She/Her')){ //checks if the auther has the she/her role
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good girl`},
                )        
            }
            else{ //If the user has the they/them or dont have a gender role, it will always default to this
                pogCoinEmbedReward.addFields(
                    { name: 'pog Coin', value: `Youve been rewarded with a pog Coin for being a good child`},
                )            
            }

            message.author.send({ embeds: [pogCoinEmbedReward] }); //sends the embed that was just created
            
            coinCooldown.add(message.author.id); //Adds a cooldown to the id of the author
            setTimeout(() => {
                // Removes the user from the set after a while
                coinCooldown.delete(message.author.id);
            }, 60 * 60000); //First number is minutes the second one times it because it is in milliseconds        
        }
    }

    let profileData;
    try{

        profileData = await profileModel.findOne({userID: message.author.id}); //Attempts to look for a user in the DB with the user's id
        if(!profileData) //Checks if the user has any data in the DB
        {
            let newUser = await profileModel.create({
                userID: message.author.id,
                coins: 1,
                dailyTimestamp: 0,
                robTimestamp: 0,
                totalCoinsEarnt: 0,
                coinsDonated: 0,
                coinsReceived: 0,
                netGamble: 0,
                robSuccess: 0,
                robFails: 0,
                timesRobbed: 0,
            });
            //const savedUser = await newUser.save();
        }
    } 
    catch(err){
        console.error(err) //if mongoose had a problem trying to create a new user, then it will log it in the console rather then crashing
    }

    ///-----CMD execution-----///

    if(!message.content.startsWith(prefix) || message.author.bot) return; //if the message didnt start with the bot's prefix, it just goes back to the start
    if (blockedUsers.includes(message.author.id)) return message.channel.send(`<@${message.author.id}>, lol fuck you youre blocked from the bot now!!`)

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try{
        client.commands.get(command).execute(Discord, client, args, message, MessageEmbed, profileModel, profileData);
    }
    catch(err){
        console.log("cmd error");
    }
});

///-----Login-----///
client.login(process.env.DISCORD_TOKEN); //this is the token of the bot

