const { createProfile } = require('../modules/profileData.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(newMember) {
        console.log('Creating a new profile');
        try {
            createProfile(newMember.id);
            console.log('Profile successfully created');
        }
        catch (error) {
            console.log('Error during the creation of the user profile');
            console.log(error);
        }
    },
};