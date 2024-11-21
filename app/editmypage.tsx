import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";

const PinkCharacter = require("@/assets/images/character_pink.png");
const naverImg = require("@/assets/images/naver.png");

const _nickname = "김아람";
const _birth = "2001-12-30";
const _number = "010-1234-5678";
const _social = "kimaram@naver.com";

export default function editmypage() {
  const [nickname, changeNickname] = useState(_nickname);
  const [birth, changeBirth] = useState(_birth);
  const [number, changeNumber] = useState(_number);
  const [social, changeSocial] = useState(_social);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/mypage" asChild>
          <TouchableOpacity style={styles.headerLeft} activeOpacity={0.6}>
            <EvilIcons name="chevron-left" size={45} color="black" />
            <Text style={styles.headerText}>내 정보 관리</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: "row" }}>
          <View style={styles.characterBox}>
            <Image source={PinkCharacter} style={styles.character} />
          </View>
          <View style={styles.pencilBox}>
            <Octicons name="pencil" size={13} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24, gap: 24 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>이름</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={nickname}
            placeholderTextColor="#8D94A3"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>생년월일</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={birth}
            placeholderTextColor="#8D94A3"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>전화번호</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={number}
            placeholderTextColor="#8D94A3"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>연동된 소셜 계정</Text>
          <View
            style={[
              styles.inputBox,
              { justifyContent: "space-between", paddingVertical: 9.5 },
            ]}
          >
            <TextInput
              placeholder={social}
              placeholderTextColor="#8D94A3"
              editable={false}
              selectTextOnFocus={false}
            />
            <Image source={naverImg} style={styles.socialImg} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
          }}
        >
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.smallText}>로그아웃</Text>
          </TouchableOpacity>
          <View
            style={{ height: "100%", width: 1, backgroundColor: "#C5CCD7" }}
          />
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.smallText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.footerContainer}
        onPress={() => router.navigate("/login")}
      >
        <Text style={styles.footerText}>다른 계정 로그인으로 정보 변경</Text>
      </TouchableOpacity>
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
  inputContainer: {
    width: 350,
  },
  inputTitle: {
    color: "#767985",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },
  smallText: {
    color: "#767985",
    fontSize: 13,
    fontWeight: "600",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 12,
    borderColor: "#DADFE5",
    borderWidth: 1,
  },
  footerContainer: {
    width: 350,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C5CCD7",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 70,
    position: "absolute",
    bottom: 50,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  socialImg: {
    width: 24,
    height: 24,
    position: "relative",
  },
});
