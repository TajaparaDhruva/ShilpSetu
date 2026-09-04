const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

/**
 * Auth Service – wraps Supabase Auth operations.
 * All password hashing, session management, and token generation
 * is handled entirely by Supabase Auth.
 */
const authService = {
  /**
   * Register a new user with email and password.
   */
  async register({ email, password, fullName, phone, language }) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm for MVP; disable in production if needed
      user_metadata: {
        full_name: fullName,
        phone,
        language,
      },
    });

    if (error) {
      logger.error(`Registration failed: ${error.message}`);
      throw error;
    }

    // Create profile row
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: data.user.id,
        full_name: fullName,
        email,
        phone: phone || null,
        language: language || 'en',
        role: 'seller',
        is_verified: false,
      }, { onConflict: 'id' });

    if (profileError) {
      logger.error(`Profile creation failed: ${profileError.message}`);
    }

    return data;
  },

  /**
   * Sign in with email and password.
   */
  async login({ email, password }) {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logger.error(`Login failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Generate Google OAuth sign-in URL.
   */
  async getGoogleOAuthUrl(redirectTo) {
    const { data, error } = await supabaseAdmin.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      logger.error(`Google OAuth URL generation failed: ${error.message}`);
      throw error;
    }

    return data;
  },

  /**
   * Verify a Supabase access token and return the authenticated user.
   */
  async getUser(token) {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      throw error || new Error('User not found');
    }

    return user;
  },

  /**
   * Sign out a user session.
   */
  async logout(token) {
    // The admin API doesn't directly support logout by token,
    // so we rely on the client calling signOut. This is a no-op placeholder
    // that the controller can invoke for future session invalidation logic.
    return { message: 'Logged out successfully' };
  },
};

module.exports = authService;
