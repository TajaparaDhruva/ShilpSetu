const { createClient } = require('@supabase/supabase-js');
const { env } = require('./env');

/**
 * Supabase Admin Client (Service Role)
 * Use ONLY for trusted backend operations: creating profiles on signup,
 * admin actions, bypassing RLS where needed.
 * NEVER expose this to the frontend.
 */
const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Supabase Anon Client
 * Used for public/unauthenticated operations.
 */
const supabaseAnon = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

/**
 * Returns a Supabase client scoped to a specific user's access token.
 * Queries run under this client respect RLS policies for the authenticated user.
 *
 * @param {string} accessToken - The user's JWT access token from Supabase Auth
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
function getScopedClient(accessToken) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

module.exports = { supabaseAdmin, supabaseAnon, getScopedClient };
