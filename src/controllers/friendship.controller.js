import { addFriendAsync, deleteFriendshipAsync, updateFriendshipAsync } from "../services/friendship.service.js";

export const addFriend = async (req, res, next) => {
    const fromUserId = req.user.id;
    const { toUserId } = req.body;
    const result = await addFriendAsync(fromUserId, toUserId);
    res.status(200).json({ data: result });
};

export const deleteFriendship = async (req, res, next) => {
    const userId = req.user.id;
    const friendId = req.params.friendId;
    await deleteFriendshipAsync(userId, friendId);
    res.sendStatus(204);
};

export const updateFriendship = async (req, res, next) => {
    const userId = req.user.id;
    const friendId = req.params.friendId;
    const { status } = req.body;
    const result = await updateFriendshipAsync(userId, friendId, status);
    res.status(200).json({ data: result });
}; 