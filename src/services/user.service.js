import { col, fn, Op, where } from 'sequelize';
import db from '../models/index.js';
import { userSocketMap } from '../socket/index.js';

const { Friendship, User, File } = db;

export const getAllNonFriendUsersAsync = async (userId, page = 1, limit = 10, search = '') => {
    try {
        const nonFriendUsers = await User.findAll({
            subQuery: false,
            attributes: [
                'id',
                'userName',
                'displayName',
                [col('avatar.url'), 'avatarUrl']
            ],
            include: [{
                model: File,
                as: 'avatar',
                attributes: [],
            }, {
                model: Friendship,
                required: false,
                as: 'friendshipRelation',
                attributes: [],
                on: {
                    [Op.and]: [
                        { status: { [Op.in]: ['accepted', 'pending', 'blocked'] } },
                        {
                            [Op.or]: [
                                { requesterId: userId, addresseeId: { [Op.col]: 'User.id' } },
                                { addresseeId: userId, requesterId: { [Op.col]: 'User.id' } }
                            ]
                        }
                    ]
                }
            }],
            where: {
                [Op.and]: [
                    { id: { [Op.ne]: userId } },
                    { '$friendshipRelation.requesterId$': { [Op.is]: null } },
                    { '$friendshipRelation.addresseeId$': { [Op.is]: null } },
                    where(
                        fn('COALESCE',
                            col('User.displayName'),
                            col('User.userName')
                        ),
                        { [Op.substring]: search.trim() }
                    )
                ],
            },

            limit,
            offset: (page - 1) * limit,
            raw: true
        });

        return nonFriendUsers;
    } catch (error) {
        throw error;
    }
};

export const getNonFriendOnlineUsersAsync = async (userId, page = 1, limit = 10) => {
    const onlineUserIds = Object.keys(userSocketMap)
        .map(id => parseInt(id));
    try {

        const nonFriendOnlineUsers = await User.findAll({
            subQuery: false,
            attributes: [
                'id',
                'userName',
                'displayName',
                [col('avatar.url'), 'avatarUrl']
            ],
            include: [{
                model: File,
                as: 'avatar',
                attributes: [],
            }, {
                model: Friendship,
                required: false,
                as: 'friendshipRelation',
                attributes: [],
                on: {
                    [Op.and]: [
                        { status: { [Op.in]: ['accepted', 'pending', 'blocked'] } },
                        {
                            [Op.or]: [
                                { requesterId: userId, addresseeId: { [Op.col]: 'User.id' } },
                                { addresseeId: userId, requesterId: { [Op.col]: 'User.id' } }
                            ]
                        }
                    ]
                }
            }],
            where: {
                id: {
                    [Op.in]: onlineUserIds,
                    [Op.ne]: userId
                },
                '$friendshipRelation.requesterId$': { [Op.is]: null },
                '$friendshipRelation.addresseeId$': { [Op.is]: null }
            },
            limit,
            offset: (page - 1) * limit,
            raw: true
        });

        return nonFriendOnlineUsers;

    } catch (error) {
        throw error;
    }

};