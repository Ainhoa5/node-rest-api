// middleware/errorHandling.js
const handle404 = (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
};

const handleErrors = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
};

module.exports = { handle404, handleErrors };
