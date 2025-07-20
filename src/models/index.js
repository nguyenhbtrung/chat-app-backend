import sequelize from "../config/database.js";
import Friendship from "./friendship.js";
import Message from "./message.js";
import User from "./user.js";


User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });


User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

User.belongsToMany(User, { through: Friendship, foreignKey: 'requester_id', otherKey: 'addressee_id', as: 'addressees' });
User.belongsToMany(User, { through: Friendship, foreignKey: 'addressee_id', otherKey: 'requester_id', as: 'requesters' });

export { sequelize, User, Message, Friendship };