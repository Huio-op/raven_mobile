import { StyleSheet, Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import '../i18n';
import CustomTitle from '/components/CustomTitle';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import React from 'react';

export default function WelcomeScreenLayout() {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name={'index'} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen
          name={'bottomTabNavigation'}
          options={{
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitle: (props) => <CustomTitle />,
            headerStyle: { height: 40 },
          }}
        />
        <Stack.Screen name={'createAccount'} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name={'login'} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name={'monitoring'} options={{ headerShown: false, animation: 'none' }} />
      </Stack>
    </AuthProvider>
  );
}
