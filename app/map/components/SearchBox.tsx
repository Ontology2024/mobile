import { COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import { SearchModal } from "./SearchModal";
import { Text } from "./Text";
import * as location from "expo-location";
import { DestType } from "..";

interface SearchBoxProps {
  webviewRef: React.RefObject<WebView>;
  mapRoadState: boolean;
  startDest: DestType | undefined;
  endDest: DestType | undefined;
  setStartDest(value: DestType): void;
  setEndDest(value: DestType): void;
  onRoadSearchCallback();
  onPressCancel();
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function SearchBox({
  webviewRef,
  mapRoadState,
  endDest,
  setEndDest,
  setStartDest,
  startDest,
  onRoadSearchCallback,
  onPressCancel,
}: SearchBoxProps) {
  const insets = useSafeAreaInsets();

  const [startModalOpen, setStartModalOpen] = useState<boolean>(false);
  const [endModalOpen, setEndModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mapRoadState) {
      let subscription: location.LocationSubscription | null = null;
      (async () => {
        const { granted } = await location.requestForegroundPermissionsAsync();

        if (granted) {
          subscription = await location.watchPositionAsync(
            {
              accuracy: location.Accuracy.Low, // 높은 정확도
              distanceInterval: 20,
            },
            ({ coords: { latitude, longitude } }) => {
              if (!startDest) {
                location
                  .reverseGeocodeAsync({ latitude, longitude })
                  .then((value) => {
                    if (value.length) {
                      const { city, district, street, name } = value[0];
                      setStartDest({
                        addr: `${city} ${district} ${street} ${name}`,
                        latitude: latitude.toString(),
                        longitude: longitude.toString(),
                        title: `${city} ${district} ${street} ${name}`,
                      });
                    }
                  });
                // setStartDest()
              }
              if (webviewRef.current) {
                webviewRef.current.injectJavaScript(
                  `updateLocation({latitude : ${latitude}, longitude : ${longitude}})`
                );
              }
            }
          );
        }
      })();

      return () => subscription?.remove();
    }
  }, [mapRoadState]);

  useEffect(() => {
    if (startDest && endDest) {
      onRoadSearchCallback();
      if (!webviewRef.current) {
        throw new Error("no webviewRef");
      }
      const data = {
        type: "direction5",
        data: {
          startDest: startDest,
          endDest: endDest,
        },
      };
      webviewRef.current.postMessage(JSON.stringify(data));
    }
  }, [startDest, endDest]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.innerContainer, { paddingTop: 10 }]}>
        <View style={styles.shadowBox}>
          <View style={styles.searchButton}>
            <TouchableOpacity onPress={onPressCancel}>
              <AntDesign name="close" size={18} color={COLORS.PURPLE} />
            </TouchableOpacity>
          </View>

          <View style={styles.boxInner}>
            <View style={styles.dashedLine} />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="circle" size={10} color={COLORS.PURPLE} />
              </View>
              <View style={styles.textInput}>
                <Text style={!startDest ? { color: "#B4BBC9" } : {}}>
                  {startDest?.addr || "출발지를 입력해주세요"}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="location-pin"
                  size={20}
                  color={COLORS.PURPLE}
                />
              </View>
              <TouchableOpacity
                onPress={() => setEndModalOpen(true)}
                style={styles.textInput}
              >
                <Text style={!endDest ? { color: "#B4BBC9" } : {}}>
                  {endDest?.addr || "도착지를 입력해주세요"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.badgeContainer}>
              <TouchableOpacity
                onPress={() =>
                  setEndDest({
                    addr: "매영로 421-10",
                    latitude: "37.2493081",
                    longitude: "127.0777909",
                    title: "나의집",
                  })
                }
              >
                <Text style={styles.badgeText}>나의집</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setEndDest({
                    addr: "매영로 421-10",
                    latitude: "37.2493081",
                    longitude: "127.0777909",
                    title: "회사",
                  })
                }
              >
                <Text style={styles.badgeText}>회사</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setEndDest({
                    addr: "경희대학교 국제캠퍼스",
                    latitude: "37.24291020655134",
                    longitude: "127.08118995506915",
                    title: "학교",
                  })
                }
              >
                <Text style={styles.badgeText}>학교</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <SearchModal
        key={"startModal"}
        modalVisible={startModalOpen}
        // setModalVisible={setStartModalOpen}
        setModalVisible={() => {}}
        setDest={setStartDest}
        dest={startDest}
      />

      <SearchModal
        key={"endModal"}
        modalVisible={endModalOpen}
        setModalVisible={setEndModalOpen}
        setDest={setEndDest}
        dest={endDest}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: SCREEN_WIDTH,
    zIndex: 1,
  },
  innerContainer: {
    padding: 20,
  },
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10, // Android용
  },
  boxInner: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    width: 300,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
  },
  badgeText: {
    fontSize: 12,
    color: "#575C71",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "#F8F9FE",
    borderRadius: 8,
  },
  badgeContainer: {
    paddingLeft: 28,
    marginTop: 6,
    flexDirection: "row",
    gap: 8,
  },
  dashedLine: {
    height: 30,
    position: "absolute",
    borderWidth: 0.5,
    borderColor: COLORS.PURPLE,
    borderStyle: "dashed",
    left: 25.5,
    top: 42,
  },
  searchButton: {
    borderRadius: 10,
    backgroundColor: "#F4F0FF",
    padding: 6,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    transform: [{ rotateY: "180deg" }],
  },
});
