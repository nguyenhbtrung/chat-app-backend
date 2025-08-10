import db from '../models/index.js';
import { AlreadyFriendsError, BlockedUserError, CannotFriendYourselfError, FriendRequestAlreadySentError, FriendRequestPendingError, FriendshipDeleteBlockedError } from '../errors/index.js';
import { Op, where } from 'sequelize';
import { FriendshipNotFoundError } from '../errors/index.js';
import { InvalidFriendshipStatusError } from '../errors/custom/updateFriendshipError.js';

const { Friendship } = db;

export const addFriendAsync = async (fromUserId, toUserId) => {
    if (fromUserId === toUserId)
        throw new CannotFriendYourselfError();
    try {
        const friendship = await Friendship.findOne({
            where: {
                [Op.or]: [
                    {
                        requesterId: fromUserId,
                        addresseeId: toUserId,
                    },
                    {
                        requesterId: toUserId,
                        addresseeId: fromUserId,
                    },
                ],
            },
        });

        if (!friendship) {
            return await Friendship.create({
                requesterId: fromUserId,
                addresseeId: toUserId,
                status: 'pending',
            });
        }

        switch (friendship.status) {
            case 'pending':
                if (friendship.requesterId === fromUserId)
                    throw new FriendRequestAlreadySentError();
                else
                    throw new FriendRequestPendingError();

            case 'accepted':
                throw new AlreadyFriendsError();

            case 'blocked':
                throw new BlockedUserError();

            case 'rejected':
            case 'cancelled':
                return await friendship.update({
                    requesterId: fromUserId,
                    addresseeId: toUserId,
                    status: 'pending',
                });
        }
    } catch (error) {
        throw error;
    }
};

export const deleteFriendshipAsync = async (userId, friendId) => {
    try {
        const friendship = await Friendship.findOne({
            where: {
                [Op.or]: [
                    {
                        requesterId: userId,
                        addresseeId: friendId,
                    },
                    {
                        requesterId: friendId,
                        addresseeId: userId,
                    },
                ],
            },
        });

        if (!friendship)
            throw new FriendshipNotFoundError();

        if (friendship.status === 'blocked')
            throw new FriendshipDeleteBlockedError();

        return await friendship.destroy();

    } catch (error) {
        throw error;
    }
};

export const updateFriendshipAsync = async (userId, friendId, status) => {
    try {
        const friendship = await Friendship.findOne({
            where: {
                [Op.or]: [
                    {
                        requesterId: userId,
                        addresseeId: friendId,
                    },
                    {
                        requesterId: friendId,
                        addresseeId: userId,
                    },
                ],
            },
        });

        if (!friendship)
            throw new FriendshipNotFoundError();

        let isStatusValid = true;

        switch (friendship.status) {
            case 'pending':
                if ((status === 'accepted' || status === 'rejected') && userId !== friendship.addresseeId)
                    isStatusValid = false;
                else if (status === 'cancelled' && userId !== friendship.requesterId)
                    isStatusValid = false;
                break;

            case 'accepted':
                if (status === 'pending' || status === 'rejected' || status === 'cancelled')
                    isStatusValid = false;
                break;

            case 'rejected':
                if (status === 'accepted' || status === 'cancelled')
                    isStatusValid = false;
                break;

            case 'cancelled':
                if (status === 'accepted' || status === 'rejected')
                    isStatusValid = false;
                break;

            case 'blocked':
                if (status !== 'blocked')
                    isStatusValid = false;
                break;

            default:
                break;
        }

        if (!isStatusValid)
            throw new InvalidFriendshipStatusError();

        return await friendship.update({ status });

    } catch (error) {
        throw error;
    }
};