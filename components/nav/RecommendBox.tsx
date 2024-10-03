import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { MapSearchParams } from "@/constants/MapSearchParams";
import { COLORS } from "@/constants/colors";
import { ScrollView } from "react-native-gesture-handler";

const dangerBarImg = require("@/assets/images/dangerBar.png");
const coinkeyImg = require("@/assets/images/coinkey.png");

export default function RecommendBox({ navInfo }) {
  const { start, dest, setSearchParams } = useContext(MapSearchParams);
  const [selectedBox, setSelectedBox] = useState(0);

  const select = (box) => {
    setSelectedBox(box);
  };

  return (
    <View style={styles.container}>
      <Image source={dangerBarImg} style={{ width: 48, height: 118, marginBottom: 10 }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {navInfo.map((data, idx) => (
            <Pressable onPress={() => select(idx)} style={[styles.infoBox, { opacity: selectedBox === idx ? 1 : 0.6 }]} key={idx}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={styles.keyword}>{data.keyword}</Text>
                <View style={styles.coinInfoBox}>
                  <Image source={coinkeyImg} style={{ width: 7, height: 12 }} />
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "500" }}>{data.coin}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "400", color: "#898C96" }}>
                <Text style={{ fontSize: 24, fontWeight: "600", color: "black" }}>{data.time}</Text> 분
              </Text>
              <Text style={styles.infofooter}>
                안전시설 {data.safezone} · 위험정보 {data.danger}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: 11,
    marginBottom: 11,
  },
  infoBox: {
    width: 165,
    height: 95,
    backgroundColor: "white",
    borderColor: COLORS.PURPLE,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  keyword: {
    color: COLORS.PURPLE,
    fontSize: 14,
    fontWeight: "600",
  },
  coinInfoBox: {
    width: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 50,
  },
  infofooter: {
    color: "#767985",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: -1,
  },
});
