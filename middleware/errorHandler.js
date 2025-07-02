export function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
}
