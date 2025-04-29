'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth0Client, initAuth0 } from '../lib/auth0';
import axiosInstance from '../lib/axios';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: any}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth0 = async () => {
      await initAuth0()
      const client = await getAuth0Client();
      try {
        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const userProfile = await client.getUser();
          setUser(userProfile);
        } else {
          await client.loginWithRedirect();
        }
      } catch (error) {
        console.error(error);
      } finally {
        const token = getToken();
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        };
        setIsLoading(false);
      }
    };

    initializeAuth0();
  }, []);

  const login = async () => {
    const client = await getAuth0Client();
    await client.loginWithRedirect();
  };

  const logout = async () => {
    const client = await getAuth0Client();
    await client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    setUser(null);
    setIsAuthenticated(false);
  };

  const getToken = async () => {
    const client = await getAuth0Client(); 
    return await client.getTokenSilently();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);