import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "./Text";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const fireImg = require("./fireStation.png");
const hospitalImg = require("./hospital.png");
const policeImg = require("./police.png");
const 절도img = require("./theif.png");
const 강도img = require("./robbery.png");

interface DangerInfoProps {
  theif2024: number;
  theif2023: number;
  robbery2024: number;
  robbery2023: number;
}
export function DangerInfo({
  robbery2023,
  robbery2024,
  theif2023,
  theif2024,
}: DangerInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={절도img} style={{ width: 32, height: 32 }} />
          <Text style={{ marginLeft: 10, fontWeight: "600" }}>절도</Text>
          <View style={{ marginLeft: 20 }}>
            <View style={styles.graphContainer}>
              <Text style={{ color: "#FF566A", fontSize: 12 }}>2024</Text>
              <View
                style={[
                  styles.bar,
                  { backgroundColor: "#FF566A", width: 10 * theif2024 },
                ]}
              />
              <Text style={styles.dangerText}>{theif2024}건</Text>
            </View>
            <View style={styles.graphContainer}>
              <Text style={{ color: "#C5C9D7", fontSize: 12 }}>2023</Text>
              <View
                style={[
                  styles.bar,
                  { backgroundColor: "#C5C9D7", width: 10 * theif2023 },
                ]}
              />
              <Text style={styles.grayText}>{theif2023}건</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={강도img} style={{ width: 32, height: 32 }} />
          <Text style={{ marginLeft: 10, fontWeight: "600" }}>강도</Text>
          <View style={{ marginLeft: 20 }}>
            <View style={styles.graphContainer}>
              <Text style={{ color: "#FF566A", fontSize: 12 }}>2024</Text>
              <View
                style={[
                  styles.bar,
                  { backgroundColor: "#FF566A", width: 10 * robbery2024 },
                ]}
              />
              <Text style={styles.dangerText}>{robbery2024}건</Text>
            </View>
            <View style={styles.graphContainer}>
              <Text style={{ color: "#C5C9D7", fontSize: 12 }}>2023</Text>
              <View
                style={[
                  styles.bar,
                  { backgroundColor: "#C5C9D7", width: 10 * robbery2023 },
                ]}
              />
              <Text style={styles.grayText}>{robbery2023}건</Text>
            </View>
          </View>
        </View>
      </View>
      <TextBox
        title={"절도주의 · 소지품주의"}
        content={
          "절도 사건 비중이 높고, 인근 다른 구역에 비해 절도 사건이 30% 더 많이 발생하니 주의가 필요합니다. 혼잡한 지역이나 어두운 골목에서의 소지품 관리를 강화하세요."
        }
        color={"#FF566A"}
      />
      <TextBox
        title={"성폭력주의 · 안전시설 파악"}
        content={
          "성폭력 사건이 빈번하게 발생하는 지역입니다. 여성 이용자분들은 특히 야간 이동 시 주의를 기울이시고, 주변의 안전 시설을 미리 파악해 두세요."
        }
        color={"#FF566A"}
      />
    </View>
  );
}

const TextBox = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color: string;
}) => {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E9EBF4",
      }}
    >
      <Text style={{ color: color }}>
        <MaterialCommunityIcons
          name="star-four-points"
          size={16}
          color={color}
        />{" "}
        {title}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          color: "#575C71",
          lineHeight: 18,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 24, paddingHorizontal: 20, gap: 16 },
  innerContainer: {
    padding: 14.5,
    gap: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9EBF4",
  },
  graphContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  bar: {
    height: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  dangerText: {
    color: "#FF566A",
    fontSize: 12,
    fontWeight: "700",
  },
  grayText: {
    color: "#FF566A",
    fontSize: 12,
    fontWeight: "700",
  },
});
