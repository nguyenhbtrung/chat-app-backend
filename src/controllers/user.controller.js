import { getAllNonFriendUsersAsync, getNonFriendOnlineUsersAsync, getUserByIdAsync } from "../services/user.service.js";

export const getAllNonFriendUsers = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const data = await getAllNonFriendUsersAsync(userId, page, limit, search);
    res.status(200).json({ data });
};

export const getNonFriendOnlineUsers = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getNonFriendOnlineUsersAsync(userId, page, limit);
    res.status(200).json({ data });
};

export const getMe = async (req, res, next) => {
    const userId = req.user.id;
    const data = await getUserByIdAsync(userId);
    res.status(200).json({ data });
};
