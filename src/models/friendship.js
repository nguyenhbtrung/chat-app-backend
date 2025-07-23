'use strict';
import { Model } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { FRIENDSHIP_STATUS } = require('../constants.cjs');

export default (sequelize, DataTypes) => {
    class Friendship extends Model {

        static associate(models) {
            // define association here
        }
    }
    Friendship.init({
        requesterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        addresseeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM(...FRIENDSHIP_STATUS),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        modelName: 'Friendship',
    });
    return Friendship;
};