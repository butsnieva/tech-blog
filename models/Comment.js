const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Extending the Model prototype to the Comment class
class Comment extends Model { }

// Initializing the Comment class
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                notNull: {
                    msg: 'Comment text cannot be null'
                },
            },
        },
        // Adding user_id to link the comment to the user
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            validate: {
                notNull: {
                    msg: 'User id cannot be null'
                },
            },
        },
        // Adding post_id to link the comment to the post
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
            validate: {
                notNull: {
                    msg: 'Post id cannot be null'
                },
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;
