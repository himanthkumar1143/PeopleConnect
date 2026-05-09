import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../api/auth.api';
import { getToken, setToken, removeToken } from '../utils/tokenStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = getToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await getMe();
        setUser(data.user);
        setTokenState(storedToken);
      } catch {
        removeToken();
        setTokenState(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = useCallback((userData, authToken) => {
    setToken(authToken);
    setTokenState(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthContext;
