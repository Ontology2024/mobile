import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/app/map/components/Text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Flip } from "./Flip";
import { Fontisto } from "@expo/vector-icons";

export interface CardProps {
  backgroundImg: ImageSourcePropType;
  backgroundFilpImg: ImageSourcePropType;
  characterImg: ImageSourcePropType;
  name: string;
  desc: string;
}

export function Card({
  backgroundImg,
  desc,
  name,
  backgroundFilpImg,
  characterImg,
}: CardProps) {
  const isFlipped = useSharedValue(false);
  const width = Dimensions.get("window").width;
  const bigImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isFlipped.value ? 0.5 : 1, {
            duration: isFlipped.value ? 500 : 300,
          }),
        },
      ],
    };
  });
  return (
    <Flip
      isFlipped={isFlipped}
      cardStyle={{}}
      RegularContent={
        <ImageBackground resizeMode="contain" source={backgroundImg}>
          <View style={[styles.container, { width: width }]}>
            <Animated.View style={[bigImageStyle, { flex: 1 }]}>
              <Image
                style={[styles.image]}
                resizeMode="contain"
                source={characterImg}
              />
            </Animated.View>
            <View style={styles.frontTextContainer}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.desc}>{desc}</Text>
              </View>

              <TouchableOpacity
                style={styles.filpButton}
                onPress={() => (isFlipped.value = !isFlipped.value)}
              >
                <Fontisto name="spinner-refresh" color={"white"} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      }
      FlippedContent={
        <ImageBackground resizeMode="contain" source={backgroundFilpImg}>
          <View style={[styles.container, { width: width }]}>
            <Image
              style={styles.smallImage}
              resizeMode="contain"
              source={characterImg}
            />

            <View
              style={{ flex: 1, flexGrow: 1, transform: [{ translateY: -50 }] }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "600",
                  textAlign: "center",
                }}
              >
                {name}
              </Text>
              <View style={[styles.backContainer, { width: width }]}>
                <View style={styles.sliderContainer}>
                  <SliderItem
                    step={6}
                    leftText={"정중한"}
                    rightText={"친근한"}
                  />
                  <SliderItem step={6} leftText={"차분한"} rightText={"밝은"} />
                  <SliderItem
                    step={4}
                    leftText={"목소리 낮은"}
                    rightText={"목소리 높은"}
                  />
                </View>
                <View style={{ alignItems: "center", paddingTop: 20 }}>
                  <TouchableOpacity
                    style={styles.filpButton}
                    onPress={() => (isFlipped.value = !isFlipped.value)}
                  >
                    <Fontisto
                      name="spinner-refresh"
                      color={"white"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      }
    />
  );
}

const SliderItem = ({
  leftText,
  rightText,
  step = 6,
}: {
  leftText: string;
  rightText: string;
  step: number;
}) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white" }}>{leftText}</Text>
        <Text style={{ color: "white" }}>{rightText}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 12,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 1,
            backgroundColor: "rgba(136, 126, 243, 1)",
          }}
        ></View>
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <View
              key={index}
              style={{
                width: step == index ? 12 : 4,
                height: step == index ? 12 : 4,
                borderWidth: step == index ? 2 : 0,
                borderColor: "rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(221, 223, 241, 1)",
                borderRadius: 100,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1 / 1.45,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backContainer: {
    flex: 1,
    padding: 24,
    marginTop: 24,
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 300,
    transform: [{ translateY: -100 }],
  },
  smallImage: {
    width: 120,
    height: 180,
    transform: [{ translateY: -60 }],
  },
  frontTextContainer: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
  name: { fontSize: 32, color: "white", fontWeight: "600" },
  desc: {
    color: "white",
    marginTop: 16,
    lineHeight: 26,
    fontSize: 18,
    textAlign: "center",
  },
  filpButton: {
    width: 42,
    height: 42,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  sliderContainer: {
    flexGrow: 1,
    backgroundColor: "rgba(221, 223, 241, 0.2)",
    borderRadius: 16,
    padding: 24,
    gap: 28,
  },
});
