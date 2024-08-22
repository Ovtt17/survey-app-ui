import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/auth';
import { getUser } from '../services/userService';
import { User } from '../types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const authenticateUser = async (token?: string) => {
    try {
      if (token) {
        setToken(token);
      }
      const userData = await getUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during authentication:', error);
      removeToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        await authenticateUser();
      }
    };

    initializeAuth();
  }, []);

  const login = async (token: string) => {
    await authenticateUser(token);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
