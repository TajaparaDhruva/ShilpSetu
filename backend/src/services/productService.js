const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Product Service – CRUD, search, filtering, and status workflows for products.
 */
const productService = {
  /**
   * Create a new product.
   */
  async create(sellerId, productData) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert({
        seller_id: sellerId,
        title: productData.title,
        description: productData.description || null,
        category: productData.category || null,
        images: productData.images || [],
        price: productData.price || null,
        status: productData.status || 'draft',
        ai_generated: productData.aiGenerated || false,
      })
      .select()
      .single();

    if (error) {
      logger.error(`Product creation failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Get products belonging to a seller with pagination.
   */
  async getBySeller(sellerId, { page = 1, limit = 20, status, sort = 'created_at', order = 'desc' } = {}) {
    const offset = (page - 1) * limit;
    let query = supabaseAdmin
      .from('products')
      .select('*', { count: 'exact' })
      .eq('seller_id', sellerId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Product fetch failed for seller ${sellerId}: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Get a single product by ID.
   */
  async getById(productId) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*, profiles!products_seller_id_fkey(id, full_name, profile_image, location)')
      .eq('id', productId)
      .single();

    if (error) {
      logger.error(`Product fetch failed for ${productId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Update a product (ownership must be verified by the controller).
   */
  async update(productId, updates) {
    const { seller_id, id, created_at, ...safeUpdates } = updates;

    // Map camelCase fields to snake_case
    if (safeUpdates.aiGenerated !== undefined) {
      safeUpdates.ai_generated = safeUpdates.aiGenerated;
      delete safeUpdates.aiGenerated;
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        ...safeUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      logger.error(`Product update failed for ${productId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Delete a product.
   */
  async delete(productId) {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      logger.error(`Product deletion failed for ${productId}: ${error.message}`);
      throw error;
    }

    return true;
  },

  /**
   * Update product status (publish, draft, archive, etc.).
   */
  async updateStatus(productId, status) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      logger.error(`Product status update failed for ${productId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Public marketplace: get published products with filtering, search, sorting, and pagination.
   */
  async getPublished({ page = 1, limit = 20, category, search, sort = 'created_at', order = 'desc', minPrice, maxPrice } = {}) {
    const offset = (page - 1) * limit;
    let query = supabaseAdmin
      .from('products')
      .select('*, profiles!products_seller_id_fkey(id, full_name, profile_image, location)', { count: 'exact' })
      .eq('status', 'published');

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (minPrice) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }

    const { data, error, count } = await query
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Published products fetch failed: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Get products by a specific seller (public, only published).
   */
  async getPublishedBySeller(sellerId, { page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact' })
      .eq('seller_id', sellerId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Published products fetch for seller ${sellerId} failed: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Admin: get all products with optional filtering.
   */
  async getAll({ page = 1, limit = 20, status, sort = 'created_at', order = 'desc' } = {}) {
    const offset = (page - 1) * limit;
    let query = supabaseAdmin
      .from('products')
      .select('*, profiles!products_seller_id_fkey(id, full_name, email)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Admin product fetch failed: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Record a product view for analytics.
   */
  async recordView(productId, viewerId = null) {
    const { error } = await supabaseAdmin
      .from('product_views')
      .insert({
        product_id: productId,
        viewer_id: viewerId,
      });

    if (error) {
      logger.warn(`Product view recording failed: ${error.message}`);
      // Non-critical, don't throw
    }
  },
};

module.exports = productService;
