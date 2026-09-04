const ApiError = require('../utils/apiError');
const { sendError } = require('../utils/responseHandler');
const logger = require('../utils/logger');
const { env } = require('../config/env');

/**
 * Global error handler middleware.
 * Catches all errors thrown by routes / middleware and returns a standardized response.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  // Known ApiError
  if (err instanceof ApiError) {
    return sendError(res, err.message, err.statusCode, err.errors);
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, `File too large. Maximum size is ${env.MAX_FILE_SIZE_MB}MB`, 400);
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return sendError(res, `Too many files. Maximum is ${env.MAX_FILES_PER_UPLOAD}`, 400);
    }
    return sendError(res, err.message, 400);
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return sendError(res, 'Validation failed', 400, errors);
  }

  // Unexpected errors
  logger.error('Unhandled error:', err);

  const message = env.isProduction ? 'Internal server error' : err.message;
  const stack = env.isProduction ? undefined : err.stack;

  return res.status(500).json({
    success: false,
    message,
    errors: [],
    ...(stack && { stack }),
  });
}

module.exports = errorHandler;
