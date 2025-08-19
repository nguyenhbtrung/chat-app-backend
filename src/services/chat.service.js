import { Op, where } from 'sequelize';
import db from '../models/index.js';
import { getAllChatsWithLatestMessagesQuery, getFriendChatsWithLatestMessagesQuery } from '../queries/chat.queries.js';
import { userSocketMap } from '../socket/index.js';

const { sequelize, Message, File } = db;

const mapOnline = (onlineUserIds, userKey) => item => ({
    ...item,
    online: onlineUserIds.includes(item?.[userKey]?.id),
});


export const getAllChatsAsync = async (userId, page = 1, limit = 10, search = '') => {
    const offset = (page - 1) * limit;
    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id));
    search = search.trim();

    const results = await sequelize.query(getAllChatsWithLatestMessagesQuery, {
        replacements: { userId, limit, offset, search },
        type: sequelize.QueryTypes.SELECT,
        nest: true
    });

    return results.map(mapOnline(onlineUserIds, 'otherUser'));
};

export const getFriendChatsAsync = async (userId, page = 1, limit = 10, search = '') => {
    const offset = (page - 1) * limit;
    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id));
    search = search.trim();

    const results = await sequelize.query(getFriendChatsWithLatestMessagesQuery, {
        replacements: { userId, limit, offset, search },
        type: sequelize.QueryTypes.SELECT,
        nest: true
    });
    return results.map(mapOnline(onlineUserIds, 'friend'));
};

export const getChatAsync = async (userId, otherUserId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const chat = await Message.findAll({
        attributes: ['id', 'senderId', 'receiverId', 'content', 'type', 'revoked', 'seen', 'createdAt', 'updatedAt'],
        where: {
            [Op.or]: [
                {
                    senderId: userId,
                    receiverId: otherUserId,
                },
                {
                    senderId: otherUserId,
                    receiverId: userId,
                },
            ],
        },
        include: [
            {
                model: File,
                as: 'file',
                attributes: ['id', 'url', 'name', 'size', 'mimeType']
            }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
    });

    return chat;
};
