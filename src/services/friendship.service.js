import db from '../models/index.js';
import { AlreadyFriendsError, BlockedUserError, CannotFriendYourselfError, FriendRequestAlreadySentError, FriendRequestPendingError } from "../errors/custom/addFriendError.js";
import { Op, where } from 'sequelize';

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
        console.error('Error in addFriendAsync:', error);
        throw error;
    }
};