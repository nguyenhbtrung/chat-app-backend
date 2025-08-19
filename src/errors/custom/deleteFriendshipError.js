import { AppError } from "../appError.js";

export class FriendshipNotFoundError extends AppError {
    constructor(message = "You are not friends with this user.") {
        super(message, 'FRIENDSHIP_NOT_FOUND', 404);
    }
}

export class FriendshipDeleteBlockedError extends AppError {
    constructor(message = "Cannot delete a friendship when status is 'blocked'.") {
        super(message, 'FRIENDSHIP_DELETE_BLOCKED', 403);
    }
}