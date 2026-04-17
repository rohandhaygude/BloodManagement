export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // ✅ MongoDB duplicate key error
    if (err.code === 11000) {
        err = new ErrorHandler("Duplicate field value entered", 400);
    }

    // ✅ JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("Invalid JWT token", 400);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("JWT token has expired", 400);
    }

    // ✅ Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        err = new ErrorHandler("Invalid ID format", 400);
    }

    // ✅ Mongoose validation errors
    const errorMessage = err.errors
        ? Object.values(err.errors).map(val => val.message).join(", ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default errorMiddleware;
