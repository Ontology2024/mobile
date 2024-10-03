import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "@/constants/colors";
import Wdpage from "./Wdpage";

const coinkeyBg = require("@/assets/images/coinkeyBg.png");
const coinkeyCharacter = require("@/assets/images/coinkeyCharacter.png");
const coinkeyImg = require("@/assets/images/coinkey.png");

const distance = 70;
const todayCoin = 7;

export default function Mykey({ setGoToKey, coin, setKey }) {
  const [gowithdraw, setGowithdraw] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setGoToKey(false);
            setGowithdraw(false);
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="home-outline" size={22} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>코인키</Text>
      </View>
      {gowithdraw ? (
        <Wdpage point={coin} setGoToKey={setGoToKey} setKey={setKey} />
      ) : (
        <View style={styles.container}>
          <Image source={coinkeyBg} style={styles.bg} />
          <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
            <Text style={{ color: "white", zIndex: 1, fontSize: 13, fontWeight: "600", textAlign: "center", marginTop: 50 }}>
              오늘도 안전하게 걸어볼까요?
            </Text>

            <Image source={coinkeyCharacter} style={styles.character} />

            <View style={styles.coinBox}>
              <Image source={coinkeyImg} style={{ width: 18, height: 30 }} />
              <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>{coin}</Text>
              <View style={styles.todaycoinBox}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>+{todayCoin}</Text>
              </View>
            </View>

            <View style={styles.speechBubble}>
              <View style={styles.speechBubbleArrow} />
              <Text style={styles.speechBubbleText}>코인키는1,2단계 안전구역 10m 거리 당 1개!</Text>
            </View>
            <View style={styles.distanceBox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                  오늘의 거리 <Text style={{ fontSize: 15 }}>{10 * todayCoin}</Text>
                  <Text style={{ color: "#A2A2A2", fontSize: 13 }}>m</Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Image source={coinkeyImg} style={{ width: 10, height: 17 }} />
                  <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>{todayCoin}</Text>
                </View>
              </View>
              <View style={{ width: "100%", height: 7, marginTop: 17 }}>
                <View style={{ backgroundColor: "#2F323D", width: "100%", height: "100%", borderRadius: 100 }} />
                <View style={[styles.moveDistance, { width: `${distance}%` }]} />
              </View>
            </View>

            <View style={styles.pointBox}>
              <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ gap: 4 }}>
                  <Text style={{ color: "#CED2E0", fontSize: 16, fontWeight: "600" }}>출금 가능 적립금</Text>
                  <Text style={{ color: "#8B94A8", fontSize: 10, fontWeight: "500" }}>1코인키는 1원으로 적립되며,</Text>
                  <Text style={{ color: "#8B94A8", fontSize: 10, fontWeight: "500" }}>출금 신청은 2,000원 이상 부터 가능합니다.</Text>
                </View>
                <View>
                  <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>{coin}원</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.withdrawBtn} onPress={() => setGowithdraw(!gowithdraw)}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>출금하기</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={[styles.footer, { marginBottom: 16 }]}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "70%", alignItems: "center", gap: 15 }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>출금 내역</Text>
                <Text style={{ color: "#8B94A8", fontSize: 10, fontWeight: "500" }}>적립금을 내 계좌로 출금하세요.</Text>
              </View>
              <Entypo name="chevron-thin-right" size={20} color="#575C71" style={{ marginLeft: 70 }} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.footer}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "70%", alignItems: "center", gap: 15 }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>적립 내역</Text>
                <Text style={{ color: "#8B94A8", fontSize: 10, fontWeight: "500" }}>요일 별 적립 내역을 확인하세요.</Text>
              </View>
              <Entypo name="chevron-thin-right" size={20} color="#575C71" style={{ marginLeft: 70 }} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  header: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    gap: 125,
    zIndex: 1,
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  character: {
    position: "absolute",
    top: 80,
    left: 15,
    width: 350,
    height: 400,
  },
  coinBox: {
    backgroundColor: COLORS.PURPLE,
    width: 121,
    height: 52,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 40,
    borderColor: "rgba(96, 40, 255, 0.20)",
    borderWidth: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 250,
  },
  todaycoinBox: {
    backgroundColor: "black",
    borderColor: COLORS.PURPLE,
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 35,
    position: "absolute",
    right: -25,
    top: -28,
  },
  speechBubble: {
    marginTop: 13.5,
    backgroundColor: COLORS.PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  speechBubbleText: {
    color: "#B6ACD7",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  // 말풍선 꼬리 부분 추가
  speechBubbleArrow: {
    position: "absolute",
    top: -5,
    left: 125,
    marginLeft: -10, // 꼬리 부분을 말풍선 중앙에 맞추기 위해 조정
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLORS.PURPLE, // 말풍선 꼬리 색상
  },
  distanceBox: {
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: 80,
    borderWidth: 1,
    borderColor: "#2F323D",
    borderRadius: 20,
    marginTop: 23,
    paddingHorizontal: 19,
    paddingVertical: 22,
  },
  moveDistance: {
    backgroundColor: COLORS.PURPLE,
    width: 0,
    height: "100%",
    borderRadius: 100,
    position: "absolute",
  },
  pointBox: {
    backgroundColor: "#2F323D",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: 126,
    borderRadius: 20,
    marginTop: 23,
    paddingHorizontal: 17,
    paddingVertical: 23,
    marginBottom: 16,
  },
  withdrawBtn: {
    width: "100%",
    height: 40,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#2F323D",
    borderRadius: 12,
    width: "85%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 100,
    flexDirection: "row",
    alignItems: "center",
  },
});
