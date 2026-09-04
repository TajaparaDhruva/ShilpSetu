const { z } = require('zod');

const VALID_STATUSES = ['draft', 'published', 'archived', 'pending_review', 'rejected'];

const createProductSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  description: z.string().max(5000).optional(),
  category: z.string().max(100).optional(),
  images: z.array(z.string().url()).default([]),
  price: z.number().positive('Price must be a positive number').optional(),
  status: z.enum(['draft', 'pending_review']).default('draft'),
  aiGenerated: z.boolean().default(false),
});

const updateProductSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(5000).optional(),
  category: z.string().max(100).optional(),
  images: z.array(z.string().url()).optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  status: z.enum(VALID_STATUSES).optional(),
  aiGenerated: z.boolean().optional(),
});

module.exports = { createProductSchema, updateProductSchema, VALID_STATUSES };
