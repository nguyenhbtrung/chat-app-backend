import { addFriendAsync, deleteFriendshipAsync, getFriendshipsAsync, updateFriendshipAsync } from "../services/friendship.service.js";
import { parseBool } from "../utils/parse.js";

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

export const getFriendships = async (req, res, next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const status = req.query.status;
    let sent = req.query.sent;
    let received = req.query.received;

    const all = sent === undefined && received === undefined;
    sent = all ? true : parseBool(sent);
    received = all ? true : parseBool(received);


    const result = await getFriendshipsAsync(userId, status, sent, received, page, limit, search);
    res.status(200).json({ data: result });
}; 