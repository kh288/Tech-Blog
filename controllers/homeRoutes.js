const router = require(`express`).Router();
const { User, Post, Comment } = require(`../models`);
// const withAuth = require(`../utils/auth`);

router.get(`/`, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: [`name`]
            }]});

        const posts = postData.map((post) => post.get({ plain: true}));

        res.render(`home`, {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;