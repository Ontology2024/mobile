import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" options={{ headerShown: false, animation: "none" }} />
        <Stack.Screen name="origin" options={{ headerShown: false, animation: "slide_from_bottom", presentation: "modal" }} />
        <Stack.Screen name="destination" options={{ headerShown: false, animation: "slide_from_bottom", presentation: "modal" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
