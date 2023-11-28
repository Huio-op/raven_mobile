import { Stack } from 'expo-router';

export default function CreateAccountLayout() {
  return (
    <Stack>
      <Stack.Screen name={'MonitoringLogin'} options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen
        name={'MonitoringDash'}
        options={{ headerShown: true, animation: 'none', headerTitle: 'Posts reportados' }}
      />
    </Stack>
  );
}
