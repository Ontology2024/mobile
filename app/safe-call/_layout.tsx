import { AI, AIConfigs, DEFAULT_AI_CONFIG } from "@/constants/AIConfigs";
import { Stack } from "expo-router";
import { useReducer } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const [configs, setConfigs] = useReducer(
    (configs: AI[], update: Partial<AI> & { name: string }): AI[] =>
      configs.map(({ name, ...rest }) => ({
        name,
        ...rest,
        ...(name === update.name && update),
      })),
    DEFAULT_AI_CONFIG
  );

  return (
    <AIConfigs.Provider value={{ configs, setConfigs }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="call" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="config" options={{ headerShown: false }} />
          <Stack.Screen name="select" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </AIConfigs.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "stretch",

    paddingTop: 16,
    paddingBottom: 16,

    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E3E3E3",
  },
  title: {
    flexGrow: 1,

    fontSize: 18,
    textAlign: "center",
  },
  headerSideBlock: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 56,
  },
});
