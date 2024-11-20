import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Text } from "./Text";
import { DangerInfo } from "./DangerInfo";
import { Link, router, useRouter } from "expo-router";

const fireImg = require("./fireStation.png");
const hospitalImg = require("./hospital.png");
const policeImg = require("./police.png");

interface BottomSheetModalProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  time: string;
  onPressStopGuide(): void;
}

export function CustomBottomSheetModal({
  bottomSheetModalRef,
  onPressStopGuide,
  time,
}: BottomSheetModalProps) {
  const [tab, setTab] = useState<"위험정보" | "안전시설">("위험정보");
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter style={{}} {...props} bottomInset={0}>
        <View style={styles.footerContainer}>
          <Link style={{ flex: 1 }} href={"/safe-call"} asChild>
            <TouchableOpacity style={styles.AICallButton}>
              <Text style={styles.footerText}>AI 안심전화 </Text>
              <FontAwesome6 name="headphones" size={20} />
            </TouchableOpacity>
          </Link>
          {time ? (
            <TouchableOpacity
              onPress={onPressStopGuide}
              style={styles.endButton}
            >
              <Text style={styles.footerText}>안내종료</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.menuButton}>
              <Ionicons name="menu" size={20} />
            </View>
          )}
        </View>
      </BottomSheetFooter>
    ),
    [time]
  );

  return (
    <BottomSheetModal
      footerComponent={renderFooter}
      style={styles.modalStyle}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      snapPoints={[180, "70%"]}
      ref={bottomSheetModalRef}
      handleComponent={() => (
        <View
          style={{
            flexDirection: "row",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: 4,
              width: 80,
              backgroundColor: "gray",
              borderRadius: 100,
            }}
          ></View>
        </View>
      )}
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DangerLevelCircleIcon dangerLevel={3} />
          <Text style={{ fontSize: 20, fontWeight: "700" }}>{time}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setTab("위험정보");
            }}
            style={[
              styles.tabButton,
              {
                borderBottomColor: tab === "안전시설" ? "#E9EBF4" : "black",
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={{ fontWeight: "600" }}>위험정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab("안전시설");
            }}
            style={[
              styles.tabButton,
              {
                borderBottomColor: tab === "위험정보" ? "#E9EBF4" : "black",
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={{ fontWeight: "600" }}>안전시설</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 66 }}>
          {tab == "위험정보" ? (
            <DangerInfo
              theif2024={4}
              theif2023={2}
              robbery2024={3}
              robbery2023={2}
            />
          ) : (
            <View
              style={{ paddingVertical: 24, paddingHorizontal: 20, gap: 16 }}
            >
              <CollapsibleComponent
                type={"경찰서"}
                data={[
                  {
                    name: "영통구방위지구대",
                    addr: "경기도 수원시 영통구 영통동 61-9",
                    longitude: "126.9407",
                    latitude: "37.5796",
                  },
                  {
                    name: "수원경찰서",
                    addr: "경기도 수원시 영통구 영통동 89-4",
                    longitude: "126.9407",
                    latitude: "37.5796",
                  },
                ]}
              />
              <CollapsibleComponent
                type={"병원"}
                data={[
                  {
                    name: "수원라인산부인과",
                    addr: "경기도 수원시 영통구 영통동 61-9",
                    longitude: "126.9407",
                    latitude: "37.5796",
                  },
                ]}
              />
              <TextBox
                color="#4876ff"
                title={"치안 유지 · 긴급 의료/화재 대응 가능"}
                content={`이 구역은 경찰서, 병원, 소방서와 같은 주요 안전시설이 고르게 분포되어 있습니다. 경찰서의 위치 덕분에 치안이 비교적 잘 유지되고 있으며, 병원과 소방서가 있어 긴급 의료 서비스나 화재 대응이 빠르게 이루어질 수 있습니다. 또한, 편의점이 다수 위치해 있어 언제든지 접근 가능한 안전한 장소를 제공하며, 야간에도 밝고 안전한 환경이 유지됩니다.`}
              />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const TextBox = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color: string;
}) => {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E9EBF4",
      }}
    >
      <Text style={{ color: color }}>
        <MaterialCommunityIcons
          name="star-four-points"
          size={16}
          color={color}
        />{" "}
        {title}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          color: "#575C71",
          lineHeight: 18,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

const CollapsibleComponent = ({
  type,
  data,
}: {
  type: "병원" | "소방서" | "경찰서";
  data: { name: string; addr: string; latitude?: string; longitude?: string }[];
}) => {
  const [state, setState] = useState<boolean>(true);
  const img =
    type === "병원" ? hospitalImg : type === "소방서" ? fireImg : policeImg;
  return (
    <View style={styles.ccontainer}>
      <View style={styles.collapsibleContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image source={img} style={{ width: 32, height: 32 }} />
          <Text style={{ fontSize: 16 }}>{type}</Text>
          <Text style={{ color: "#575C71", fontSize: 14 }}>
            {data.length}곳
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 4,
            transform: [{ rotate: state ? "0deg" : "180deg" }],
          }}
          onPress={() => setState((v) => !v)}
        >
          <Entypo name="chevron-thin-down" size={20} />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={state}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#F6F9FC", "#FFFFFF"]}
          style={{ paddingHorizontal: 16, paddingVertical: 4 }}
        >
          {data.map((v, i) => (
            <View
              key={i}
              style={{
                padding: 12,
                borderBottomWidth: i < data.length - 1 ? 1 : 0,
                borderBottomColor: "#E9EBF4",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {v.name}
                </Text>
                <View style={{}}>
                  <View style={styles.badge}>
                    <Text style={{ fontSize: 12, color: "#4876ff" }}>
                      길찾기
                    </Text>
                    <AntDesign
                      style={{ transform: [{ rotate: "90deg" }] }}
                      name="back"
                      size={16}
                      color={"#4876ff"}
                    />
                  </View>
                </View>
              </View>
              <Text style={{ marginTop: 4, color: "#8B94A8", fontSize: 12 }}>
                {v.addr}
              </Text>
            </View>
          ))}
        </LinearGradient>
      </Collapsible>
    </View>
  );
};

const DangerLevelCircleIcon = ({ dangerLevel }: { dangerLevel: number }) => {
  const level = dangerLevel - 1;
  const option = [
    {
      bigCircleBackgroundColor: "#4876ff",
      bigCircleBorderColor: "#dee2ff",
      text: "안전해요",
      smallestCircleBackgroundColor: "#ff556a",
      middleCircleBackgroundColor: "#8a94a7",
    },
    {
      bigCircleBackgroundColor: "#4876ff",
      bigCircleBorderColor: "#dee2ff",
      text: "안전해요",
      smallestCircleBackgroundColor: "#ff556a",
      middleCircleBackgroundColor: "#8a94a7",
    },
    {
      bigCircleBackgroundColor: "#8B94A8",
      bigCircleBorderColor: "#E9EBF4",
      text: "보통이에요",
      smallestCircleBackgroundColor: "#4876FF",
      middleCircleBackgroundColor: "#FF566A",
    },
    {
      bigCircleBackgroundColor: "#FF566A",
      bigCircleBorderColor: "#FFDFDF",
      text: "위험해요",
      smallestCircleBackgroundColor: "#4876FF",
      middleCircleBackgroundColor: "#8B94A8",
    },
    {
      bigCircleBackgroundColor: "#FF566A",
      bigCircleBorderColor: "#FFDFDF",
      text: "위험해요",
      smallestCircleBackgroundColor: "#4876FF",
      middleCircleBackgroundColor: "#8B94A8",
    },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 7.2,
            height: 7.2,
            borderRadius: 100,
            overflow: "hidden",
            left: 12,
            backgroundColor: option[level].smallestCircleBackgroundColor,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: 100,
            top: 7,
            backgroundColor: option[level].middleCircleBackgroundColor,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderWidth: 3,
            borderColor: option[level].bigCircleBorderColor,
            borderRadius: 100,
            right: -3,
            bottom: -3,
            backgroundColor: option[level].bigCircleBackgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{dangerLevel}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 22 }}>{option[level].text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    zIndex: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ededed",
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  AICallButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F2F3F8",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    textAlign: "center",
    fontWeight: "600",
  },
  menuButton: {
    borderWidth: 1,
    borderColor: "#CED2E0",
    padding: 12,
    borderRadius: 12,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    paddingVertical: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  collapsibleContainer: {
    backgroundColor: "white",
    elevation: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    backgroundColor: "#F3F6FF",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ccontainer: {
    borderWidth: 1,
    borderColor: "#E9EBF4",
    borderRadius: 16,
    overflow: "hidden",
  },
  endButton: {
    borderRadius: 12,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#CED2E0",
  },
});
