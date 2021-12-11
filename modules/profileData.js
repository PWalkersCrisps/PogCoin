const mongoose = require('mongoose');
const profileModel = require('../models/profileSchema.js');
async function createProfile(userID) {
    await profileModel.create({
        userID: userID,
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
    // const savedUser = await newUser.save();
}

module.exports = { createProfile };