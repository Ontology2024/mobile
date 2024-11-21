import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import ConfettiCannon from "react-native-confetti-cannon"; //폭죽 효과 라이브러리(react-native-confetti-cannon)

const successImg = require("@/assets/images/success.png");

export default function Index() {
  return (
    <View style={Styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={{ fontSize: 28, fontWeight: "600" }}>Safekey님,</Text>
        <Text style={{ fontSize: 28, fontWeight: "600" }}>
          회원가입을 축하드립니다!
        </Text>
      </View>
      <View style={{ width: "90%", marginTop: 19 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>세이프키와 함께</Text>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          <Text style={Styles.highlightText}>오늘의 안전</Text>을 지켜요!
        </Text>
      </View>

      <View>
        <ConfettiCannon
          count={350}
          origin={{ x: 170, y: 0 }}
          fallSpeed={3000}
          fadeOut={true}
          colors={[COLORS.PURPLE, "#8E66FF", "#9DA6FF", "#FF69B4", "#6028FF"]}
        />
        <Image
          source={successImg}
          style={{ width: 350, height: 420, marginTop: 30, marginBottom: 35 }}
        />
      </View>

      <Link href="/login" asChild>
        <TouchableOpacity style={Styles.footer} activeOpacity={0.8}>
          <Text style={Styles.startText}>로그인하러 가기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
    alignItems: "center",
  },
  text: {
    fontSize: 23,
    fontWeight: "600",
    lineHeight: 30,
    textAlign: "center",
  },
  highlightText: {
    color: COLORS.PURPLE,
  },
  image: {
    width: 350,
    height: 550,
  },
  footer: {
    backgroundColor: COLORS.PURPLE,
    width: "100%",
    height: 120,
    alignItems: "center",
    shadowColor: COLORS.PURPLE,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -30,
    alignSelf: "center",
    alignItems: "center",
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 9,
    height: 9,
    borderRadius: 100,
    backgroundColor: COLORS.PURPLE,
  },
});
