const router = require('express').Router();
const { Comment } = require('../../models');
const authentication = require('../../utils/auth');

// Get all comments
router.get('/', async (request, response) => {
    try {
        const dbCommentData = await Comment.findAll({});

        response.json(dbCommentData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Get single comment
router.get('/:id', async (request, response) => {
    try {
        const dbCommentData = await Comment.findByPk(request.params.id, {
            where: {
                id: request.params.id,
            },
        });
        if (!dbCommentData) {
            response.status(404).json({ message: 'No comment found with that id' });
            return;
        }
        response.json(dbCommentData);
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Create new comment
router.post('/', authentication, async (request, response) => {
    console.log('This and that', request.session);
    try {
        if(request.session) {
            const dbCommentData = await Comment.create({
                comment_text: request.body.comment_text,
                post_id: request.body.post_id,
                user_id: request.session.user_id,
            });

            response.status(200).json(dbCommentData);
            console.log('data', dbCommentData);
        }
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Edit comment
router.put('/:id', authentication, async (request, response) => {
    try {
        const dbCommentData = await Comment.update({
            comment_text: request.body.comment_text,
            where: {
                id: request.params.id,
            },
        });
        if (!dbCommentData) {
            response.status(404).json({ message: 'No comment found with that id!' });
            return;
        }
        response.status(200).json({ message: `Updated comment id #${request.params.id}` });
    } catch (err) {
        console.log(err);
        response.status(500).json(err);
    }
});

// Delete comment
router.delete('/:id', authentication, async (request, response) => {
    try {
        const dbCommentData = await Comment.destroy({
            where: {
            id: request.params.id,
            },
        });

        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with that id!' });
            return;
        }

        response.status(200).json({ message: `Comment id #${request.params.id} has been removed` });
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;
