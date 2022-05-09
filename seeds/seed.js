const sequelize = require(`../config/connection`);
const { User, Comment, Post } = require(`../models`);

const userData = require(`./userData.json`);
const postData = require(`./postData.json`);
const commentData = require(`./commentData.json`);

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    userData = () => User.bulkCreate(userData);
    postData = () => Post.bulkCreate(postData);
    commentData = () => Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();
