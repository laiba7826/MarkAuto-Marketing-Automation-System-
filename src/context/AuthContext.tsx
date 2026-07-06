import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: Role) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE = 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('markauto_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user', err);
        localStorage.removeItem('markauto_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (role: Role) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      
      if (!res.ok) {
        throw new Error('Login failed');
      }

      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('markauto_user', JSON.stringify(userData));
    } catch (err) {
      console.error(err);
      // Fallback in case backend is not running yet during initial load/testing
      const fallbackUser: User = { 
        id: role === 'Visitor' ? '0' : '3', 
        name: role === 'Visitor' ? 'Guest' : 'Mark Marketing', 
        email: `${role.toLowerCase()}@marketing.com`, 
        role 
      };
      setUser(fallbackUser);
      localStorage.setItem('markauto_user', JSON.stringify(fallbackUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('markauto_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
