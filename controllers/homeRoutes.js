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

router.get(`/post/:id`, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: [`name`]
            }]});

        const post = postData.get({ plain: true });

        res.render(`post`, {
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;