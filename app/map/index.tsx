import RecommendBox from "@/components/nav/RecommendBox";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { CustomBottomSheetModal } from "./components/CustomBottomSheetModal";
import { SearchBox } from "./components/SearchBox";
import { StartButton } from "./components/StartButton";
import * as location from "expo-location";
import { InfoFooter } from "./components/InfoFooter";

export type RoadData = {
  totalDistance: string;
  totalTime: string;
};

export type MarkerData = {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};
export default function NaverMap() {
  const webviewRef = React.useRef<WebView>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [recmdRoadData, setRecmdRoadData] = useState<RoadData | undefined>();
  const [safeRoadData, setSafeRoadData] = useState<RoadData | undefined>();
  const [shortRoadData, setShortRoadData] = useState<RoadData | undefined>();
  const [mapRoadState, setMapRoadState] = useState<boolean>(false);
  const [clickedMarker, setClickedMarker] = useState<MarkerData>();
  const [showRoadBox, setShowRoadBox] = useState<boolean>(false);

  const onMessageHandler = async (event: WebViewMessageEvent) => {
    try {
      const json = await JSON.parse(event.nativeEvent.data);
      // 길찾기 결과
      if (json.type === "searchRoad") {
        setRecmdRoadData(json.data.recmdRoad);
        setSafeRoadData(json.data.safeRoad);
        setShortRoadData(json.data.shortRoad);
        setShowRoadBox(true);
      }
      if (json.type === "markerClick") {
        setClickedMarker(json.data);
      }
    } catch (error) {
      if (event.nativeEvent.data === "mapLoadComplete") {
        setMapRoadState(true);
      }
      if (event.nativeEvent.data === "mapClicked") {
        setClickedMarker(undefined);
        if (!recmdRoadData) {
          bottomSheetModalRef.current?.present();
        }
      }
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setShowRoadBox(false);
  }, []);

  // 위치 추적
  useEffect(() => {
    const moveToMyLoc = async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        location
          .getCurrentPositionAsync({
            accuracy: location.Accuracy.Low,
          })
          .then(({ coords: { latitude, longitude } }) => {
            webviewRef.current?.injectJavaScript(
              `updateCenter({latitude : ${latitude}, longitude : ${longitude}})`
            );
          });
      }
    };
    if (mapRoadState) {
      moveToMyLoc();
    }
  }, [mapRoadState]);

  const [startDest, setStartDest] = useState<DestType>();
  const [endDest, setEndDest] = useState<DestType>();

  const onPressFindRoad = () => {
    if (bottomSheetModalRef.current && clickedMarker) {
      setEndDest({
        addr: clickedMarker.address || "",
        latitude: clickedMarker.latitude.toString(),
        longitude: clickedMarker.longitude.toString(),
        title: clickedMarker.title,
      });
      setShowRoadBox(false);
      setClickedMarker(undefined);
    }
    bottomSheetModalRef.current?.close();
  };

  const stopGuiding = () => {
    setEndDest(undefined);
    setShowRoadBox(false);
    setRecmdRoadData(undefined);
    bottomSheetModalRef.current?.present();
    webviewRef.current?.injectJavaScript(`clearPolyLines()`);
  };

  useEffect(() => {
    if (showRoadBox) {
      bottomSheetModalRef.current?.close();
    }
  }, [showRoadBox]);
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        {/* 위험도 */}
        <CustomBottomSheetModal
          onPressStopGuide={stopGuiding}
          bottomSheetModalRef={bottomSheetModalRef}
          time={
            recmdRoadData
              ? `${Math.round(Number(recmdRoadData.totalTime) / 60)}분 남음`
              : ""
          }
        />

        {/* 시설정보 */}
        <InfoFooter
          onPressFindRoad={onPressFindRoad}
          markerData={clickedMarker}
        />

        <SearchBox
          onPressCancel={stopGuiding}
          onRoadSearchCallback={() => bottomSheetModalRef.current?.close()}
          endDest={endDest}
          startDest={startDest}
          setEndDest={setEndDest}
          setStartDest={setStartDest}
          webviewRef={webviewRef}
          mapRoadState={mapRoadState}
        />

        <WebView
          style={{ flex: 1, zIndex: -1 }}
          ref={webviewRef}
          source={{ uri: "https://safekey-beryl.vercel.app/" }}
          // source={{ uri: "http://192.168.213.177:5173/" }}
          onMessage={onMessageHandler}
        />

        {showRoadBox && (
          <View style={styles.bottomContainer}>
            <RecommendBox
              recmdRoadData={recmdRoadData}
              shortRoadData={shortRoadData}
              safeRoadData={safeRoadData}
            />

            <StartButton onPress={handlePresentModalPress} />
          </View>
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },

  startButtonContainer: {
    backgroundColor: "white",
    elevation: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export type DestType = {
  title: string;
  addr: string;
  latitude: string;
  longitude: string;
};
