const mongoose = require('mongoose');
const { profileSchema, cooldownSchema } = require('../models/profileSchema.js');
async function createProfile(userID) {
    await profileSchema.create({
        userID: userID,
        coins: 1,
        totalCoinsEarnt: 0,
        coinsDonated: 0,
        coinsReceived: 0,
        netGamble: 0,
        robSuccess: 0,
        robFails: 0,
        timesRobbed: 0,
    });
    await cooldownSchema.create({
        userID: userID,
        dailyTimestamp: 0,
        robTimestamp: 0,
    });
}

module.exports = { createProfile };