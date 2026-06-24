import { supabase } from './supabaseClient';

export const authService = {
  /**
   * Performs Supabase login, falls back to signUp/auto-registration if user is not found.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>}
   */
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    let sessionData = null;
    let authError = null;

    // 1. Try signing in
    const res = await supabase.auth.signInWithPassword({ email, password });
    sessionData = res.data;
    authError = res.error;

    // 2. Auto-signup on failure
    if (authError) {
      if (authError.message.includes("Invalid login credentials") || authError.status === 400) {
        const signUpRes = await supabase.auth.signUp({ email, password });
        if (signUpRes.error) {
          throw new Error(signUpRes.error.message);
        }
        sessionData = signUpRes.data;
      } else {
        throw new Error(authError.message);
      }
    }

    const authUser = sessionData.user;
    if (!authUser) {
      throw new Error("Authentication failed: No user session was created.");
    }

    // 3. Fetch or create record in public.users
    const { data: profile, error: profileErr } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    let userRole = email === 'admin@gmail.com' ? 'admin' : 'member';
    let finalProfile = profile;

    if (!profile) {
      const { data: newProfile, error: insertErr } = await supabase
        .from('users')
        .insert({
          id: authUser.id,
          name: email.split('@')[0],
          email: email,
          role: userRole
        })
        .select()
        .single();
      
      if (insertErr) {
        console.error("Error creating user profile in database:", insertErr);
      }
      finalProfile = newProfile;
    } else {
      await supabase.from('users').update({ last_login_at: new Date().toISOString() }).eq('id', authUser.id);
    }

    const userData = {
      id: authUser.id,
      name: finalProfile?.name || email.split('@')[0],
      email: authUser.email,
      role: finalProfile?.role || userRole,
      avatar_url: finalProfile?.avatar_url
    };

    localStorage.setItem("luxebook_session_user", JSON.stringify(userData));
    return userData;
  },

  /**
   * Logs out the user.
   */
  logout: async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("luxebook_session_user");
  },

  /**
   * Checks if session user exists.
   */
  isAuthenticated: () => {
    return localStorage.getItem("luxebook_session_user") !== null;
  },

  /**
   * Gets current session user.
   */
  getCurrentUser: () => {
    const user = localStorage.getItem("luxebook_session_user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Updates user profile info in Supabase.
   */
  updateUser: async (updates) => {
    const cachedUser = authService.getCurrentUser();
    if (!cachedUser) return null;

    const { data, error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        phone: updates.phone,
        avatar_url: updates.avatar_url
      })
      .eq('id', cachedUser.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const updatedUser = { ...cachedUser, ...updates, name: data.name, phone: data.phone, avatar_url: data.avatar_url };
    localStorage.setItem("luxebook_session_user", JSON.stringify(updatedUser));
    return updatedUser;
  }
};
