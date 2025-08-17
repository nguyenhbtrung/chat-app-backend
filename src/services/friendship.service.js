import db from '../models/index.js';
import { AlreadyFriendsError, BlockedUserError, CannotFriendYourselfError, FriendRequestAlreadySentError, FriendRequestPendingError, FriendshipDeleteBlockedError } from '../errors/index.js';
import { col, fn, literal, Op, where } from 'sequelize';
import { FriendshipNotFoundError } from '../errors/index.js';
import { InvalidFriendshipStatusError } from '../errors/custom/updateFriendshipError.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { FRIENDSHIP_STATUS } = require('../constants.cjs');

const { Friendship, User, File } = db;

export const addFriendAsync = async (fromUserId, toUserId) => {
    if (fromUserId === toUserId)
        throw new CannotFriendYourselfError();

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
};

export const deleteFriendshipAsync = async (userId, friendId) => {
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
};

export const updateFriendshipAsync = async (userId, friendId, status) => {
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
};

export const getFriendshipsAsync = async (userId, status, sent, received, page = 1, limit = 10, search = '') => {

    if (status && !FRIENDSHIP_STATUS.includes(status))
        throw new InvalidFriendshipStatusError();

    if (!sent && !received)
        return [];

    const orConditions = [];
    const include = [];

    if (sent) {

        orConditions.push({
            [Op.and]: [
                { requesterId: userId },
                where(
                    fn('COALESCE',
                        col('addressee.displayName'),
                        col('addressee.userName')
                    ),
                    { [Op.substring]: search.trim() }
                )
            ]
        });


        include.push({
            model: User,
            as: 'addressee',
            attributes: [
                'id', 'userName', 'displayName',
                [literal('`addressee->avatar`.`url`'), 'avatarUrl']
            ],
            include: { model: File, as: 'avatar', attributes: [] },
        });
    }

    if (received) {
        orConditions.push({
            [Op.and]: [
                { addresseeId: userId },
                where(
                    fn('COALESCE',
                        col('requester.displayName'),
                        col('requester.userName')
                    ),
                    { [Op.substring]: search.trim() }
                )
            ]
        });

        include.push({
            model: User,
            as: 'requester',
            attributes: [
                'id', 'userName', 'displayName',
                [literal('`requester->avatar`.`url`'), 'avatarUrl']
            ],
            include: { model: File, as: 'avatar', attributes: [] },
        });
    }

    const conditions = { [Op.or]: orConditions };


    if (status) {
        conditions.status = status;
    }

    const offset = (page - 1) * limit;

    const friendships = await Friendship.findAll({
        where: conditions,
        limit,
        offset,
        include,
        order: [['updatedAt', 'DESC']]
    });

    return friendships.map(f => {
        const otherUser = f.requesterId === userId ? f.addressee : f.requester;
        return {
            userId: otherUser.id,
            userName: otherUser.userName,
            displayName: otherUser.displayName,
            avatarUrl: otherUser.get('avatarUrl'),
            status: f.status,
            updatedAt: f.updatedAt,
        };
    });
};