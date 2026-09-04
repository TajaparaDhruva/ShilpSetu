const ApiError = require('../utils/apiError');

/**
 * Creates a middleware that restricts access to users with one of the allowed roles.
 *
 * @param {string[]} allowedRoles - Array of roles that can access the route
 * @returns {import('express').RequestHandler}
 */
function requireRole(allowedRoles) {
  return (req, _res, next) => {
    if (!req.profile) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.profile.role)) {
      return next(
        ApiError.forbidden(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`
        )
      );
    }

    next();
  };
}

/** Convenience middleware: only sellers */
const requireSeller = requireRole(['seller', 'admin']);

/** Convenience middleware: only buyers */
const requireBuyer = requireRole(['buyer', 'admin']);

/** Convenience middleware: only admins */
const requireAdmin = requireRole(['admin']);

module.exports = { requireRole, requireSeller, requireBuyer, requireAdmin };
