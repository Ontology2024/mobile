import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); //스플래시 화면 자동으로 숨겨지는거 방지
    async function loadFonts() {
      await Font.loadAsync({
        "BalooTammudu2-Bold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-Bold.ttf"),
        "BalooTammudu2-ExtraBold": require("@/assets/fonts/BalooTammudu2/BalooTammudu2-ExtraBold.ttf"),
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync(); // 폰트 로드 다 되면 스플래시 화면 숨김
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, gestureDirection: "vertical" }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
