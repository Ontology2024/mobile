import * as Font from "expo-font";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Pretendard: require("@/assets/fonts/Pretendard-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  );
}
