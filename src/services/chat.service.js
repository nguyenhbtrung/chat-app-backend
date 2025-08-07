import db from '../models/index.js';
import { getAllChatsWithLatestMessagesQuery } from '../queries/chat.queries.js';
import { userSocketMap } from '../socket/index.js';
import { unflattenObject } from '../utils/objectUtils.js';

const { sequelize } = db;

export const getAllChatsAsync = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    try {
        const results = await sequelize.query(getAllChatsWithLatestMessagesQuery, {
            replacements: { userId, limit, offset },
            type: sequelize.QueryTypes.SELECT
        });

        const onlineUserIds = Object.keys(userSocketMap)
            .map(id => parseInt(id))
        console.log("Check online users", onlineUserIds);
        return results.map(item => {
            const obj = unflattenObject(item);
            obj.online = onlineUserIds.includes(obj?.otherUser?.id);
            return obj;
        });
    } catch (error) {
        console.error('Error in getAllChatsAsync:', error);
        throw new Error('Failed to fetch chats');
    }
};

export const getOnlineUser = async (userId, page = 1, limit = 10) => {

};
