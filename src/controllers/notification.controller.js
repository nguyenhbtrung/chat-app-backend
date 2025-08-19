import { getNotificationsAsync } from "../services/notification.service.js";

export const getNotifications = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getNotificationsAsync(userId, page, limit);
    res.status(200).json({ data });
};