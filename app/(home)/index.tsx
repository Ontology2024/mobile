import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Index() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/login");
  };

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
            <Image source={require("@/assets/images/onboarding1.png")} style={Style.image} />
          </View>
        </View>
        <View style={Style.info}>
          <Text style={Style.text}>
            메인 화면에서{"\n"}볼 수 있는 <Text style={Style.highlightText}>안전 구역</Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <Image source={require("@/assets/images/onboarding2.png")} style={Style.image} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={Style.footer} activeOpacity={0.8} onPress={navigateToLogin}>
        <Text style={Style.startText}>시작하기</Text>
      </TouchableOpacity>
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
    color: colors.purple,
  },
  image: {
    width: 350,
    height: 550,
  },
  info: {
    width: SCREEN_WIDTH,
  },
  footer: {
    backgroundColor: colors.purple,
    width: SCREEN_WIDTH,
    height: 100,
    alignItems: "center",
    shadowColor: colors.purple,
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
    backgroundColor: colors.purple,
  },
});