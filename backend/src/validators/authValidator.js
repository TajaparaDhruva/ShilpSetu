const { z } = require('zod');

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(128),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15).optional(),
  language: z.enum(['en', 'hi', 'gu', 'mr', 'ta', 'te', 'bn', 'kn', 'ml', 'pa']).default('en'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const updateProfileSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  phone: z.string().min(10).max(15).optional(),
  language: z.enum(['en', 'hi', 'gu', 'mr', 'ta', 'te', 'bn', 'kn', 'ml', 'pa']).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(200).optional(),
}).strict(); // Disallow extra fields (prevents role / is_verified injection)

module.exports = { registerSchema, loginSchema, updateProfileSchema };
