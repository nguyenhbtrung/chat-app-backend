import { AppError } from "../appError.js";

export class FileNotFoundError extends AppError {
    constructor(message = "File not found.") {
        super(message, 'FILE_NOT_FOUND', 404);
    }
}