const { z } = require('zod');

const createInquirySchema = z.object({
  product_id: z.string().uuid('Valid product ID is required'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000),
});

const respondInquirySchema = z.object({
  response: z.string().min(1, 'Response is required').max(2000),
});

module.exports = { createInquirySchema, respondInquirySchema };
