const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
        // include: [
        //     {
        //     model: Comment,
        //     attributes: [
        //         'id',
        //         'comment_text',
        //         'post_id', 
        //         'user_id', 
        //         'created_at'
        //     ],
        //     },
        // ],
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

module.exports = router;