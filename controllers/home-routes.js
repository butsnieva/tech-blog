const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// Get home page
router.get('/', async (request, response) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC'],
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });

        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );

        response.render('homepage', {
            posts,
            loggedIn: request.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get the individual post page
router.get('/post/:id', async (request, response) => {
    try {
        const dbPostData = await Post.findByPk(request.params.id, {
            where: {
                id: request.params.id,
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        if (!dbPostData) {
            response.status(404).json({ message: 'No post found with that id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        response.render('individual-post', { post, loggedIn: request.session.loggedIn });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get login page
router.get('/login', (request, response) => {
    if (request.session.loggedIn) {
        response.redirect('/');
        return;
    }
    response.render('login');
});

// Get signup page
router.get('/signup', (request, response) => {
    response.render('signup');
});

module.exports = router;