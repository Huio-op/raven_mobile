import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserApi from '../service/api/UserApi';

const AuthContext = createContext({});

export const getCurrentToken = async () => {
  const sessionToken = await AsyncStorage.getItem('LOGIN_TOKEN');
  return JSON.parse(sessionToken);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    setUser(data);
    await AsyncStorage.setItem('LOGIN_TOKEN', JSON.stringify(data));
    router.replace('/bottomTabNavigation/Feed');
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('LOGIN_TOKEN');
    router.replace('/');
  };

  const checkSessionExpired = async () => {
    let sessionUser = null;
    try {
      sessionUser = await AsyncStorage.getItem('LOGIN_TOKEN');
    } catch (e) {
    } finally {
      if (!sessionUser) {
        await logout();
      } else {
        try {
          setUser(JSON.parse(sessionUser));
        } catch (e) {}
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
      user,
      login,
      logout,
      loading,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
