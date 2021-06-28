const sequelize = require('../config/connection');
const seedPost = require('./postData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedPost();
    console.log('\n----- POST SEEDED -----\n');
    process.exit(0);
};

seedAll();