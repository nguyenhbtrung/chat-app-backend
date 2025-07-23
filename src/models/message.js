'use strict';
import { Model } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { MESSAGE_TYPE } = require('../constants.cjs');

export default (sequelize, DataTypes) => {
    class Message extends Model {

        static associate(models) {
            Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
            Message.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
        }
    }
    Message.init({
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...MESSAGE_TYPE),
            allowNull: false,
            defaultValue: 'text',
        },
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};