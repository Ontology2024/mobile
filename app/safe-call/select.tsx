import { AIConfigs } from "@/constants/AIConfigs";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Text } from "../map/components/Text";
import { Card, CardProps } from "./components/Card";
import { SafeCallHeader } from "./components/SafeCallHeader";

const purpleCircle = require("@/assets/images/purpleCircle.png");

/* TODO add button to go to safe-call/config */
export default function Select() {
  const { configs, setConfigs } = useContext(AIConfigs);
  const [currentIndex, setIndex] = useState(0);
  const [isFrontCard, setIsFrontCard] = useState(true);
  const { width } = useWindowDimensions();
  const data: CardProps[] = [
    {
      characterImg: require("./images/character1.png"),
      backgroundImg: require("./images/bg1.png"),
      backgroundFilpImg: require("./images/bbg1.png"),
      desc: `저랑 같이 걸으면\n어둠도 눈치 보고 물러날걸요!`,
      name: "나만의 세이피",
    },
    {
      characterImg: require("./images/character2.png"),
      backgroundImg: require("./images/bg2.png"),
      backgroundFilpImg: require("./images/bbg2.png"),
      desc: `한번 전화하면 나의 매력에서 \n헤어나올 수 없을 거예요~`,
      name: "해피해피 잔망루피",
    },
    {
      characterImg: require("./images/character3.png"),
      backgroundImg: require("./images/bg3.png"),
      backgroundFilpImg: require("./images/bbg3.png"),
      desc: `미니언즈는 인류보다 훨씬\n오래 전부터 지구 상에 존재했죠`,
      name: "노래하는 미니언즈",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeCallHeader />
      <View style={selectStyles.page}>
        <Carousel
          style={{ backgroundColor: "#FFFFFF" }}
          data={data}
          renderItem={({ item, index }) => (
            <Card
              backgroundImg={item.backgroundImg}
              backgroundFilpImg={item.backgroundFilpImg}
              characterImg={item.characterImg}
              name={item.name}
              desc={item.desc}
            />
          )}
          loop
          mode="parallax"
          width={width}
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 80,
          }}
          height={540}
          onSnapToItem={(index) => {
            setIndex(index);
            setIsFrontCard(true);
          }}
        />
        <Pagination
          current={currentIndex}
          length={configs.length}
          style={selectStyles.pagination}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          style={selectStyles.call}
          onPress={() =>
            router.navigate(
              `/safe-call/call?callee=${configs[currentIndex].name}`
            )
          }
        >
          <Text style={selectStyles.callText}>
            {configs[currentIndex].name}와 전화하기
          </Text>
          <Image source={callIcon} style={selectStyles.callIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const selectStyles = StyleSheet.create({
  page: {
    flex: 1,

    alignItems: "center",

    paddingTop: 40,
    paddingBottom: 23,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
  },
  hint: {
    fontWeight: "500",
    fontSize: 12,
    color: "#8B94A8",
    position: "relative",
  },
  pagination: {
    height: 100,
    gap: 4,
  },
  call: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,

    width: "90%",

    paddingVertical: 12,
  },
  callText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },
  callIcon: {
    flexShrink: 0,
    width: 20,
    height: 20,
    aspectRatio: 1,
  },
});

const callIcon = require("@/assets/images/call.png");

interface PaginationProps {
  current: number;
  length: number;
  style?: StyleProp<ViewStyle>;
}

function Pagination({ current, length, style }: PaginationProps) {
  return (
    <View style={[paginationStyles.container, style]}>
      {Array.from({ length }, (_, i) => (
        <View
          key={i}
          style={
            i === current ? paginationStyles.active : paginationStyles.inactive
          }
        />
      ))}
    </View>
  );
}

const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  active: {
    flexShrink: 0,
    width: 7,
    height: 7,

    borderRadius: 3.5,

    backgroundColor: "#686868",
  },
  inactive: {
    flexShrink: 0,
    width: 5,
    height: 5,

    borderRadius: 2.5,

    backgroundColor: "#C6C6C6",
  },
});
