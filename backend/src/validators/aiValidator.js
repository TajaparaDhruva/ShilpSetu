const { z } = require('zod');

const generateDescriptionSchema = z.object({
  language: z.string().default('en'),
  category: z.string().min(1, 'Category is required'),
  keywords: z.array(z.string()).min(1, 'At least one keyword is required'),
});

const priceSuggestionSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  materials: z.array(z.string()).optional(),
});

const imageEnhanceSchema = z.object({
  imageUrl: z.string().url('Valid image URL is required'),
});

module.exports = { generateDescriptionSchema, priceSuggestionSchema, imageEnhanceSchema };
