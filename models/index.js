const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comment`);

// User to comment relation
User.hasMany(Comment, {
    foreignKey: `user_id`
});
Comment.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});

// User to Post relation
User.hasMany(Post, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});
Post.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});

// Post to comment relation
Post.hasMany(Comment, {
    foreignKey: `post_id`,
    onDelete: `CASCADE`
});
Comment.belongsTo(Post, {
    foreignKey: `post_id`,
    onDelete: `CASCADE`
});

module.exports = { User, Post, Comment };
