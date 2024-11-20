import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Panel2 from "./Panel2";

const scrapList = ["나의집", "회사", "친구집"];
const starImg = require("@/assets/images/star.png");
const plusImg = require("@/assets/images/plus.png");
const startImg = require("@/assets/images/start.png");
const destinationImg = require("@/assets/images/destination.png");

const safeSentence = ["위험해요", "안전해요"];

const circleColor = { safe: ["#4876FF", "#DFE2FF"], danger: ["#FF566A", "#FFDFDF"] };

export default function Panel({ start, dest, curr, clickinfo, safeNum }) {
  return clickinfo ? (
    <Panel2 curr={curr} safeNum={safeNum} />
  ) : (
    <View>
      <Text style={styles.pannelTitle}>안전한 길 찾기</Text>

      <View style={styles.scrapBox}>
        {scrapList.map((scrapName, idx) => (
          <View style={styles.scrapinfo} key={idx}>
            <Image source={starImg} style={styles.scrapImg} />
            <Text style={styles.scrapText}>{scrapName}</Text>
          </View>
        ))}
        <Link href="/scrapplace" asChild>
          <TouchableOpacity activeOpacity={0.8} style={styles.plusBox}>
            <Image source={plusImg} style={styles.scrapImg} />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.navbox}>
        <View style={styles.navInfo}>
          <Image source={startImg} style={styles.start} />
          <Link href="/searchStart" asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.navTextBox}>
              <Text style={start ? styles.navText : styles.placeholder}>{start || "출발지를 입력해주세요"}</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.navInfo}>
          <Image source={destinationImg} style={styles.destination} />
          <Link href="/searchDest" asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.navTextBox}>
              <Text style={dest ? styles.navText : styles.placeholder}>{dest || "목적지를 입력해주세요"}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.smallCircle1} />
        <View style={[styles.smallCircle2, { backgroundColor: safeNum <= 3 ? circleColor["safe"][0] : circleColor["danger"][0] }]} />
        <View
          style={[
            styles.circle,
            {
              backgroundColor: safeNum <= 3 ? circleColor["safe"][0] : circleColor["danger"][0],
              borderColor: safeNum <= 3 ? circleColor["safe"][1] : circleColor["danger"][1],
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>{safeNum}</Text>
        </View>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
          {safeNum <= 3 ? safeSentence[1] : safeSentence[0]}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center", marginLeft: 6 }}>
          <Feather name="alert-circle" size={16} color="#8B94A8" />
          <Text style={{ color: "#8B94A8" }}>{curr}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pannelTitle: {
    color: "#8D94A3",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 12,
  },
  scrapBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  scrapinfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderColor: "#C5CCD7",
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 25,
  },
  scrapImg: {
    width: 9,
    height: 9,
  },
  scrapText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#767985",
  },
  plusBox: {
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 25,
    height: 25,
  },
  navbox: {
    backgroundColor: "#F4F6F9",
    borderRadius: 15,
    padding: 16,
    paddingTop: 12,
    gap: 8,
    marginTop: 12,
  },
  navInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  start: {
    width: 16,
    height: 16,
  },
  destination: {
    width: 16,
    height: 20,
  },
  navTextBox: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginLeft: 4,
    borderBottomColor: "#E5EBF0",
    borderBottomWidth: 1,
    width: 300,
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
  },
  placeholder: {
    fontSize: 16,
    fontWeight: "500",
    color: "#B6BDC6",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  circle: {
    backgroundColor: "#4876FF",
    borderWidth: 4,
    borderColor: "#DFE2FF",
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCircle1: {
    width: 12.5,
    height: 12.5,
    backgroundColor: "#8B94A8",
    borderRadius: 100,
    position: "relative",
    top: -15,
  },
  smallCircle2: {
    width: 7.5,
    height: 7.5,
    backgroundColor: "#4876FF",
    borderRadius: 100,
    position: "absolute",
    top: -5,
    left: 15,
  },
});
