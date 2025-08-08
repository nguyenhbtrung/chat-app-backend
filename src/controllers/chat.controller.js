import { getAllChatsAsync, getFriendChatsAsync } from "../services/chat.service.js";

export const getAllChats = async (req, res, next) => {
    const userId = req.user.id || 0;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getAllChatsAsync(userId, page, limit);
    res.status(200).json({ data });
};

export const getFriendChats = async (req, res, next) => {
    const userId = req.user.id || 0;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getFriendChatsAsync(userId, page, limit);
    res.status(200).json({ data });
};

