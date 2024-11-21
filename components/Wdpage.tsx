import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { COLORS } from "@/constants/colors";
import { List, Divider } from "react-native-paper";
import BottomSheet from "react-native-simple-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Wdpage({ point, setGoToKey, setKey }) {
  const [money, setMoney] = useState("");
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [frontId, setFrontId] = useState("");
  const [backId, setBackId] = useState("");
  const [displayBackId, setDisplayBackId] = useState("");
  const [ck, setCk] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pannel, setPannel] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleId = (text) => {
    setBackId(text); // 실제 텍스트 저장

    // 첫 번째 글자 외의 나머지를 *로 처리
    if (text.length > 1) {
      const maskedText = text[0] + "*".repeat(text.length - 1);
      setDisplayBackId(maskedText);
    } else {
      setDisplayBackId(text); // 첫 글자만 있을 때는 그대로 표시
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>금액</Text>
        <TextInput
          value={money}
          onChangeText={(text) => setMoney(text)}
          placeholderTextColor="#B6BDC6"
          placeholder="금액을 입력해주세요."
          style={styles.input}
        />
        <Text style={{ color: "#8B94A8", fontSize: 10, fontWeight: "400" }}>
          출금 가능한 금액 : {Number(point).toLocaleString()}원 10원 단위 /
          2,000원 이상 가능
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>은행</Text>
        <List.Accordion
          style={{
            backgroundColor: "#2F323D",
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: "#575C71",
          }}
          titleStyle={{
            marginLeft: -12,
            fontSize: 13,
            fontWeight: "400",
            color: "#CED2E0",
          }}
          title={bank || "선택"}
          expanded={toggle}
          onPress={() => setToggle(!toggle)}
        >
          <List.Item
            title="국민은행"
            titleStyle={{ color: "#CED2E0", fontSize: 11 }}
            onPress={() => {
              setBank("국민은행");
              setToggle(false);
            }}
          />
          <List.Item
            title="케이뱅크"
            titleStyle={{ color: "#CED2E0", fontSize: 11 }}
            onPress={() => {
              setBank("케이뱅크");
              setToggle(false);
            }}
          />
          <List.Item
            title="카카오뱅크"
            titleStyle={{ color: "#CED2E0", fontSize: 11 }}
            onPress={() => {
              setBank("카카오뱅크");
              setToggle(false);
            }}
          />
          <List.Item
            title="토스뱅크"
            titleStyle={{ color: "#CED2E0", fontSize: 11 }}
            onPress={() => {
              setBank("토스뱅크");
              setToggle(false);
            }}
          />
        </List.Accordion>
        {toggle ? (
          <AntDesign
            name="up"
            size={16}
            color="#CED2E0"
            style={{ position: "absolute", right: 10, top: 38 }}
          />
        ) : (
          <AntDesign
            name="down"
            size={16}
            color="#CED2E0"
            style={{ position: "absolute", right: 10, bottom: 10 }}
          />
        )}
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>예금주</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#B6BDC6"
          placeholder="성함을 적어주세요."
          style={styles.input}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>계좌번호</Text>
        <TextInput
          value={account}
          maxLength={12}
          onChangeText={(text) => setAccount(text)}
          placeholderTextColor="#B6BDC6"
          placeholder="- 를 제외한 계좌번호를 적어주세요."
          style={styles.input}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>주민등록번호</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            value={frontId}
            onChangeText={(text) => setFrontId(text)}
            maxLength={6}
            placeholderTextColor="#B6BDC6"
            placeholder="주민등록번호 앞자리"
            style={[styles.input, { width: "48.5%" }]}
          />
          <TextInput
            value={displayBackId}
            onChangeText={handleId}
            maxLength={7}
            placeholderTextColor="#B6BDC6"
            placeholder="주민등록번호 뒷자리"
            style={[styles.input, { width: "48.5%" }]}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCk(!ck)}
        style={styles.ckBtn}
      >
        <AntDesign
          name="checksquare"
          size={18}
          color={ck ? COLORS.PURPLE : "#8B94A8"}
        />
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#8B94A8" }}>
          출금 정보 저장
        </Text>
      </TouchableOpacity>

      <View style={{ gap: 1, marginTop: 38.5 }}>
        <Text style={styles.bottomText}>
          출금 신청시 소득세법 144조에 따라 사업소득의 3.3%를 원천징수하여
          납부합니다.
        </Text>
        <Text style={styles.bottomText}>
          이를 위해 주민등록번호를 제공받으며, 세금 신고 후 지체없이 파기합니다.
        </Text>
        <Text style={styles.bottomText}>
          원천징수분을 제한 출금 금액은 신청 후 일주일 이내로 계좌로 입금됩니다.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setPannel(true)}
        disabled={!money || !bank || !name || !account || !frontId || !backId}
        activeOpacity={0.9}
        style={[
          styles.withdrawBtn,
          {
            backgroundColor:
              money && bank && name && account && frontId && backId
                ? COLORS.PURPLE
                : "#575C71",
          },
        ]}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
          출금 신청 하기
        </Text>
      </TouchableOpacity>

      {pannel && (
        <View style={{ width: "100%", paddingBottom: 15 }}>
          <BottomSheet sliderMaxHeight={600}>
            {confirm ? (
              <View style={{ alignItems: "center", marginBottom: 50 }}>
                <View style={styles.confirmCircle}>
                  <Feather name="check" size={36} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: "#232323",
                    marginTop: 20,
                  }}
                >
                  출금 신청 완료!
                </Text>
                <View style={{ marginTop: 20, alignItems: "center", gap: 2 }}>
                  <Text
                    style={{
                      color: "#B6BDC6",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    코인키 화면에서 출금 내역 확인이 가능합니다.
                  </Text>
                  <Text
                    style={{
                      color: "#B6BDC6",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    입금은 매주 화요일과 목요일에 진행됩니다.
                  </Text>
                  <Text
                    style={{
                      color: "#B6BDC6",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    (전날 신청된 건까지 / 공휴일일 경우 직전 영업일 진행)
                  </Text>
                </View>

                <View style={{ marginVertical: 64, gap: 17 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      신청 금액
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {Number(money).toLocaleString()}원
                    </Text>
                  </View>
                  <Divider />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      출금 예정 금액
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {Number(money).toLocaleString()}원
                    </Text>
                  </View>
                  <Divider />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      잔여 금액
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {Number(point - money).toLocaleString()}원
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={async () => {
                    setConfirm(false);
                    setPannel(false);
                    setGoToKey(false);
                    await AsyncStorage.setItem(
                      "coinkey",
                      String(point - money)
                    );
                    setKey(point - money);
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.withdrawBtn,
                    { backgroundColor: COLORS.PURPLE, width: "90%" },
                  ]}
                >
                  <Text
                    style={{ color: "white", fontSize: 14, fontWeight: "600" }}
                  >
                    닫기
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{ height: 500, alignItems: "center", marginTop: 10 }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  <Text style={{ color: COLORS.PURPLE, fontWeight: "700" }}>
                    {Number(money).toLocaleString()}
                  </Text>
                  원을 출금합니다.
                </Text>

                <View style={{ marginTop: 64, gap: 17 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {bank}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {name} | {account}
                    </Text>
                  </View>
                  <Divider />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      신청 금액
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {Number(money).toLocaleString()}원
                    </Text>
                  </View>
                  <Divider />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      사업소득세
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      0원
                    </Text>
                  </View>
                  <Divider />
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#575C71",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      출금 예정 금액
                    </Text>
                    <Text
                      style={{
                        color: COLORS.PURPLE,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {Number(money).toLocaleString()}원
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 60, marginBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "500",
                      color: "#8B94A8",
                    }}
                  >
                    월 33,330원을 초과해 출금 시 자동으로 세금 납부 후 출금되며
                    세후 예상 금액은
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "500",
                      color: "#8B94A8",
                    }}
                  >
                    실제 출금액과 다를 수 있습니다.{" "}
                    <Text style={{ fontWeight: "700" }}>자세히보기</Text>
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setConfirm(true)}
                  activeOpacity={0.9}
                  style={[
                    styles.withdrawBtn,
                    { backgroundColor: COLORS.PURPLE, width: "90%" },
                  ]}
                >
                  <Text
                    style={{ color: "white", fontSize: 14, fontWeight: "600" }}
                  >
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </BottomSheet>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F323D",
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
    gap: 17,
  },
  box: {
    width: "80%",
    gap: 7,
  },
  title: {
    color: "#CED2E0",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 13,
    fontWeight: "500",
    color: "#CED2E0",
    borderBottomWidth: 1,
    borderBottomColor: "#575C71",
  },
  ckBtn: {
    width: "80%",
    justifyContent: "flex-end",
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    color: "#575C71",
    fontSize: 9,
    fontWeight: "500",
  },
  withdrawBtn: {
    backgroundColor: "#575C71",
    borderRadius: 12,
    width: "80%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmCircle: {
    backgroundColor: "#C3C7D7",
    width: 80,
    height: 80,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
