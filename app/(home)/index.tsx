import { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const onboarding1Img = require("@/assets/images/onboarding1.png");
const onboarding2Img = require("@/assets/images/onboarding2.png");

export default function Index() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentPage(currentIndex);
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 120,
        alignItems: "center",
      }}
    >
      <View style={Style.indicatorContainer}>
        <View style={[Style.indicator, currentPage === 0 && Style.activeIndicator]} />
        <View style={[Style.indicator, currentPage === 1 && Style.activeIndicator]} />
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={Style.info}>
          <Text style={Style.text}>
            메인 화면에서{"\n"}볼 수 있는 <Text style={Style.highlightText}>안전 구역</Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <Image source={onboarding1Img} style={Style.image} />
          </View>
        </View>
        <View style={Style.info}>
          <Text style={Style.text}>
            메인 화면에서{"\n"}볼 수 있는 <Text style={Style.highlightText}>안전 구역</Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <Image source={onboarding2Img} style={Style.image} />
          </View>
        </View>
      </ScrollView>
      <Link href="/login" asChild>
        <TouchableOpacity style={Style.footer} activeOpacity={0.8}>
          <Text style={Style.startText}>시작하기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const Style = StyleSheet.create({
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
  info: {
    width: SCREEN_WIDTH,
  },
  footer: {
    backgroundColor: COLORS.PURPLE,
    width: SCREEN_WIDTH,
    height: 100,
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
