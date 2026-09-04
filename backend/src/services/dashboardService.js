const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Dashboard Service – aggregated analytics for seller dashboards.
 */
const dashboardService = {
  /**
   * Get seller dashboard statistics.
   */
  async getSellerDashboard(sellerId) {
    try {
      // Fetch all product counts by status in a single query
      const { data: products, error: productsError } = await supabaseAdmin
        .from('products')
        .select('id, status, price')
        .eq('seller_id', sellerId);

      if (productsError) {
        logger.error(`Dashboard product fetch failed: ${productsError.message}`);
        throw productsError;
      }

      const totalProducts = products.length;
      const publishedProducts = products.filter(p => p.status === 'published').length;
      const draftProducts = products.filter(p => p.status === 'draft').length;
      const archivedProducts = products.filter(p => p.status === 'archived').length;
      const pendingReviewProducts = products.filter(p => p.status === 'pending_review').length;
      const rejectedProducts = products.filter(p => p.status === 'rejected').length;

      // Estimated revenue = sum of prices of published products
      const estimatedRevenue = products
        .filter(p => p.status === 'published' && p.price)
        .reduce((sum, p) => sum + Number(p.price), 0);

      // Recent products (last 5)
      const { data: recentProducts, error: recentError } = await supabaseAdmin
        .from('products')
        .select('id, title, status, price, images, created_at')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) {
        logger.error(`Recent products fetch failed: ${recentError.message}`);
      }

      // Get total views for seller's products
      const productIds = products.map(p => p.id);
      let totalViews = 0;

      if (productIds.length > 0) {
        const { count, error: viewsError } = await supabaseAdmin
          .from('product_views')
          .select('*', { count: 'exact', head: true })
          .in('product_id', productIds);

        if (!viewsError) {
          totalViews = count || 0;
        }
      }

      return {
        totalProducts,
        publishedProducts,
        draftProducts,
        archivedProducts,
        pendingReviewProducts,
        rejectedProducts,
        estimatedRevenue,
        totalViews,
        recentProducts: recentProducts || [],
      };
    } catch (err) {
      logger.error(`Dashboard data fetch failed: ${err.message}`);
      throw err;
    }
  },

  /**
   * Get detailed analytics for a seller.
   */
  async getAnalytics(sellerId) {
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('id, title, status, price')
      .eq('seller_id', sellerId);

    if (productsError) throw productsError;

    const productIds = products.map(p => p.id);
    let totalViews = 0;
    let productViews = [];
    let mostViewedProduct = null;

    if (productIds.length > 0) {
      // Total views
      const { count } = await supabaseAdmin
        .from('product_views')
        .select('*', { count: 'exact', head: true })
        .in('product_id', productIds);
      totalViews = count || 0;

      // Views per product (top 10)
      const { data: viewData } = await supabaseAdmin
        .rpc('get_product_view_counts', { seller_user_id: sellerId });

      if (viewData && viewData.length > 0) {
        productViews = viewData;
        mostViewedProduct = viewData[0];
      }
    }

    const publishedProducts = products.filter(p => p.status === 'published').length;
    const estimatedRevenue = products
      .filter(p => p.status === 'published' && p.price)
      .reduce((sum, p) => sum + Number(p.price), 0);

    return {
      totalViews,
      productViews,
      mostViewedProduct,
      publishedProducts,
      estimatedRevenue,
    };
  },
};

module.exports = dashboardService;
