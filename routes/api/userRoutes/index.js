const router = require('express').Router();
const User = require('../../../models/User');

// CREATE USER
router.post('/', async (req, res) => {
    const {
        username,
        email,
        password,
    } =req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'You must provide a username, email, and password'});
    }

    try {
        const newUser = await User.create({
            username,
            email,
            password
        });
    } catch (e) {
        res.json(e);
    }
});

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

// GET USERS BY PRIMARY KEY
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    } catch (e) {
        res.json(e);
    }
});

// PATCH USER
router.patch('/:userId', async (req, res) => {
    const {
        username,
        email,
        password,
    } = req.body;
    try {
        await User.update(
            {
            username,
            email,
            password
            },
            {
                where: {
                    id: req.params.userId
                }
            }
            );
            const updatedUser = await User.findByPk(req.params.userId);
            res.json(updatedUser);
    } catch (e) {
        res.json(e);
    }
});

// DELETE USER
router.delete('/:userId', async function (req, res) {
    try {
        const deletedUser = await User.findByPk(req.params.userId);
        await User.destroy({
            where: {id: req.params.userId}
        });
        res.json(deletedUser);
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;
