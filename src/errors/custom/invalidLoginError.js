import { AppError } from "../appError.js";

export class InvalidLoginError extends AppError {
    constructor(message = "Incorrect username or password") {
        super(
            message,
            'INVALID_LOGIN_INFO',
            400
        );
    }
}