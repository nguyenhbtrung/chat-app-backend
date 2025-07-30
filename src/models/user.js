'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Message, { foreignKey: 'senderId', as: 'sentMessages' });
            User.hasMany(models.Message, { foreignKey: 'receiverId', as: 'receivedMessages' });
            User.belongsToMany(User, { through: models.Friendship, foreignKey: 'requesterId', otherKey: 'addresseeId', as: 'addressees' });
            User.belongsToMany(User, { through: models.Friendship, foreignKey: 'addresseeId', otherKey: 'requesterId', as: 'requesters' });
            User.belongsTo(models.File, { foreignKey: 'avatarImgId', as: 'avatar' });
        }
    }
    User.init({
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true },
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarImgId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Files',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};