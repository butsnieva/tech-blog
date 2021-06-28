const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authentication = require('../../utils/auth');

// Get all posts
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
                {
                    model: User,
                    attributes: [
                        'id',
                        'username',
                    ],
                },
            ],
        });
        
        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );
        response.json(posts);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});


// Get a single post
router.get('/:id', async (request, response) => {
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
        response.json(post);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});


// Create new post
router.post('/', authentication, async (request, response) => {
    try {
        const dbPostData = await Post.create({
            title: request.body.title,
            content: request.body.content,
            user_id: request.session.user_id,
        });

        response.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Edit post
router.put('/:id', authentication, async (request, response) => {
    try {
        const dbPostData = await Post.update({
            title: request.body.title,
            content: request.body.content,
        },
        {
            where: {
                id: request.params.id,
            },
        });
        if (!dbPostData) {
            response.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        response.status(200).json({ message: `Updated post id #${request.params.id}` });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Delete post
router.delete('/:id', authentication, async (request, response) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: request.params.id,
            },
        });
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        response.status(200).json({ message: `Post id #${request.params.id} has been removed` });
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;