import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MapSearchParams } from "@/constants/MapSearchParams";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "BalooTammudu2-Bold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-Bold.ttf"),
    "BalooTammudu2-ExtraBold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-ExtraBold.ttf"),
  });
  const [{ start, dest }, setSearchParams] = useState({ start: "", dest: "" });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <MapSearchParams.Provider value={{ start, dest, setSearchParams }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="main" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="mypage" options={{ headerShown: false }} />
          <Stack.Screen name="editmypage" options={{ headerShown: false }} />
          <Stack.Screen name="scrapplace" options={{ headerShown: false }} />
          <Stack.Screen name="addplace" options={{ headerShown: false }} />
          <Stack.Screen name="editalarm" options={{ headerShown: false }} />
          <Stack.Screen name="searchStart" options={{ headerShown: false }} />
          <Stack.Screen name="searchDest" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </MapSearchParams.Provider>
  );
}
