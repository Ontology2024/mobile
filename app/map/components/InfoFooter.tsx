import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { MarkerData } from "..";
import { Text } from "./Text";

interface InfoFooterProps {
  markerData: MarkerData | undefined;
  onPressFindRoad(): void;
}

export function InfoFooter({ markerData, onPressFindRoad }: InfoFooterProps) {
  const modalRef = useRef<BottomSheetModal>(null);
  useEffect(() => {
    if (modalRef.current) {
      markerData ? modalRef.current.present() : modalRef.current.close();
    }
  }, [markerData]);
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter style={{}} {...props} bottomInset={0}>
        <View style={styles.footerContainer}>
          <Link href={"/safe-call"} asChild>
            <TouchableOpacity style={styles.AICallButton}>
              <Text style={styles.footerText}>AI 안심전화 </Text>
              <FontAwesome6 name="headphones" size={20} />
            </TouchableOpacity>
          </Link>
          <View style={styles.menuButton}>
            <Ionicons name="menu" size={20} />
          </View>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <BottomSheetModal
      footerComponent={renderFooter}
      style={styles.modalStyle}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      snapPoints={[180]}
      ref={modalRef}
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ padding: 20, paddingBottom: 84 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {markerData?.title || ""}
              </Text>
            </View>
            <View style={{}}>
              <TouchableOpacity onPress={onPressFindRoad} style={styles.badge}>
                <Text style={{ fontSize: 12, color: "#4876ff" }}>길찾기</Text>
                <AntDesign
                  style={{ transform: [{ rotate: "90deg" }] }}
                  name="back"
                  size={16}
                  color={"#4876ff"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: "#8b94ab", marginTop: 8 }}>
              {markerData?.address || ""}
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
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
});
