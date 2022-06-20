const seedUsers = require('./user-seeds');
const seedPosts = require('./post-examples');
const seedComments = require('./comment-examples');
const sequelize = require('../config/connection');

const seedData = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedData();