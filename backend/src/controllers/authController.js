const authService = require('../services/authService');
const profileService = require('../services/profileService');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseHandler');
const ApiError = require('../utils/apiError');
const { env } = require('../config/env');
const logger = require('../utils/logger');

/**
 * Auth Controller – handles registration, login, OAuth, session, and profile endpoints.
 */
const authController = {
  /**
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      const { fullName, email, password, phone, language } = req.body;

      const data = await authService.register({ email, password, fullName, phone, language });

      // Try to sign in immediately to return a session
      let session = null;
      try {
        const loginData = await authService.login({ email, password });
        session = loginData.session;
      } catch (_) {
        // If email confirmation is required, login will fail — that's OK
      }

      const profile = await profileService.getById(data.user.id).catch(() => null);

      return sendCreated(res, 'Registration successful', {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        profile,
        session: session
          ? {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at,
            }
          : null,
      });
    } catch (err) {
      if (err.message?.includes('already registered') || err.message?.includes('already been registered')) {
        return next(ApiError.conflict('A user with this email already exists'));
      }
      next(err);
    }
  },

  /**
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });

      const profile = await profileService.getById(data.user.id).catch(() => null);

      return sendSuccess(res, 'Login successful', {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        profile,
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        },
      });
    } catch (err) {
      if (err.message?.includes('Invalid login credentials')) {
        return next(ApiError.unauthorized('Invalid email or password'));
      }
      next(err);
    }
  },

  /**
   * GET /api/auth/google
   * Redirects the user to Google OAuth via Supabase.
   */
  async googleOAuth(req, res, next) {
    try {
      const redirectTo = `${env.FRONTEND_URL}/auth/callback`;
      const data = await authService.getGoogleOAuthUrl(redirectTo);

      if (data.url) {
        return res.redirect(data.url);
      }

      return sendSuccess(res, 'Google OAuth URL generated', { url: data.url });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/auth/callback
   * Handles the OAuth callback. In most setups, the frontend handles this.
   * This endpoint documents the expected flow.
   */
  async oauthCallback(req, res, next) {
    try {
      return sendSuccess(res, 'OAuth callback received. The frontend should exchange the code for a session and call /api/auth/me.', {
        info: 'Use the Supabase client on the frontend to handle the OAuth callback and establish a session.',
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/auth/logout
   */
  async logout(req, res, next) {
    try {
      await authService.logout(req.accessToken);
      return sendSuccess(res, 'Logged out successfully');
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/auth/me
   * Returns the currently authenticated user and profile.
   */
  async me(req, res, next) {
    try {
      return sendSuccess(res, 'User retrieved successfully', {
        user: {
          id: req.user.id,
          email: req.user.email,
          created_at: req.user.created_at,
        },
        profile: req.profile,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/auth/profile
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
   * PUT /api/auth/profile
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

module.exports = authController;
