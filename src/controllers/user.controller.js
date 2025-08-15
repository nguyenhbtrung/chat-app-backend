import { getNonFriendOnlineUsersAsync } from "../services/user.service.js";

export const getNonFriendOnlineUsers = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getNonFriendOnlineUsersAsync(userId, page, limit);
    res.status(200).json({ data });
};
