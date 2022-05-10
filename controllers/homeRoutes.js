const router = require(`express`).Router();
const { User, Post, Comment } = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: User
        });

        const posts = postData.map((post) => post.get({ plain: true}));

        res.render(`home`, {
            layout:`main`,
            posts
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get(`/post/:id`, withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: [`name`]
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: [`name`]
                }]
            }]});

        const post = postData.get({ plain: true });

        res.render(`home`, {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get(`/login`, (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect(`/dashboard`);
        } else {
            res.render(`login`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get(`/signup`, (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect(`/dashboard`);
        } else {
            res.render(`signup`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;