import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MapSearchParams } from "@/constants/MapSearchParams";
import { COLORS } from "@/constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import { navInfo } from "@/constants/NavMock";
import { RoadData } from "@/app/map";
import { Text } from "@/app/map/components/Text";
import Toast from "react-native-root-toast";
const dangerBarImg = require("@/assets/images/dangerBar.png");
const coinkeyImg = require("@/assets/images/coinkey.png");

interface RecommendBoxProps {
  recmdRoadData: RoadData | undefined;
  shortRoadData: RoadData | undefined;
  safeRoadData: RoadData | undefined;
}
export default function RecommendBox({
  recmdRoadData,
  shortRoadData,
  safeRoadData,
}: RecommendBoxProps) {
  useEffect(() => {
    const rcmd = recmdRoadData ? 1 : 0;
    const short = shortRoadData ? 1 : 0;
    const safe = safeRoadData ? 1 : 0;
    if (rcmd + short + safe > 0) {
      Toast.show(`${rcmd + short + safe}개의 경로가 검색되었습니다.`, {
        position: Toast.positions.CENTER,
        duration: 2000,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }, [recmdRoadData, shortRoadData, safeRoadData]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {recmdRoadData && (
            <Box
              dangerNum={0}
              coin="200"
              keyword="추천, 안전한"
              onPressBox={() => {}}
              safezoneNum={3}
              selected
              time={(Number(recmdRoadData.totalTime) / 60).toFixed(0)}
            />
          )}
          {safeRoadData && (
            <Box
              dangerNum={0}
              coin="200"
              keyword="추천, 안전한"
              onPressBox={() => {}}
              safezoneNum={3}
              selected
              time={(Number(safeRoadData.totalTime) / 60).toFixed(0)}
            />
          )}
          {shortRoadData && (
            <Box
              dangerNum={0}
              coin="200"
              keyword="빠른"
              onPressBox={() => {}}
              safezoneNum={3}
              selected
              time={(Number(shortRoadData.totalTime) / 60).toFixed(0)}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const Box = ({
  onPressBox,
  selected,
  keyword,
  coin,
  time,
  safezoneNum,
  dangerNum,
}: {
  onPressBox(): void;
  selected: boolean;
  keyword: string;
  coin: string;
  time: string;
  safezoneNum: number;
  dangerNum: number;
}) => {
  return (
    <TouchableOpacity
      onPress={onPressBox}
      style={[styles.infoBox, { opacity: selected ? 1 : 0.6 }]}
    >
      <View>
        <Text style={styles.keyword}>{keyword}</Text>
        <View style={styles.coinInfoBox}>
          <Image source={coinkeyImg} style={{ width: 7, height: 12 }} />
          <Text style={{ color: "white", fontSize: 13, fontWeight: "500" }}>
            {coin}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={styles.bold}>{time}</Text>
        <Text style={styles.textLight}>분</Text>
      </View>

      <Text style={styles.infofooter}>
        안전시설 {safezoneNum} · 위험정보 {dangerNum}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 0,
  },
  infoBox: {
    width: 160,
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
    fontSize: 12,
    fontWeight: "600",
  },
  textLight: { fontSize: 16, fontWeight: "400", color: "#898C96" },
  bold: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
  coinInfoBox: {
    position: "absolute",
    right: -8,
    top: -4,
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
