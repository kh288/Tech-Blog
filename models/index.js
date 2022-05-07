const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comment`);

// User is able to have many posts, and comments
User.hasMany(Post, {
  foreignKey: `user_id`,
  onDelete: `CASCADE`
});
User.hasMany(Comment, {
  foreignKey: `user_id`,
  onDelete: `CASCADE`
});
// Post and comment both belong to User
Post.belongsTo(User, {
  foreignKey: `user_id`
});
Comment.belongsTo(User, {
  foreignKey: `user_id`
});

module.exports = { User, Post, Comment };
