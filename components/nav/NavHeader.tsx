import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { MapSearchParams } from "@/constants/MapSearchParams";
import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";

export default function NavHeader() {
  const { start, dest, setSearchParams } = useContext(MapSearchParams);
  const deleteNav = () => {
    setSearchParams({ start: "", dest: "" });
  };
  const changeNav = () => {
    setSearchParams({ start: dest, dest: start });
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "55%", flexDirection: "row", gap: 8, marginTop: 70, marginLeft: 30 }}>
        <View style={styles.leftBox}>
          <Link href="/searchStart" asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.textBox}>
              <Text style={styles.navtext}>{start}</Text>
            </TouchableOpacity>
          </Link>
          <Pressable style={styles.switchBox} onPress={changeNav}>
            <Octicons name="arrow-switch" size={20} color="#898C96" style={{ transform: [{ rotate: "90deg" }] }} />
          </Pressable>
          <Link href="/searchDest" asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.textBox}>
              <Text style={styles.navtext}>{dest}</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.rightBox}>
          <TouchableOpacity activeOpacity={0.6} onPress={deleteNav}>
            <Feather name="x" size={24} color="#767985" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Feather name="more-vertical" size={24} color="#767985" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "23%",
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  leftBox: {
    width: "85%",
    backgroundColor: "#F4F6F9",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: "flex-end",
    gap: 8,
  },
  rightBox: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },
  textBox: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderColor: "#E5EBF0",
    borderBottomWidth: 1,
  },
  navtext: {
    fontSize: 16,
    fontWeight: "500",
  },
  switchBox: {
    backgroundColor: "white",
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#C5CCD7",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 32,
    top: 38,
  },
});
