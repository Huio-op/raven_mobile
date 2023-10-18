import { Stack } from 'expo-router';

export default function CreateAccountLayout() {
  return (
    <Stack>
      <Stack.Screen name={'FirstStep'} options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}
