import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const logoImg = require("../assets/images/logo.png");
const kakaoLogoImg = require("../assets/images/kakao.png");
const eyeOpenImg = require("../assets/images/eye-open.png");
const eyeCloseImg = require("../assets/images/eye-closed.png");

export default function Login() {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [showPw, changeShowPw] = useState(false);

  const emailregex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const passwordregex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

  const ValidChk = (email, password) => {
    if (emailregex.test(email) === false || passwordregex.test(password) === false) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginLogoBox}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.safekey}>Safekey</Text>
        <Text style={styles.logoText}>오늘의 안전을 여는 열쇠</Text>
      </View>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>이메일 주소</Text>
          <TextInput
            onChangeText={(val) => changeEmail(val)}
            style={styles.inputBox}
            autoFocus
            placeholder="예) safekey@gmail.com"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>비밀번호</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={{ width: 260, marginRight: 18 }}
              onChangeText={(val) => changePassword(val)}
              secureTextEntry={showPw}
              placeholder="비밀번호를 입력해주세요"
            />
            <TouchableOpacity onPress={() => changeShowPw(!showPw)} activeOpacity={0.8}>
              <Image source={showPw ? eyeCloseImg : eyeOpenImg} style={styles.eyeImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ gap: 8, marginTop: 25 }}>
        <Link href="/home" asChild>
          <TouchableOpacity
            style={ValidChk(email, password) ? styles.loginBox : styles.unLoginBox}
            activeOpacity={0.8}
            disabled={!ValidChk(email, password)}
          >
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.kakaoBox} activeOpacity={0.8}>
          <Image source={kakaoLogoImg} style={styles.kakaoLogo} />
          <Text style={styles.kakaoText}>카카오로 로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBox}>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.bottomText}>이메일 가입</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>|</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.bottomText}>이메일 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>|</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.bottomText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginLogoBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginTop: -30,
    marginBottom: 40,
  },
  logo: {
    width: 67.5,
    height: 75,
  },
  safekey: {
    color: COLORS.PURPLE,
    fontSize: 36,
    textAlign: "center",
    marginBottom: -15,
    fontFamily: "BalooTammudu2-ExtraBold",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PURPLE,
  },
  inputContainer: {
    width: 328,
    marginBottom: 20,
  },
  inputTitle: {
    color: "#191454",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
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
  eyeImg: {
    width: 22,
    height: 17,
  },
  loginBox: {
    backgroundColor: COLORS.PURPLE,
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  unLoginBox: {
    backgroundColor: "#C5CCD7",
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  kakaoBox: {
    flexDirection: "row",
    backgroundColor: "#FEE500",
    borderColor: "#EFF0F6",
    borderWidth: 1,
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  kakaoText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
  kakaoLogo: {
    width: 21,
    height: 19,
  },
  bottomBox: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
  },
  bottomText: {
    color: "#b9c0cc",
  },
});
