const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// Get all users
router.get('/', async (request, response) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        response.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});


// Get a single user
router.get('/:id', async (request, response) => {
    try {
        const dbUserData = await User.findByPk(request.params.id, {
            where: {
                id: request.params.id,
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'created_at'
                    ],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
            ],
        });
        if (!dbUserData) {
            response.status(404).json({ message: 'No user found with that id' });
            return;
        }
        response.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});


// CREATE new user
router.post('/', async (request, response) => {
    try {
        const dbUserData = await User.create({
            username: request.body.username,
            password: request.body.password,
        });

        request.session.save(() => {
            request.session.user_id = dbUserData.id;
            request.session.username = dbUserData.username;
            request.session.loggedIn = true;

            response.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Login to the website - creates a session
router.post('/login', async (request, response) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: request.body.username,
            },
        });

        if (!dbUserData) {
            response.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(request.body.password);

        if (!validPassword) {
            response.status(400).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        request.session.save(() => {
            request.session.user_id = dbUserData.id;
            request.session.username = dbUserData.username;
            request.session.loggedIn = true;

            response.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Logout of the account on the website - ends the session
router.post('/logout', (request, response) => {
    if (request.session.loggedIn) {
        request.session.destroy(() => {
            response.status(204).end();
        });
    } else {
        response.status(404).end();
    }
});

module.exports = router;