import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "BalooTammudu2-Bold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-Bold.ttf"),
    "BalooTammudu2-ExtraBold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" options={{ headerShown: false, animation: "none" }} />
        <Stack.Screen name="search" options={{ headerShown: false, animation: "none" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
