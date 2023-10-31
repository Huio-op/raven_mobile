import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen name={'Login'} options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}
