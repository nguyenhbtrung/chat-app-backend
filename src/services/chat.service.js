import db from '../models/index.js';
import { getAllChatsWithLatestMessagesQuery } from '../queries/chat.queries.js';
import { unflattenObject } from '../utils/objectUtils.js';

const { sequelize } = db;

export const getAllChatsAsync = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    try {
        const results = await sequelize.query(getAllChatsWithLatestMessagesQuery, {
            replacements: { userId, limit, offset },
            type: sequelize.QueryTypes.SELECT
        });

        return results.map(unflattenObject);
    } catch (error) {
        console.error('Error in getAllChatsAsync:', error);
        throw new Error('Failed to fetch chats');
    }
};

export const getOnlineUser = async (userId, page = 1, limit = 10) => {

};
