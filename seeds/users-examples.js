const { User } = require('../models');

const userExamples = [{
        username: 'Lucas',
        password: 'lucas12345'
    },
    {
        username: 'Leo',
        password: 'leo12234567'
    },
    {
        username: 'Andrew',
        password: 'andrew1245'
    }
];

const seedUsers = () => User.bulkCreate(userExamples);

module.exports = seedUsers;