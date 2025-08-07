import { getAllChatsAsync } from "../services/chat.service.js";

export const getAllChats = async (req, res, next) => {
    const userId = req.user.id || 0;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getAllChatsAsync(userId, page, limit);
    console.log(">>>Check data", data);
    res.status(200).json({ data });
};