import { addFriendAsync } from "../services/friendship.service.js";

export const addFriend = async (req, res, next) => {
    const fromUserId = req.user.id;
    const { toUserId } = req.body;
    const result = await addFriendAsync(fromUserId, toUserId);
    res.status(200).json({ data: result });
};