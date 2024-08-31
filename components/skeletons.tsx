import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

export default function Skeletons() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255, 255, 255)", "rgb(227, 227, 227)"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundAnimation, { backgroundColor }]} />
      <View style={styles.skeletontop}>
        <View style={styles.topBox1}>
          <Image source={require("@/assets/images/skeletonkey.png")} style={{ width: 20, height: 30 }} />
        </View>
        <View style={styles.topBox2}>
          <View style={styles.selection} />
          <View style={styles.selection} />
          <View style={styles.selection} />
          <View style={styles.selection} />
        </View>
      </View>
      <View style={styles.skeletonfooter}>
        <View style={styles.footerBox1} />
        <View style={styles.footerBox2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  backgroundAnimation: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -100,
  },
  skeletontop: {
    width: "100%",
    height: 60,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBox1: {
    width: 100,
    backgroundColor: "#c7c7c7",
    justifyContent: "center",
    paddingLeft: 12,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  topBox2: {
    width: 252,
    backgroundColor: "#c7c7c7",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  selection: {
    width: "15%",
    height: "15%",
    backgroundColor: "#d9d9d9",
  },
  skeletonfooter: {
    width: "100%",
    height: 150,
    backgroundColor: "#c7c7c7",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#959595",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  footerBox1: {
    width: 279,
    height: 46,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
  },
  footerBox2: {
    width: 46,
    height: 46,
    marginLeft: 10,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
  },
});
