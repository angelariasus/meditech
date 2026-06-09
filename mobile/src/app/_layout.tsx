import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';

import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="nueva-cita" options={{ presentation: 'modal', headerShown: true, title: 'Agendar Nueva Cita' }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
