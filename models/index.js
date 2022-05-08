const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comment`);

// User to comment relation
User.hasMany(Comment, {
    foreignKey: `user_id`
});
Comment.belongsTo(User, {
    foreignKey: `user_id`
});

// User to Post relation
User.hasMany(Post, {
    foreignKey: `user_id`
});
Post.belongsTo(User, {
    foreignKey: `user_id`
});

// Post to comment relation
Post.hasMany(Comment, {
    foreignKey: `comment_id`
});
Comment.belongsTo(Post, {
    foreignKey: `comment_id`
});

module.exports = { User, Post, Comment };
