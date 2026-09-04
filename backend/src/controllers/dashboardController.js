const dashboardService = require('../services/dashboardService');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * Dashboard Controller – seller dashboard and analytics.
 */
const dashboardController = {
  /**
   * GET /api/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      const data = await dashboardService.getSellerDashboard(req.user.id);
      return sendSuccess(res, 'Dashboard data fetched successfully', data);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/dashboard/analytics
   */
  async getAnalytics(req, res, next) {
    try {
      const data = await dashboardService.getAnalytics(req.user.id);
      return sendSuccess(res, 'Analytics data fetched successfully', data);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = dashboardController;
