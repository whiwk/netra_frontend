// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
  username: string;
  level: number;
  completion: number;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await fetch('http://10.30.1.221/api/v1/user/information/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const userData = await response.json();
          setUser({
            username: userData.username,
            level: userData.level,
            completion: userData.completion,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Add additional error handling or state update if needed
        }
      }
    };

    fetchUserData();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
