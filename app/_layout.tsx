import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  if (!loaded) {
      // Async font loading only occurs in development.
      return null;
    }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(auth)/index"/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
