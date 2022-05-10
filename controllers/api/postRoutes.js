const router = require(`express`).Router();
const { Post } = require(`../../models`);
const withAuth = require(`../../utils/auth`);

router.post(`/`, withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        console.log(newPost);
        res.json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put(`/:id`, withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete(`/:id`, withAuth, async (req, res) => {
    try {
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;