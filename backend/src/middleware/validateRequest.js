const { ZodError } = require('zod');
const { sendError } = require('../utils/responseHandler');

/**
 * Creates a middleware that validates the request body against a Zod schema.
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @returns {import('express').RequestHandler}
 */
function validateRequest(schema) {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; // replace with parsed & coerced values
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(err); // handled by errorHandler
      }
      next(err);
    }
  };
}

/**
 * Validates query parameters against a Zod schema.
 */
function validateQuery(schema) {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(err);
      }
      next(err);
    }
  };
}

module.exports = { validateRequest, validateQuery };
