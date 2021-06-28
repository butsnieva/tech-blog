const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Extending the Model prototype to the Post class
class Post extends Model { }

// Initializing the Post class
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title cannot be null'
                },
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Content cannot be null'
                },
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            //allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;