const { sendError } = require('../utils/responseHandler');

/**
 * 404 handler for unmatched routes.
 */
function notFoundHandler(req, res) {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

module.exports = notFoundHandler;
