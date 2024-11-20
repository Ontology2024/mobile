import { Text } from "@/app/map/components/Text";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Slot } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SafeCallHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={[
            styles.headerSideBlock,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <AntDesign name="left" size={20} color="black" />
        </Pressable>
        <Text style={styles.title}>AI 안심전화</Text>
        <View style={styles.headerSideBlock} />
      </View>
      <Slot />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "stretch",

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
