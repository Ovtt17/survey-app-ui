import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/auth';
import { User } from '../types/user';
import { AuthenticationResponse } from '../types/authenticationResponse';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (authResponse: AuthenticationResponse) => Promise<void>;
  logout: () => void;
  verifySession: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    handleOpenErrorModal: () => void,
    callback: () => void
  ) => void;
  isProfileOwner: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = getToken();
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const authenticateUser = async (authResponse: AuthenticationResponse) => {
    try {
      setToken(authResponse.token);
      setUser(authResponse.user);
      localStorage.setItem('user', JSON.stringify(authResponse.user));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during authentication:', error);
      removeToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const isProfileOwner = (username: string) => {
    return isAuthenticated && user?.username === username;
  };

  const login = async (authResponse: AuthenticationResponse) => {
    await authenticateUser(authResponse);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const verifySession = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    handleOpenErrorModal: () => void,
    callback: () => void
  ) => {
    if (!isAuthenticated) {
      e.preventDefault();
      handleOpenErrorModal();
    } else {
      callback();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, verifySession, isProfileOwner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
