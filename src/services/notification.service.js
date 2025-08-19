import db from '../models/index.js';

const { Notification } = db;

export const getNotificationsAsync = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Notification.findAll({
        where: {
            userId,
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });
};