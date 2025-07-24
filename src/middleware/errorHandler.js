export default (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const response = {
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: err.message || 'Something went wrong'
        }
    };

    if (err.fields) {
        response.error.fields = err.fields;
    }

    res.status(statusCode).json(response);
};
