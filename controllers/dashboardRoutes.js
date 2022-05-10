const router = require(`express`).Router();
const { User, Post, Comment } = require(`../models`);
const withAuth = require(`../utils/auth`);

router.get(`/`, withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                'user_id': req.session.user.id,
                include: User
            },
        });

        const posts = postData.map((post) => post.get({ plain: true}));
        console.log(posts);

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