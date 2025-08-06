import { sequelize } from '../models/index.js';
import { userSocketMap } from '../socket/index.js';

export const getAllChats = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id))
        .filter(id => id !== userId); // loại chính userId ra

    if (onlineUserIds.length === 0) return []; // không có ai online

    const results = await sequelize.query(`
        WITH latest_messages AS (
            SELECT m.*
            FROM "Messages" m
            JOIN (
                SELECT 
                    LEAST("senderId", "receiverId") AS user1,
                    GREATEST("senderId", "receiverId") AS user2,
                    MAX("createdAt") AS latestMessageTime
                FROM "Messages"
                WHERE :userId IN ("senderId", "receiverId")
                GROUP BY user1, user2
            ) grouped
            ON LEAST(m."senderId", m."receiverId") = grouped.user1
            AND GREATEST(m."senderId", m."receiverId") = grouped.user2
            AND m."createdAt" = grouped.latestMessageTime
        )

        SELECT 
            lm.*,
            u.id as "otherUser.id",
            u."displayName" as "otherUser.displayName",
            u."userName" as "otherUser.userName",
            f."url" as "otherUser.avatarUrl"
        FROM latest_messages lm
        JOIN "Users" u 
          ON u.id = CASE 
                      WHEN lm."senderId" = :userId THEN lm."receiverId"
                      ELSE lm."senderId"
                   END
        LEFT JOIN "Files" f ON u."avatarImgId" = f.id
        ORDER BY lm."createdAt" DESC
        LIMIT :limit OFFSET :offset
    `, {
        replacements: { userId, onlineUserIds, limit, offset },
        type: sequelize.QueryTypes.SELECT
    });

    return results;
};

export const getOnlineUser = async (userId, page = 1, limit = 10) => {

};
