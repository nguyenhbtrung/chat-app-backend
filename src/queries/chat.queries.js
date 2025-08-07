export const getAllChatsWithLatestMessagesQuery = `
        WITH latest_messages AS (
            SELECT m.*
            FROM Messages m
            JOIN (
                SELECT 
                    CASE 
                        WHEN senderId < receiverId THEN senderId 
                        ELSE receiverId 
                    END AS user1,
                    CASE 
                        WHEN senderId < receiverId THEN receiverId 
                        ELSE senderId 
                    END AS user2,
                    MAX(createdAt) AS latestMessageTime
                FROM Messages
                WHERE :userId IN (senderId, receiverId)
                GROUP BY user1, user2
            ) grouped
            ON 
                CASE 
                    WHEN m.senderId < m.receiverId THEN m.senderId 
                    ELSE m.receiverId 
                END = grouped.user1
            AND 
                CASE 
                    WHEN m.senderId < m.receiverId THEN m.receiverId 
                    ELSE m.senderId 
                END = grouped.user2
            AND m.createdAt = grouped.latestMessageTime
        )
        SELECT 
            lm.*,
            u.id AS "otherUser.id",
            u.displayName AS "otherUser.displayName",
            u.userName AS "otherUser.userName",
            f.url AS "otherUser.avatarUrl"
        FROM latest_messages lm
        JOIN Users u 
          ON u.id = CASE 
                      WHEN lm.senderId = :userId THEN lm.receiverId
                      ELSE lm.senderId
                   END
        LEFT JOIN Files f ON u.avatarImgId = f.id
        ORDER BY lm.createdAt DESC
        LIMIT :limit OFFSET :offset
    `;