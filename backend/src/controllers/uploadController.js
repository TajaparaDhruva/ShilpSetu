const storageService = require('../services/storageService');
const profileService = require('../services/profileService');
const { sendSuccess, sendCreated } = require('../utils/responseHandler');
const ApiError = require('../utils/apiError');

/**
 * Upload Controller – handles image uploads to Supabase Storage.
 */
const uploadController = {
  /**
   * POST /api/upload/image
   * Upload a single product image.
   */
  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        throw ApiError.badRequest('No image file provided');
      }

      const result = await storageService.upload(
        'product-images',
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        req.user.id
      );

      return sendCreated(res, 'Image uploaded successfully', result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/upload/multiple
   * Upload multiple product images.
   */
  async uploadMultiple(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        throw ApiError.badRequest('No image files provided');
      }

      const results = await storageService.uploadMultiple(
        'product-images',
        req.files,
        req.user.id
      );

      return sendCreated(res, 'Images uploaded successfully', { images: results });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/upload/profile-image
   * Upload and update user's profile image.
   */
  async uploadProfileImage(req, res, next) {
    try {
      if (!req.file) {
        throw ApiError.badRequest('No image file provided');
      }

      const result = await storageService.upload(
        'profile-images',
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        req.user.id
      );

      // Update profile with new image URL
      await profileService.updateProfileImage(req.user.id, result.url);

      return sendCreated(res, 'Profile image uploaded successfully', result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/upload/:bucket/*
   * Delete an image from storage.
   */
  async deleteImage(req, res, next) {
    try {
      const bucket = req.params.bucket;
      const filePath = req.params[0]; // Wildcard capture

      if (!bucket || !filePath) {
        throw ApiError.badRequest('Bucket and file path are required');
      }

      // Only allow valid buckets
      if (!['product-images', 'profile-images'].includes(bucket)) {
        throw ApiError.badRequest('Invalid storage bucket');
      }

      // Verify ownership
      if (!storageService.isOwnedByUser(filePath, req.user.id) && req.profile.role !== 'admin') {
        throw ApiError.forbidden('You can only delete your own files');
      }

      await storageService.delete(bucket, filePath);
      return sendSuccess(res, 'Image deleted successfully');
    } catch (err) {
      next(err);
    }
  },
};

module.exports = uploadController;
