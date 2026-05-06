import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminApi, TOKEN_KEY } from '@/admin/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setIsLoading(false); return; }
    try {
      const response = await adminApi.get('/auth/me');
      setUser(response.data.user);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await adminApi.post('/auth/login', { email, password });
      if (response.success) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor' || user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      isAdmin,
      isEditor,
      canDelete: isAdmin,
      canEdit: isEditor,
      login,
      logout,
      reload: loadUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
