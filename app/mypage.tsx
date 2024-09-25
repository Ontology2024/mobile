import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

const PinkCharacter = require("@/assets/images/character_pink.png");
const coinkeyImg = require("@/assets/images/coinkey.png");
const bellImg = require("@/assets/images/bell.png");
const collectMsgImg = require("@/assets/images/collectMsg.png");
const contactImg = require("@/assets/images/contact.png");

const nickname = "김아람";
const coinN = 200;
const canBuyN = 3;

export default function signup() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/main" asChild>
          <TouchableOpacity style={styles.headerLeft} activeOpacity={0.6}>
            <EvilIcons name="chevron-left" size={45} color="black" />
            <Text style={styles.headerText}>안전 지도</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/editmypage" asChild>
          <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 30 }}>
            <Octicons name="pencil" size={22} color="black" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: "row" }}>
            <View style={styles.characterBox}>
              <Image source={PinkCharacter} style={styles.character} />
            </View>
            <View style={styles.pencilBox}>
              <Octicons name="pencil" size={13} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.nick}>{nickname}</Text>
        </View>

        <View style={{ width: "80%", marginVertical: 24, alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 15 }}>
            <View style={styles.coinkeyBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={coinkeyImg} style={{ width: 12, height: 20 }} />
                <Text style={{ fontSize: 16, color: "white", marginLeft: 10 }}>코인키</Text>
              </View>
              <Text style={{ fontSize: 16, color: "white" }}>
                <Text style={{ fontWeight: "600" }}>{coinN}</Text> 개
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.purchaseHistoryBox}>
              <Text style={{ color: COLORS.PURPLE, fontSize: 16, fontWeight: "600" }}>구매 내역</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.purchaseGuideBox}>
            <View style={styles.purchaseGuideTriangle} />
            <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
              <Image source={bellImg} style={{ width: 12, height: 14 }} />
              <Text style={{ fontSize: 12 }}>
                지금 코인키로 <Text style={{ color: COLORS.PURPLE, fontWeight: "600" }}>{canBuyN}</Text> 개의 품목을 구매할 수 있어요!
              </Text>
            </View>
          </View>
        </View>

        {/* 안전 설정 */}
        <View style={{ width: "80%", marginBottom: 24, alignItems: "center" }}>
          <Text style={styles.optionTitle}>안전 설정</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="hearto" size={20} color="black" />
                <Text style={styles.optionText}>자주 가는 장소 설정</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
            <View style={styles.underLine} />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="message1" size={20} color="black" />
                <Text style={styles.optionText}>세이프워드 설정</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 기본 설정 */}
        <View style={{ width: "80%", marginBottom: 24, alignItems: "center" }}>
          <Text style={styles.optionTitle}>기본 설정</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="notifications-outline" size={20} color="black" />
                <Text style={styles.optionText}>알림 설정</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
            <View style={styles.underLine} />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={collectMsgImg} style={{ width: 18, height: 18 }} />
                <Text style={styles.optionText}>알림 모아보기</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 마켓 */}
        <View style={{ width: "80%", marginBottom: 24, alignItems: "center" }}>
          <Text style={styles.optionTitle}>마켓</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="creditcard" size={20} color="black" />
                <Text style={styles.optionText}>구매 내역</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 더 많은 정보 및 지원 */}
        <View style={{ width: "80%", marginBottom: 65, alignItems: "center" }}>
          <Text style={styles.optionTitle}>더 많은 정보 및 지원</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="text-box-check-outline" size={20} color="black" />
                <Text style={styles.optionText}>개인정보 처리방침</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
            <View style={styles.underLine} />
            <TouchableOpacity activeOpacity={0.8} style={styles.optionBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="file1" size={20} color="black" />
                <Text style={styles.optionText}>이용 약관</Text>
              </View>
              <EvilIcons name="chevron-right" size={36} color="black" />
            </TouchableOpacity>
            <View style={styles.underLine} />
            <View style={{ gap: 4 }}>
              <Text style={{ color: "#767985", fontSize: 12, fontWeight: "500" }}>잘못된 정보나 개선사항이 있으신가요?</Text>
              <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Image source={contactImg} style={{ width: 15, height: 15 }} />
                <Text style={{ color: COLORS.PURPLE, fontSize: 16, fontWeight: "500" }}>문의 및 건의하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
  },
  characterBox: {
    width: 76,
    height: 76,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EFF0F6",
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 5,
    marginTop: 30,
  },
  character: {
    width: 85,
    height: 85,
  },
  pencilBox: {
    backgroundColor: COLORS.PURPLE,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    top: 85,
    right: 0,
  },
  nick: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  coinkeyBox: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.PURPLE,
    padding: 16,
    borderRadius: 12,
  },
  purchaseHistoryBox: {
    width: "30%",
    borderColor: COLORS.PURPLE,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
  },
  purchaseGuideBox: {
    width: "113%",
    backgroundColor: "#F3F0FC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: "relative",
  },
  purchaseGuideTriangle: {
    position: "absolute",
    top: -10,
    left: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 10,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#F3F0FC",
  },
  optionTitle: {
    color: "#767985",
    fontSize: 14,
    width: "113%",
    textAlign: "left",
    marginBottom: 8,
  },
  optionContainer: {
    width: "113%",
    backgroundColor: "#F4F6F9",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  underLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E7E7E7",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 6,
  },
});
