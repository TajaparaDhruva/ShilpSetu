const { z } = require('zod');

const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters').max(100),
  icon: z.string().max(200).optional(),
  is_active: z.boolean().default(true),
});

const updateCategorySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  icon: z.string().max(200).optional(),
  is_active: z.boolean().optional(),
});

module.exports = { createCategorySchema, updateCategorySchema };
