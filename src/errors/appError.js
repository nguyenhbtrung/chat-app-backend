export class AppError extends Error {
    constructor(message, code, statusCode, fields) {
        super(message);

        this.name = this.constructor.name;
        this.code = code || 'INTERNAL_ERROR';
        this.statusCode = statusCode || 500;
        this.fields = fields;

        Error.captureStackTrace(this, this.constructor);
    }
}
