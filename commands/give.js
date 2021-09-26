const profileModel = require("../models/profileSchema");

module.exports = {
  name: "give",
  description: "give a player some coins",
  async execute(message, args, cmd, client, discord, profileData) {

    if (!args.length) return message.channel.send("You need to mention a player to give them coins");
    const amount = args[1];
    if (!message.mentions.users.first()) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Ayo if you want to actually give money make it an actual number");

    try {
      const targetData = await profileModel.findOne({ userID: message.mentions.users.first().id });
      if (!targetData) 

      await profileModel.findOneAndUpdate(
        {
          userID: message.mentions.users.first().id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );

      return message.channel.send(`This player has been given their coins! ${amount} of coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};
