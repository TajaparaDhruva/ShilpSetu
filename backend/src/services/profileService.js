const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Profile Service – CRUD operations on the profiles table.
 */
const profileService = {
  /**
   * Get a profile by user ID.
   */
  async getById(userId) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      logger.error(`Profile fetch failed for ${userId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Update a profile (only allowed fields).
   * Role and is_verified CANNOT be set through this method.
   */
  async update(userId, updates) {
    // Strip any forbidden fields
    const { role, is_verified, id, created_at, email, ...safeUpdates } = updates;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        ...safeUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      logger.error(`Profile update failed for ${userId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Update profile image URL.
   */
  async updateProfileImage(userId, imageUrl) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        profile_image: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      logger.error(`Profile image update failed for ${userId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Get a public artisan profile (limited fields).
   */
  async getPublicProfile(userId) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, bio, location, profile_image')
      .eq('id', userId)
      .single();

    if (error) {
      logger.error(`Public profile fetch failed for ${userId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Admin: update verification status.
   */
  async updateVerification(userId, status) {
    const is_verified = status === 'approved';
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({
        is_verified,
        verification_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      logger.error(`Verification update failed for ${userId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Admin: get all profiles with pending verification.
   */
  async getPendingVerifications(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Pending verifications fetch failed: ${error.message}`);
      throw error;
    }

    return { data, count };
  },
};

module.exports = profileService;
