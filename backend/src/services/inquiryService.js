const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Inquiry Service – buyer-seller communication management.
 */
const inquiryService = {
  /**
   * Create a new inquiry from a buyer.
   */
  async create({ productId, buyerId, message }) {
    // First, get the product to determine the seller
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('seller_id')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      throw new Error('Product not found');
    }

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert({
        product_id: productId,
        buyer_id: buyerId,
        seller_id: product.seller_id,
        message,
      })
      .select('*, products(id, title, images), profiles!inquiries_buyer_id_fkey(id, full_name)')
      .single();

    if (error) {
      logger.error(`Inquiry creation failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Get inquiries for a seller.
   */
  async getBySeller(sellerId, { page = 1, limit = 20, status } = {}) {
    const offset = (page - 1) * limit;
    let query = supabaseAdmin
      .from('inquiries')
      .select('*, products(id, title, images), profiles!inquiries_buyer_id_fkey(id, full_name)', { count: 'exact' })
      .eq('seller_id', sellerId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Inquiry fetch failed for seller ${sellerId}: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Get inquiries for a buyer.
   */
  async getByBuyer(buyerId, { page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabaseAdmin
      .from('inquiries')
      .select('*, products(id, title, images), profiles!inquiries_seller_id_fkey(id, full_name)', { count: 'exact' })
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Inquiry fetch failed for buyer ${buyerId}: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },

  /**
   * Get a single inquiry by ID.
   */
  async getById(inquiryId) {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*, products(id, title, images), profiles!inquiries_buyer_id_fkey(id, full_name), profiles!inquiries_seller_id_fkey(id, full_name)')
      .eq('id', inquiryId)
      .single();

    if (error) {
      logger.error(`Inquiry fetch failed for ${inquiryId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Respond to an inquiry (seller).
   */
  async respond(inquiryId, response) {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update({
        response,
        status: 'responded',
      })
      .eq('id', inquiryId)
      .select()
      .single();

    if (error) {
      logger.error(`Inquiry response failed for ${inquiryId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Close an inquiry.
   */
  async close(inquiryId) {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update({ status: 'closed' })
      .eq('id', inquiryId)
      .select()
      .single();

    if (error) {
      logger.error(`Inquiry close failed for ${inquiryId}: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Admin: get all inquiries.
   */
  async getAll({ page = 1, limit = 20, status } = {}) {
    const offset = (page - 1) * limit;
    let query = supabaseAdmin
      .from('inquiries')
      .select('*, products(id, title), profiles!inquiries_buyer_id_fkey(id, full_name), profiles!inquiries_seller_id_fkey(id, full_name)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error(`Admin inquiry fetch failed: ${error.message}`);
      throw error;
    }

    return { data, count, page, limit };
  },
};

module.exports = inquiryService;
