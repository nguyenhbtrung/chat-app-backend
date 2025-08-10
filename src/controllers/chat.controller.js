import { getAllChatsAsync, getChatAsync, getFriendChatsAsync } from "../services/chat.service.js";

export const getAllChats = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const data = await getAllChatsAsync(userId, page, limit, search);
    res.status(200).json({ data });
};

export const getFriendChats = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const data = await getFriendChatsAsync(userId, page, limit, search);
    res.status(200).json({ data });
};

export const getChat = async (req, res, next) => {
    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getChatAsync(userId, otherUserId, page, limit);
    res.status(200).json({ data });
};

