import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const getCurrentToken = async () => {
  const sessionToken = await AsyncStorage.getItem('LOGIN_TOKEN');
  return sessionToken;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    setToken(data);
    await AsyncStorage.setItem('LOGIN_TOKEN', data);
    router.replace('/bottomTabNavigation/Feed');
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('LOGIN_TOKEN');
    router.replace('/');
  };

  const checkSessionExpired = async () => {
    let sessionUser = null;
    try {
      sessionUser = await AsyncStorage.getItem('LOGIN_TOKEN');
    } catch (ignored) {
    } finally {
      if (!sessionUser) {
        await logout();
      } else {
        setToken(sessionUser);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await checkSessionExpired();
      setLoading(false);
    })();
  }, []);

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      loading,
    }),
    [token, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
