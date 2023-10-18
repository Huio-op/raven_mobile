import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import '../i18n';
import CustomTitle from '/components/CustomTitle';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreenLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name={'index'} options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen
        name={'bottomTabNavigation'}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: (props) => <CustomTitle title={t('feed.home')} />,
        }}
      />
      <Stack.Screen name={'createAccount'} options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}
