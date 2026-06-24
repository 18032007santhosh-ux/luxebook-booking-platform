import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { membershipService } from "../services/membershipService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      if (authStatus) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          // Sync active membership status in background
          membershipService.syncActiveMembership(currentUser.id).catch(console.error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    setIsAuthenticated(true);
    // Sync membership on successful login
    await membershipService.syncActiveMembership(userData.id).catch(console.error);
    return userData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>; // Could be replaced with a luxury spinner
  }

  const updateUser = (updates) => {
    const updatedUser = authService.updateUser(updates);
    if (updatedUser) {
      setUser(updatedUser);
    }
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
