const { User } = require('../models');

const userData = [
    {
        username: 'butsnieva',
        password: 'pass123',
    },
];

const seedComment = () => User.bulkCreate(userData);

module.exports = seedComment;