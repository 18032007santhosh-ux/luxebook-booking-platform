/**
 * Simulated Authentication Service
 * Designed to be easily replaced by Firebase, Supabase, or JWT OAuth later.
 */

const AUTH_KEY = "luxebook_auth";
const USER_KEY = "luxebook_user";

export const authService = {
  /**
   * Simulates a secure login.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>}
   */
  login: async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate basic validation
    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    let role = "member";
    if (email === "admin@gmail.com") {
      if (password === "admin123") {
        role = "admin";
      } else {
        throw new Error("Invalid admin credentials");
      }
    }

    const mockUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      role: role
    };

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    return mockUser;
  },

  /**
   * Logs out the user and clears secure storage.
   */
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Checks if a valid session exists.
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return localStorage.getItem(AUTH_KEY) === "true";
  },

  /**
   * Retrieves the current user profile.
   * @returns {Object|null}
   */
  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Updates the current user profile.
   * @param {Object} updates
   * @returns {Object|null}
   */
  updateUser: (updates) => {
    const user = authService.getCurrentUser();
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  }
};
