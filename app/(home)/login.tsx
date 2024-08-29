import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("../main");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginLogoBox}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.safekey}>Safekey</Text>
        <Text style={styles.logoText}>오늘의 안전을 여는 열쇠</Text>
      </View>
      <View style={{ gap: 8 }}>
        <TouchableOpacity style={styles.signupBox} activeOpacity={0.8} onPress={navigateToHome}>
          <Text style={styles.signupText}>가입하기</Text>
        </TouchableOpacity>
        <View style={styles.otherSignupBox}>
          <Image source={require("@/assets/images/appleLogo.png")} style={styles.signupLogo} />
          <Text style={styles.otherSignupText}>애플 아이디로 로그인</Text>
        </View>
        <View style={styles.otherSignupBox}>
          <Image source={require("@/assets/images/googleLogo.png")} style={styles.signupLogo} />
          <Text style={styles.otherSignupText}>구글로 로그인</Text>
        </View>
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
    height: 200,
    marginTop: 100,
    marginBottom: 160,
  },
  logo: {
    width: 67.5,
    height: 75,
    marginBottom: 5,
  },
  safekey: {
    color: colors.purple,
    fontSize: 36,
    textAlign: "center",
    marginBottom: -15,
    fontFamily: "BalooTammudu2-ExtraBold",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.purple,
  },
  signupBox: {
    backgroundColor: colors.purple,
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  otherSignupBox: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#EFF0F6",
    borderWidth: 1,
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#EFF0F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  otherSignupText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
  signupLogo: {
    width: 19,
    height: 19,
  },
});