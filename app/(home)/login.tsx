import { View, Text, StyleSheet, Image, TextInput, Pressable, Keyboard, Alert, Linking } from "react-native";
import { Link, useNavigation } from "expo-router";
import { COLORS } from "@/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoImg = require("@/assets/images/logo.png");
const kakaoLogoImg = require("@/assets/images/kakao.png");
const eyeOpenImg = require("@/assets/images/eye-open.png");
const eyeCloseImg = require("@/assets/images/eye-closed.png");

export default function Login() {
  const navigation = useNavigation();
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [showPw, changeShowPw] = useState(false);

  const emailLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.log("로그인 실패: ", error.message);
        Alert.alert("로그인 실패", "잘못된 로그인 정보입니다.");
        return;
      }

      console.log("로그인 성공");
      AsyncStorage.setItem("email", email);
      navigation.navigate("main");
    } catch (err) {
      console.log("로그인 실패: ", err.message);
    }
  };

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) console.log("카카오 로그인 실패: ", error.message);
    else {
      console.log("카카오 로그인 성공: ", data);
      Linking.openURL(data.url);
      navigation.navigate("main");
    }
  };
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
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
            placeholderTextColor={"#a2a6ae"}
            keyboardType="email-address"
            autoCapitalize="none"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>비밀번호</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={{ width: 260, marginRight: 18 }}
              onChangeText={(val) => changePassword(val)}
              secureTextEntry={!showPw}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor={"#a2a6ae"}
              value={password}
            />
            <TouchableOpacity onPress={() => changeShowPw(!showPw)} activeOpacity={0.8}>
              <Image source={showPw ? eyeOpenImg : eyeCloseImg} style={styles.eyeImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ gap: 8, marginTop: 25 }}>
        <TouchableOpacity
          style={email && password ? styles.loginBox : styles.unLoginBox}
          activeOpacity={0.8}
          disabled={!(email && password)}
          onPress={emailLogin}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kakaoBox} activeOpacity={0.8} onPress={kakaoLogin}>
          <Image source={kakaoLogoImg} style={styles.kakaoLogo} />
          <Text style={styles.kakaoText}>카카오로 로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBox}>
        <Link href="/signup" asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.bottomText}>이메일 가입</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.bottomText}>|</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.bottomText}>이메일 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>|</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.bottomText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
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
