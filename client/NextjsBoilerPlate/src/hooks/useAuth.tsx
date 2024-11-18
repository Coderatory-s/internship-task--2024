import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IDecryptedJwt } from '../lib/types'; // Assuming `IDecryptedJwt` is the user type you defined for JWT

interface AuthContextType {
  user: IDecryptedJwt | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IDecryptedJwt | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = JSON.parse(atob(token.split('.')[1])) as IDecryptedJwt;
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token format");
        logout();
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decodedUser = JSON.parse(atob(token.split('.')[1])) as IDecryptedJwt;
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
