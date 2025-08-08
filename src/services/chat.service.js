import db from '../models/index.js';
import { getAllChatsWithLatestMessagesQuery, getFriendChatsWithLatestMessagesQuery } from '../queries/chat.queries.js';
import { userSocketMap } from '../socket/index.js';

const { sequelize } = db;

const mapOnline = (onlineUserIds, userKey) => item => ({
    ...item,
    online: onlineUserIds.includes(item?.[userKey]?.id),
});


export const getAllChatsAsync = async (userId, page = 1, limit = 10, search = '') => {
    const offset = (page - 1) * limit;
    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id))

    try {
        const results = await sequelize.query(getAllChatsWithLatestMessagesQuery, {
            replacements: { userId, limit, offset, search },
            type: sequelize.QueryTypes.SELECT,
            nest: true
        });

        return results.map(mapOnline(onlineUserIds, 'otherUser'));
    } catch (error) {
        console.error('Error in getAllChatsAsync:', error);
        throw new Error('Failed to fetch chats');
    }
};

export const getFriendChatsAsync = async (userId, page = 1, limit = 10, search = '') => {
    const offset = (page - 1) * limit;
    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id))
    try {
        const results = await sequelize.query(getFriendChatsWithLatestMessagesQuery, {
            replacements: { userId, limit, offset, search },
            type: sequelize.QueryTypes.SELECT,
            nest: true
        });
        return results.map(mapOnline(onlineUserIds, 'friend'));
    } catch (error) {
        console.error('Error in getFriendChatsAsync:', error);
        throw new Error('Failed to fetch chats');
    }
};
