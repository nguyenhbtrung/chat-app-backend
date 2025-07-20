import sequelize from "../config/database.js";

const FRIENDSHIP_STATUS = ['pending', 'accepted', 'rejected', 'blocked'];

const Friendship = sequelize.define('Friendship', {
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    addressee_id: {
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
});

export default Friendship;