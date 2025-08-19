import { AppError } from "../appError.js";

export class InvalidCredentialsError extends AppError {
    constructor(message = "Incorrect username or password") {
        super(
            message,
            'INVALID_CREDENTIALS',
            400
        );
    }
}