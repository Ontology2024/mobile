import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const scrapList = ["나의집", "회사", "친구집"];
const starImg = require("@/assets/images/star.png");
const plusImg = require("@/assets/images/plus.png");
const startImg = require("@/assets/images/start.png");
const destinationImg = require("@/assets/images/destination.png");
const dangerImg = require("@/assets/images/danger.png");
const safezoneImg = require("@/assets/images/safezone.png");

const safe = [{ safeText: "안전해요" }, { safeText: "조금 안전해요" }, { safeText: "조금 위험해요" }, { safeText: "위험해요" }];

const safeN = 1;

export default function Panel({ start, dest }) {
  return (
    <View>
      <Text style={styles.pannelTitle}>안전한 길 찾기</Text>

      <View style={styles.scrapBox}>
        {scrapList.map((scrapName, idx) => (
          <View style={styles.scrapinfo} key={idx}>
            <Image source={starImg} style={styles.scrapImg} />
            <Text style={styles.scrapText}>{scrapName}</Text>
          </View>
        ))}
        <TouchableOpacity activeOpacity={0.8} style={styles.plusBox}>
          <Image source={plusImg} style={styles.scrapImg} />
        </TouchableOpacity>
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
        <View style={styles.safeInfoBox}>
          <View>
            <Text style={styles.safeText1}>주변안전도</Text>
            <Text style={safeN === 1 || safeN === 4 ? styles.safeText2 : styles.smallSafeText2}>{safe[safeN - 1].safeText}</Text>
          </View>
          <View style={styles.circle1}>
            <View style={styles.circle2}>
              <Text style={styles.safeNum}>{safeN}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.dangerCircle}>
              <Image source={dangerImg} style={{ width: 18, height: 18 }} />
            </View>
            <View style={{ marginLeft: 6 }}>
              <Text style={{ fontSize: 12, color: "#8D94A3", fontWeight: "500" }}>위험정보</Text>
              <Text style={{ fontSize: 16, color: "#2F323D", fontWeight: "600" }}>2개</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.safezoneCircle}>
              <Image source={safezoneImg} style={{ width: 18, height: 18 }} />
            </View>
            <View style={{ marginLeft: 6 }}>
              <Text style={{ fontSize: 12, color: "#8D94A3", fontWeight: "500" }}>위험정보</Text>
              <Text style={{ fontSize: 16, color: "#2F323D", fontWeight: "600" }}>13개</Text>
            </View>
          </View>
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
    position: "relative",
    left: -21,
    marginTop: 24,
    marginBottom: 20,
  },
  safeInfoBox: {
    backgroundColor: "#4775FF",
    paddingVertical: 6,
    paddingLeft: 20,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  safeText1: {
    fontSize: 16,
    fontWeight: "500",
    color: "#C5CCD7",
    marginBottom: 5.6,
  },
  safeText2: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  smallSafeText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  circle1: {
    backgroundColor: "#6C92F7",
    width: 56,
    height: 56,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  circle2: {
    backgroundColor: "white",
    width: 46,
    height: 46,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  safeNum: {
    color: "#4775FF",
    fontSize: 26,
    fontWeight: "600",
  },
  dangerCircle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#FFB8C0",
    padding: 11,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
  },
  safezoneCircle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#B2C5FF",
    padding: 11,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
  },
});
