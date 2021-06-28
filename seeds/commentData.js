const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Test comment 1',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'Test comment 2',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'Test comment 3',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'Test comment 4',
        user_id: 1,
        post_id: 2,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;