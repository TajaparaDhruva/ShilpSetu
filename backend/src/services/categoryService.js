const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Category Service – CRUD for centralized category management.
 */
const categoryService = {
  /**
   * Get all active categories.
   */
  async getAll(includeInactive = false) {
    let query = supabaseAdmin
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      logger.error(`Category fetch failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Create a category (admin only).
   */
  async create({ name, icon, is_active }) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert({ name, icon: icon || null, is_active })
      .select()
      .single();

    if (error) {
      logger.error(`Category creation failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Update a category (admin only).
   */
  async update(categoryId, updates) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .update(updates)
      .eq('id', categoryId)
      .select()
      .single();

    if (error) {
      logger.error(`Category update failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Delete a category (admin only).
   */
  async delete(categoryId) {
    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      logger.error(`Category deletion failed: ${error.message}`);
      throw error;
    }

    return true;
  },
};

module.exports = categoryService;
