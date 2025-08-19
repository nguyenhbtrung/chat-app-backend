import { AppError } from "../appError.js";

export class FriendRequestAlreadySentError extends AppError {
    constructor(message = "You have already sent a friend request to this user.") {
        super(message, 'FRIEND_REQUEST_ALREADY_SENT', 400);
    }
}

export class FriendRequestPendingError extends AppError {
    constructor(message = "This user has already sent you a friend request. Please respond to it.") {
        super(message, 'FRIEND_REQUEST_PENDING', 400);
    }
}

export class AlreadyFriendsError extends AppError {
    constructor(message = "You are already friends with this user.") {
        super(message, 'ALREADY_FRIENDS', 400);
    }
}

export class BlockedUserError extends AppError {
    constructor(message = "You cannot send a friend request to this user.") {
        super(message, 'BLOCKED_USER', 403);
    }
}

export class CannotFriendYourselfError extends AppError {
    constructor(message = "You cannot send a friend request to yourself.") {
        super(message, 'CANNOT_FRIEND_YOURSELF', 400);
    }
}
