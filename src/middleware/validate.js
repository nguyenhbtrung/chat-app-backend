import z from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields = {};
            console.log('---message', error.message);
            error.issues.forEach(e => {
                fields[e.path[0]] = e.message;
            });

            const err = new Error('Invalid input data');
            err.code = 'VALIDATION_ERROR';
            err.statusCode = 400;
            err.fields = fields;

            return next(err);
        }

        next(error);
    }
};
