const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// Get home page
router.get('/', async (req, res) => {
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

        res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get the individual post page
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            where: {
                id: req.params.id,
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
            res
                .status(404)
                .json({ message: 'No post found with that id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('individual-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Get signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;