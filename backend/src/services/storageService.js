const { supabaseAdmin } = require('../config/supabase');
const { env } = require('../config/env');
const logger = require('../utils/logger');
const path = require('path');

/**
 * Storage Service – handles file uploads and deletions in Supabase Storage.
 */
const storageService = {
  /**
   * Upload a file to a Supabase Storage bucket.
   *
   * @param {string} bucket - Bucket name (e.g., 'product-images', 'profile-images')
   * @param {Buffer} fileBuffer - File data buffer from Multer
   * @param {string} originalName - Original filename
   * @param {string} mimeType - MIME type of the file
   * @param {string} userId - Authenticated user's ID (used in path)
   * @returns {{ url: string, path: string }}
   */
  async upload(bucket, fileBuffer, originalName, mimeType, userId) {
    const ext = path.extname(originalName).toLowerCase();
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = `${userId}/${uniqueName}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      logger.error(`File upload failed to ${bucket}/${filePath}: ${error.message}`);
      throw error;
    }

    // Generate public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath,
    };
  },

  /**
   * Upload multiple files to a bucket.
   */
  async uploadMultiple(bucket, files, userId) {
    const results = [];

    for (const file of files) {
      const result = await this.upload(
        bucket,
        file.buffer,
        file.originalname,
        file.mimetype,
        userId
      );
      results.push(result);
    }

    return results;
  },

  /**
   * Delete a file from a Supabase Storage bucket.
   *
   * @param {string} bucket - Bucket name
   * @param {string} filePath - File path within the bucket
   */
  async delete(bucket, filePath) {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      logger.error(`File deletion failed from ${bucket}/${filePath}: ${error.message}`);
      throw error;
    }

    return true;
  },

  /**
   * Verify that a file path belongs to a specific user.
   */
  isOwnedByUser(filePath, userId) {
    return filePath.startsWith(`${userId}/`);
  },
};

module.exports = storageService;
