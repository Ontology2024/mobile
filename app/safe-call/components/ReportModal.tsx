import { Text } from "@/app/map/components/Text";
import Button from "@/components/Button";
import { COLORS } from "@/constants/colors";
import { Feather, Ionicons } from "@expo/vector-icons";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, RefObject, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ReportModalProps {
  onPressClose: () => void;
}

export const ReportModal = forwardRef<BottomSheetModal, ReportModalProps>(
  ({ onPressClose }, ref) => {
    const [reportSuccess, setReportSuccess] = useState<boolean>(false);
    const [smsReport, setSmsReport] = useState<boolean>(false);
    const [state1, setState1] = useState<boolean[]>([
      false,
      false,
      false,
      false,
      false,
    ]);
    const [state2, setState2] = useState<number[]>([0, 0]);

    const ReportSuccess = () => {
      return (
        <View>
          <View style={{ paddingTop: 40 }}>
            <Text
              style={{ color: "white", textAlign: "center", fontSize: 22 }}
            >{`녹음중...\n5초 후 신고됩니다`}</Text>
            <Text
              style={{
                color: "#8a94a7",
                textAlign: "center",
                fontSize: 14,
                marginTop: 12,
              }}
            >
              {`112 종합상황실에 인적사항, 위치정보,\n녹취정보를 자동으로전송합니다.`}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 32,
            }}
          >
            <Image
              source={require("./Logo.png")}
              style={{ width: 140, height: 140 }}
            ></Image>
          </View>
          <View style={{ marginTop: 32, paddingBottom: 8 }}>
            <Button
              style={{
                borderWidth: 1,
                borderColor: "#855aff",
                backgroundColor: "rgba(134, 91, 255, 0.2)",
              }}
              onPress={() => {
                setReportSuccess(false);
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                신고 취소
              </Text>
            </Button>
          </View>
        </View>
      );
    };

    const SmsReport = () => {
      return (
        <View style={{ paddingBottom: 80, alignItems: "center", gap: 32 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
            문자신고
          </Text>
          <View style={{ gap: 32, width: "100%" }}>
            <View>
              <Text>
                <Text style={{ fontSize: 14, color: "#ced1df" }}>
                  현재 상황을 선택해주세요
                </Text>
                <Text style={{ color: "#ff4f37" }}>*</Text>
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {[
                  "위협을 당했어요",
                  "누가 쫓아와요",
                  "폭행을 당했어요",
                  "성폭행을 당했어요",
                  "도둑질을 당했어요",
                ].map((text, index) => (
                  <ReportButton
                    state={state1[index]}
                    onPress={() =>
                      setState1((v) => {
                        const arr = [...v];
                        arr[index] = !arr[index];
                        return arr;
                      })
                    }
                    key={text}
                    text={text}
                  />
                ))}
              </View>
            </View>

            <View>
              <Text>
                <Text style={{ fontSize: 14, color: "#ced1df" }}>
                  긴급출동을 희망하시나요?
                </Text>
                <Text style={{ color: "#ff4f37" }}>*</Text>
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {["출동해주세요", "출동안해도 돼요"].map((text, index) => (
                  <ReportButton
                    onPress={() => {
                      index == 1 ? setState2([0, 1]) : setState2([1, 0]);
                    }}
                    state={state2[index] === 1}
                    key={text}
                    text={text}
                  />
                ))}
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 14, color: "#ced1df" }}>
                신고자 이름과 전화번호를 확인해주세요
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#8a94a7" }}>이름</Text>
                <TextInput
                  placeholder=""
                  style={{
                    color: "white",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    width: 300,
                    backgroundColor: "#24242c",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#8a94a7" }}>전화번호</Text>
                <TextInput
                  placeholder=""
                  style={{
                    color: "white",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    width: 300,
                    backgroundColor: "#24242c",
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              paddingVertical: 12,
              width: "100%",
            }}
          >
            <Button
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  state1.every((v) => !v) || state2.every((v) => v === 0)
                    ? "#24242c"
                    : COLORS.PURPLE,
              }}
              onPress={() => {
                if (state1.every((v) => !v) || state2.every((v) => v === 0)) {
                  Alert.alert(`현재상황과 긴급출동여부를 선택해주세요`);
                  return;
                }
                setReportSuccess(true);
              }}
            >
              <Text style={{ color: "white" }}>신고하기</Text>
            </Button>
          </View>
        </View>
      );
    };

    // const ref = useRef<BottomSheetModal>(null);

    const [success, setSuccess] = useState<boolean>(false);
    useEffect(() => {
      if (reportSuccess) {
        setTimeout(() => {
          setSuccess(true);
        }, 5000);
      }
    }, [reportSuccess]);
    return (
      <BottomSheetModal
        backgroundStyle={{ backgroundColor: "#1c1b21" }}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        maxDynamicContentSize={Dimensions.get("screen").height * 0.8}
        snapPoints={[
          success ? "40%" : reportSuccess ? "60%" : smsReport ? "80%" : "60%",
        ]}
        ref={ref}
        enableContentPanningGesture={false}
      >
        <View style={styles.contentContainer}>
          {success ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={onPressClose}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                신고가 완료되었습니다.
              </Text>
              <Text
                style={{ color: "#8a94a7", textAlign: "center", marginTop: 12 }}
              >
                {`곧 경찰이 출동하니 안전이 확보될 때까지\n침착하게 기다려 주세요`}
              </Text>
              <Image
                style={{ width: 100, height: 100, marginTop: 32 }}
                source={require("./check.png")}
              />
            </View>
          ) : reportSuccess ? (
            <ReportSuccess />
          ) : (
            <View style={{ paddingBottom: 40, alignItems: "center", gap: 32 }}>
              {smsReport ? (
                <SmsReport />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={onPressClose}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <Ionicons name="close" size={24} color="white" />
                  </TouchableOpacity>
                  <View>
                    <Text style={{ color: "#8a94a7", textAlign: "center" }}>
                      세이프워드 신호가 감지되었습니다.
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        textAlign: "center",
                        marginTop: 12,
                      }}
                    >
                      경찰서 신고가 필요하신가요?
                    </Text>
                  </View>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("./warning.png")}
                  />
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <TouchableOpacity
                      onPress={() => setSmsReport(true)}
                      style={{ borderRadius: 16, flex: 1, overflow: "hidden" }}
                    >
                      <View
                        style={{
                          paddingVertical: 20,
                          alignItems: "center",
                          backgroundColor: "#6028ff",
                        }}
                      >
                        <Feather name="mail" color={"white"} size={28} />
                        <Text
                          style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "white",
                            marginTop: 8,
                          }}
                        >
                          문자하기
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#24232b",
                          paddingVertical: 16,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#8a94a7" }}>
                          수원경찰서
                        </Text>
                        <Text style={{ color: "#8a94a7", fontSize: 14 }}>
                          031-321-1234
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{ borderRadius: 16, flex: 1, overflow: "hidden" }}
                    >
                      <View
                        style={{
                          paddingVertical: 20,
                          alignItems: "center",
                          backgroundColor: "#ff4f37",
                        }}
                      >
                        <Feather name="phone-call" color={"white"} size={28} />
                        <Text
                          style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "white",
                            marginTop: 8,
                          }}
                        >
                          전화하기
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#24232b",
                          paddingVertical: 16,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#8a94a7" }}>
                          수원경찰서
                        </Text>
                        <Text style={{ color: "#8a94a7", fontSize: 14 }}>
                          031-321-1234
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </BottomSheetModal>
    );
  }
);

const ReportButton = ({
  text,
  state,
  onPress,
}: {
  text: string;
  state: boolean;
  onPress(): void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: state ? "rgba(134, 91, 255, 0.2)" : "transparent",
        borderColor: state ? "#855aff" : "#8a94a7",
      }}
    >
      <Text style={{ color: state ? "white" : "#8a94a7" }}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#1c1b21",
  },
});
