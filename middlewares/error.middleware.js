import AppError from '../utils/AppError.js';
import logger from '../utils/logger.js';

export function notFound(req,res,next){
  res.status(404).json({message:"Route Not Found"})
}

// Global error-handling middleware
 export const errorHandler = (err, req, res, next) => {
  // 1️⃣ Log the error (use centralized logging)
  logger.error(err);

  // 2️⃣ Set default values
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message || 'Something went wrong!';

  // 3️⃣ Handle known operational errors (like invalid input, validation)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      status: 'fail',
      message: 'Invalid data format',
      details: err.errors,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  if (err.code && err.code === 11000) {
    // MongoDB duplicate key error
    return res.status(409).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }

  // 4️⃣ Handle JWT errors gracefully
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token, please log in again.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Your token has expired. Please log in again.',
    });
  }

  // 5️⃣ Send clean error response for operational errors
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      status,
      message,
    });
  }

  // 6️⃣ Handle unexpected or programming errors (don’t leak details)
  console.error('💥 UNEXPECTED ERROR 💥', err);
  res.status(500).json({
    success: false,
    status: 'error',
    message: 'Internal Server Error',
  });
};

