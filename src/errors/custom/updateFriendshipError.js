import { AppError } from "../appError.js";

export class InvalidFriendshipStatusError extends AppError {
    constructor(message = "Invalid friendship status.") {
        super(message, 'INVALID_FRIENDSHIP_STATUS', 400);
    }
}