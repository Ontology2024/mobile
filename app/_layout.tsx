import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" options={{ headerShown: false, animation: "none" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
