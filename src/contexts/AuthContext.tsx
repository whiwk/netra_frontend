import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

interface User {
  username: string;
  level: number;
  completion: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refreshAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter(); // Use the useRouter hook

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    router.replace('/auth/login'); // Redirect to login page
  };

  const fetchUserData = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Auth token not available');
      handleLogout();
      return;
    }

    try {
      const response = await fetch('http://10.30.1.221/api/v1/user/information/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 307) {
          handleLogout(); // Handle 401 unauthorized by logging out
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      setUser({
        username: userData.username,
        level: userData.level,
        completion: userData.completion,
      });
      setIsLoading(false);
      setRetryCount(0); // Reset retry count on successful data fetch
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
      if (retryCount < 3) {
        setTimeout(refreshAuthToken, 5000); // Retry token refresh after 5 seconds unless it's a 401 error
      }
    }
  };

  const refreshAuthToken = async () => {
    setIsLoading(true);
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token available');
      handleLogout();
      return;
    }

    try {
      const response = await fetch('http://10.30.1.221/api/v1/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      localStorage.setItem('authToken', data.access);
      fetchUserData(); // Fetch user data with the new token
    } catch (error) {
      console.error('Error refreshing auth token:', error);
      setIsLoading(false);
      setRetryCount(retryCount + 1);
      if (retryCount >= 3) {
        handleLogout(); // If all retries fail, log out
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshAuthToken }}>
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
