const router = require(`express`).Router();
const { User } = require(`../../models`);

router.post(`/`, async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            res.json(newUser);
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post(`/login`, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user: req.body.user,
            },
        });
        if(!user) {
            res.status(400).json({ message: `Invalid username` });
            return;
        }
        const validPassword = user.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: `Invalid password` });
            return;
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.name = user.name;
            req.session.logged_in = true;

            res.json({ user, message: `Login successful` });
        });
    } catch (error) {
        res.status(500).json({ message: `Invalid username or password` });
    }
});

router.post(`/logout`, (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;