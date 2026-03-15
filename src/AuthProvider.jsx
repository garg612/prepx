import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('intervene_auth');
    setIsAuthenticated(stored === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('intervene_auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('intervene_auth');
    setIsAuthenticated(false);
  };

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
