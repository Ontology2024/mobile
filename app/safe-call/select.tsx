import Button from "@/components/Button";
import Switch from "@/components/Switch";
import { COLORS } from "@/constants/colors";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useReducer, useState } from "react";
import {
  View,
  ImageSourcePropType,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const purpleCircle = require("@/assets/images/purpleCircle.png");

interface AI {
  name: string;
  character: ImageSourcePropType;
  profile: string;
  bio: string;
  keywords: string[];
  friendly: number;
  energetic: number;
  tone: number;
  honorific: boolean;
  bgColors: string[];
  outline: string;
}

const DEFAULT_AI_CONFIG: AI[] = [
  {
    name: "한지우",
    character: require("@/assets/images/jiwoo.png"),
    profile: "10대 (여)",
    bio: "저랑 같이 걸으면\n어둠도 눈치 보고 물러날걸요!",
    keywords: ["재치있는", "활발한", "친근한"],
    friendly: 6,
    energetic: 6,
    tone: 5,
    honorific: false,
    bgColors: ["#FFF4F8", "#FFF", "#FFF"],
    outline: "#FFB2CB",
  },
  {
    name: "안재우",
    character: require("@/assets/images/sejoon.png"),
    profile: "30대 (남)",
    bio: "뉴스: 인공지능이 곧 코미디언도 대체할 수 있을 거래요!",
    keywords: ["똑똑한", "지식전달", "차분한"],
    friendly: 2,
    energetic: 2,
    tone: 2,
    honorific: false,
    bgColors: ["#F0F7FF", "#FFF", "#FFF"],
    outline: "#7495FF",
  },
  {
    name: "김한수",
    character: require("@/assets/images/hansoo.png"),
    profile: "50대 (남)",
    bio: "생활꿀팁 전문가\n인생경력자입니다~",
    keywords: ["유용한", "신기한", "친근한"],
    friendly: 2,
    energetic: 2,
    tone: 2,
    honorific: false,
    bgColors: ["#ECFFF9", "#FFF", "#FFF"],
    outline: "#42E277",
  },
];

/* TODO add button to go to safe-call/config */
export default function Select() {
  const [configs, setConfigs] = useReducer(
    (configs: AI[], update: Partial<AI> & { name: string }): AI[] =>
      configs.map(({ name, ...rest }) => ({ name, ...rest, ...(name === update.name && update) })),
    DEFAULT_AI_CONFIG
  );
  const [currentIndex, setIndex] = useState(0);
  const [isFrontCard, setIsFrontCard] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <View style={selectStyles.page}>
      <View style={{ alignItems: "center", gap: 50, marginBottom: -40, zIndex: 1 }}>
        <Text style={selectStyles.title}>전화를 할 AI를 선택하세요!</Text>
        <Text style={selectStyles.hint}>{!isFrontCard ? "" : "AI를 커스텀하려면 카드를 터치하세요!"}</Text>
      </View>
      <Carousel
        style={{ backgroundColor: "#FFFFFF" }}
        data={configs}
        renderItem={({ item: callee, index }) => (
          <AICard
            key={callee.name}
            callee={callee}
            onChange={(update) => setConfigs({ name: callee.name, ...update })}
            showFront={currentIndex !== index || isFrontCard}
            flip={() => setIsFrontCard(!isFrontCard)}
          />
        )}
        loop
        mode="parallax"
        width={width}
        height={540}
        onSnapToItem={(index) => {
          setIndex(index);
          setIsFrontCard(true);
        }}
      />
      <Pagination current={currentIndex} length={configs.length} style={selectStyles.pagination} />

      <TouchableOpacity activeOpacity={0.9} style={selectStyles.call} onPress={() => router.navigate("/safe-call/call")}>
        <Text style={selectStyles.callText}>{configs[currentIndex].name}와 전화하기</Text>
        <Image source={callIcon} style={selectStyles.callIcon} />
      </TouchableOpacity>
    </View>
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
        <View key={i} style={i === current ? paginationStyles.active : paginationStyles.inactive} />
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

interface AICardProps {
  callee: AI;
  onChange: (update: Partial<AI>) => void;
  showFront: boolean;
  flip: () => void;
  style?: StyleProp<ViewStyle>;
}

function AICard({ callee, onChange, showFront, flip, style }: AICardProps) {
  return (
    <Pressable onPress={flip} style={[aiCardStyle.container, style, { borderColor: callee.outline }]}>
      <LinearGradient
        colors={callee.bgColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.5499, 1]}
        style={aiCardStyle.gradientBg}
      />
      <Image style={showFront ? aiCardStyle.characterFront : aiCardStyle.characterBack} source={callee.character} />

      {showFront ? (
        <View style={aiCardStyle.bioBox}>
          <Text style={aiCardStyle.titleFront}>
            {callee.name}, {callee.profile}
          </Text>
          <Text style={aiCardStyle.bio}>{callee.bio}</Text>
          <View style={aiCardStyle.keywordList}>
            {callee.keywords.map((keyword) => (
              <Text key={keyword} style={aiCardStyle.hashtag}>
                #{keyword}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <>
          <Text style={aiCardStyle.titleBack}>
            {callee.name}, {callee.profile}
          </Text>
          <View style={aiCardStyle.form}>
            <View style={aiCardStyle.sliderBox}>
              <View style={aiCardStyle.sliderHeader}>
                <Text style={aiCardStyle.sliderText}>정중함</Text>
                <Text style={aiCardStyle.sliderText}>친근함</Text>
              </View>
              <View>
                <Slider
                  onValueChange={(friendly) => onChange({ friendly })}
                  step={1}
                  minimumValue={0}
                  maximumValue={7}
                  minimumTrackTintColor="#DDDFF1"
                  maximumTrackTintColor="#DDDFF1"
                  thumbImage={purpleCircle}
                  style={aiCardStyle.slider}
                />
                <View
                  style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -27 }}
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 100,
                        backgroundColor: "#DDDFF1",
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={aiCardStyle.sliderBox}>
              <View style={aiCardStyle.sliderHeader}>
                <Text style={aiCardStyle.sliderText}>차분한</Text>
                <Text style={aiCardStyle.sliderText}>밝은</Text>
              </View>
              <View>
                <Slider
                  onValueChange={(energetic) => onChange({ energetic })}
                  step={1}
                  minimumValue={0}
                  maximumValue={7}
                  minimumTrackTintColor="#DDDFF1"
                  maximumTrackTintColor="#DDDFF1"
                  thumbImage={purpleCircle}
                  style={aiCardStyle.slider}
                />
                <View
                  style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -27 }}
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 100,
                        backgroundColor: "#DDDFF1",
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={aiCardStyle.sliderBox}>
              <View style={aiCardStyle.sliderHeader}>
                <Text style={aiCardStyle.sliderText}>목소리 낮은</Text>
                <Text style={aiCardStyle.sliderText}>목소리 높은</Text>
              </View>
              <View>
                <Slider
                  onValueChange={(tone) => onChange({ tone })}
                  step={1}
                  minimumValue={0}
                  maximumValue={7}
                  minimumTrackTintColor="#DDDFF1"
                  maximumTrackTintColor="#DDDFF1"
                  thumbImage={purpleCircle}
                  style={aiCardStyle.slider}
                />
                <View
                  style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -27 }}
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 100,
                        backgroundColor: "#DDDFF1",
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={aiCardStyle.switchBox}>
            <Text style={aiCardStyle.switchText}>존댓말</Text>
            <Switch
              isOn={callee.honorific}
              onToggle={() => onChange({ honorific: !callee.honorific })}
              style={aiCardStyle.switch}
              handleStyle={aiCardStyle.switchHandle}
            />
          </View>
        </>
      )}
    </Pressable>
  );
}

const aiCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#FFB2CB",
  },
  gradientBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  characterFront: {
    flexShrink: 0,
    width: 206,
    height: 206,
    aspectRatio: 1,
    marginTop: 29,
  },
  characterBack: {
    flexShrink: 0,
    width: 150,
    height: 150,
    aspectRatio: 1,

    marginTop: 32,
  },
  titleFront: {
    fontWeight: "600",
    fontSize: 18,
    color: "#232323",
  },
  titleBack: {
    fontWeight: "600",
    fontSize: 16,
    color: "#232323",

    marginTop: 8,
  },
  bioBox: {
    flex: 1,

    alignItems: "center",
    gap: 10,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 20,
    paddingVertical: 20,

    borderRadius: 16,

    marginTop: 16,
    marginHorizontal: 25,
    marginBottom: 24,

    shadowRadius: 12,
    shadowColor: "#F3F6F9",
  },
  bio: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "#575C71",

    marginHorizontal: 3.5,
  },
  keywordList: {
    flexDirection: "row",
    gap: 8,
  },
  hashtag: {
    flex: 1,

    fontSize: 12,
    fontWeight: "500",
    color: "#8B94A8",
    textAlign: "center",

    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,

    backgroundColor: "#F8F9FE",
  },
  form: {
    width: "80%",
    height: 220,
    backgroundColor: "white",
    borderRadius: 20,

    gap: 8,
    alignItems: "stretch",

    paddingVertical: 8,

    shadowColor: "#a8aaad",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    marginTop: 26,
  },
  sliderBox: {
    flex: 1,

    justifyContent: "space-between",

    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 7,
  },
  sliderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  slider: {
    flexShrink: 0,
    flexBasis: "100%",
    zIndex: 1,
    height: 11,
  },
  switchBox: {
    marginTop: 30,
    marginRight: 30,

    alignSelf: "stretch",

    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    alignItems: "center",
  },
  switchText: {
    fontWeight: "400",
    fontSize: 14,
  },
  switch: {
    width: 45,
    height: 30,

    borderRadius: 60,
  },
  switchHandle: {
    width: 25,
    height: 26,

    borderRadius: 99,
  },
});
