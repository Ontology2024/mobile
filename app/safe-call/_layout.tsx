import { Slot } from "expo-router";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AI, AIConfigs, DEFAULT_AI_CONFIG } from "@/constants/AIConfigs";
import { useReducer } from "react";

export default function Layout() {
  const [configs, setConfigs] = useReducer(
    (configs: AI[], update: Partial<AI> & { name: string }): AI[] =>
      configs.map(({ name, ...rest }) => ({ name, ...rest, ...(name === update.name && update) })),
    DEFAULT_AI_CONFIG
  );

  return (
    <AIConfigs.Provider value={{ configs, setConfigs }}>
      <SafeAreaView style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={[styles.headerSideBlock, { justifyContent: "center", alignItems: "center" }]}>
            <AntDesign name="left" size={20} color="black"/>
          </Pressable>
          <Text style={styles.title}>AI 안심전화</Text>
          <View style={styles.headerSideBlock} />
        </View>
        <Slot />
      </SafeAreaView>
    </AIConfigs.Provider>
  )
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
    fontWeight: 600,
    textAlign: "center",
  },
  headerSideBlock: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 56,
  }
})