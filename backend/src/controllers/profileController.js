const profileService = require('../services/profileService');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * Profile Controller – user profile management.
 */
const profileController = {
  /**
   * GET /api/profile
   */
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getById(req.user.id);
      return sendSuccess(res, 'Profile retrieved successfully', profile);
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /api/profile
   */
  async updateProfile(req, res, next) {
    try {
      const profile = await profileService.update(req.user.id, req.body);
      return sendSuccess(res, 'Profile updated successfully', profile);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = profileController;
