const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const authentication = require('../utils/auth');

// Get dashboard page
router.get('/', authentication, async (request, response) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: request.session.user_id,
            },
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

        response.render('dashboard', {
            posts,
            loggedIn: request.session.loggedIn,
            user_id: request.session.user_id,
            username: request.session.username,
        });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get the edit post page
router.get('/edit/:id', authentication, async (request, response) => {
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
        response.render('edit-post', { post, loggedIn: request.session.loggedIn });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get the add new post page
router.get('/new', authentication, async (request, response) => {
    try {
        response.render('add-new-post', { loggedIn: request.session.loggedIn });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

module.exports = router;