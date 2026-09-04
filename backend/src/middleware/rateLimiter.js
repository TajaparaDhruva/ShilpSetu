const rateLimit = require('express-rate-limit');
const { env } = require('../config/env');
const { sendError } = require('../utils/responseHandler');

/**
 * General API rate limiter.
 */
const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 'Too many requests. Please try again later.', 429);
  },
});

/**
 * Stricter rate limiter for authentication endpoints.
 */
const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 'Too many authentication attempts. Please try again later.', 429);
  },
});

/**
 * Rate limiter for upload endpoints.
 */
const uploadLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.UPLOAD_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 'Too many uploads. Please try again later.', 429);
  },
});

module.exports = { generalLimiter, authLimiter, uploadLimiter };
