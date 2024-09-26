import { Slot } from "expo-router";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <View
        style={styles.header}
      >
        <Pressable onPress={() => router.back()} style={[styles.headerSideBlock, { justifyContent: "center", alignItems: "center" }]}>
          <AntDesign name="left" size={20} color="black"/>
        </Pressable>
        <Text style={styles.title}>AI 안심전화</Text>
        <View style={styles.headerSideBlock} />
      </View>
      <Slot />
    </SafeAreaView>
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