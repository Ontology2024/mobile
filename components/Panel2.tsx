import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

const shiledImg = require("@/assets/images/shield.png");
const bluediaImg = require("@/assets/images/bluedia.png");
const reddiaImg = require("@/assets/images/bluedia.png");

const safeSentence = ["위험해요", "안전해요"];

const circleColor = { safe: ["#4876FF", "#DFE2FF"], danger: ["#FF566A", "#FFDFDF"] };
const safeN = 1;
const danger = 15;
const safe = 20;

export default function Panel2({ curr }) {
  const [toggleBtn, setToggleBtn] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleBubble = () => {
    if (showBubble) {
      // 말풍선을 숨김
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowBubble(false));
    } else {
      setShowBubble(true);
      // 말풍선을 표시
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <View style={[styles.footer, { marginTop: 20 }]}>
        <View style={styles.smallCircle1} />
        <View style={[styles.smallCircle2, { backgroundColor: safeN <= 3 ? circleColor["safe"][0] : circleColor["danger"][0] }]} />
        <View
          style={[
            styles.circle,
            {
              backgroundColor: safeN <= 3 ? circleColor["safe"][0] : circleColor["danger"][0],
              borderColor: safeN <= 3 ? circleColor["safe"][1] : circleColor["danger"][1],
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>{safeN}</Text>
        </View>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
          {safeN <= 3 ? safeSentence[1] : safeSentence[0]}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center", marginLeft: 6 }}>
          <Feather name="alert-circle" size={16} color="#8B94A8" />
          <Text style={{ color: "#8B94A8" }}>{curr}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggle, { borderBottomColor: toggleBtn ? "black" : "#E9EBF4" }]}
          onPress={() => setToggleBtn(true)}
        >
          <Text>위험정보({danger})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.toggle, { borderBottomColor: toggleBtn ? "#E9EBF4" : "black" }]}
          onPress={() => setToggleBtn(false)}
        >
          <Text>안전시설({safe})</Text>
        </TouchableOpacity>
      </View>

      {/* 말풍선 애니메이션 */}
      {showBubble && (
        <Animated.View
          style={[
            styles.speechBubble,
            {
              opacity: fadeAnim, // 말풍선의 투명도를 애니메이션 값에 맞춤
              transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], // 아래에서 위로 서서히 등장
            },
          ]}
        >
          <View style={styles.speechBubbleTail} />
          <View style={{ gap: 15 }}>
            <Text style={{ color: "#2F323D", fontSize: 14, fontWeight: "600", marginBottom: -10 }}>범죄 유형별 발생건수</Text>
            <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
              절도, 강도, 성폭력, 폭력의 발생 건수를 시각적으로 나타내는 트리맵입니다.
            </Text>
            <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
              각 사각형의 크기는 범죄 발생 건수에 비례하며, 큰 사각형일수록 해당 범죄가 많이 발생한 것을 의미합니다.
            </Text>
            <View>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
                <Text style={{ color: "#2F323D" }}>상향 화살표(↑):</Text> 이 범죄 유형의 발생 건수가 주변보다 높습니다.
              </Text>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>
                <Text style={{ color: "#2F323D" }}>하향 화살표(↓):</Text> 이 범죄 유형의 발생 건수가 주변보다 낮습니다.
              </Text>
            </View>
          </View>
        </Animated.View>
      )}

      {toggleBtn ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: "100%", marginTop: 24 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#232323", fontSize: 16, fontWeight: "600" }}>범죄 발생건수</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleBubble}>
              <Feather name="alert-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 16 }}>
            <View style={styles.crimeBox}>
              <Image source={shiledImg} style={{ width: 30, height: 30 }} />
              <Text style={{ color: "#1C1C22", fontSize: 16, fontWeight: "600" }}>0건</Text>
              <Text style={{ color: "#8B94A8", fontSize: 12, fontWeight: "500" }}>최근 1년 간 발생한 범죄가 없습니다</Text>
            </View>
          </View>
          <View style={{ gap: 16 }}>
            <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={bluediaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#4876FF" }]}>매우 안전</Text>
              </View>
              <Text style={styles.infodetail}>
                이 구역에서는 최근 특정 기간 동안 범죄가 발생하지 않았습니다. 안전한 지역으로 평가되며, 안심하고 생활할 수 있는 환경을
                제공합니다.
              </Text>
            </View>
            <View style={styles.crimeinfobox}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 5 }}>
                <Image source={bluediaImg} style={{ width: 11, height: 14 }} />
                <Text style={[styles.infotitle, { color: "#4876FF" }]}>매우 안전</Text>
              </View>
              <Text style={styles.infodetail}>
                이 구역에서는 최근 특정 기간 동안 범죄가 발생하지 않았습니다. 안전한 지역으로 평가되며, 안심하고 생활할 수 있는 환경을
                제공합니다.
              </Text>
            </View>
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: "100%", marginTop: 24 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#232323", fontSize: 16, fontWeight: "600" }}>내주변 안전시설</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={toggleBubble}>
              <Feather name="alert-circle" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  toggle: {
    width: "55%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9EBF4",
    justifyContent: "center",
    alignItems: "center",
  },
  crimeBox: {
    width: "100%",
    height: 140,
    backgroundColor: "#F8F9FE",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  crimeinfobox: {
    width: "100%",
    padding: 16,
    borderColor: "#E9EBF4",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8.5,
  },
  infotitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  infodetail: {
    fontSize: 14,
    fontWeight: "500",
    color: "#575C71",
    lineHeight: 19.6,
    letterSpacing: -0.28,
  },
  speechBubble: {
    width: 250,
    position: "absolute",
    top: 115,
    left: 60,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9EBF4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 99,
  },

  speechBubbleTail: {
    position: "absolute",
    top: 25,
    right: -15,
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 20,
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "white",
    zIndex: 1,
  },
});
