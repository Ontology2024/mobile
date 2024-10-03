import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "@/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AIConfigs } from "@/constants/AIConfigs";
import { useLocalSearchParams } from "expo-router";

const callbottomImg = require("@/assets/images/callbottom.png");

export default function call() {
  const { configs } = useContext(AIConfigs);
  const { callee } = useLocalSearchParams<{ callee: string }>();
  const selected = configs.find(({ name }) => name === callee)!;

  return (
    <View style={Styles.container}>
      <View style={{ marginTop: 29, marginLeft: -100, gap: 18 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          <Text style={{ color: COLORS.PURPLE, fontSize: 26, fontWeight: "700" }}>{selected.name}</Text>
          <View style={Styles.time}>
            <Text style={{ color: "#939393", fontSize: 14, fontWeight: "400" }}>00:21:45</Text>
          </View>
        </View>
        <Text style={{ color: "#939393", fontSize: 14, fontWeight: "400" }}>
          {selected.keywords.map(keyword => `#${keyword}`).join(' ')}
        </Text>
      </View>

      <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: "center", top: 150 }}>
        <Image source={selected.character} style={{ width: "80%", height: "50%" }} />
      </View>

      <TouchableOpacity activeOpacity={0.9} style={Styles.callBtn}>
        <MaterialIcons name="call-end" size={36} color="white" />
      </TouchableOpacity>

      <View style={Styles.footer}>
        <TouchableOpacity activeOpacity={0.9} style={Styles.msgBtn}>
          <MaterialCommunityIcons name="message-processing" size={24} color={COLORS.PURPLE} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={Styles.settingBtn}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={callbottomImg} style={Styles.bottombar} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  time: {
    backgroundColor: "#E8EAEE",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  callBtn: {
    position: "relative",
    top: 480,
    width: 86,
    height: 86,
    borderRadius: 100,
    backgroundColor: "#FF566A",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
  },
  msgBtn: {
    width: 56,
    height: 56,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
  },
  settingBtn: {
    width: 56,
    height: 56,
    backgroundColor: "#9B77FF",
    borderRadius: 20,
    padding: 16,
  },
  footer: {
    position: "relative",
    top: 460,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  bottombar: {
    width: "100%",
    height: "18%",
    position: "absolute",
    bottom: 0,
    marginBottom: -35,
  },
});
