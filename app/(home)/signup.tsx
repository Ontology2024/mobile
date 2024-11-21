import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "@/lib/supabase";

const eyeOpenImg = require("@/assets/images/eye-open.png");
const eyeCloseImg = require("@/assets/images/eye-closed.png");

export default function signup() {
  const navigation = useNavigation();
  const [terms, setTerms] = useState([false, false, false, false]);
  const allTerms = terms[0] && terms[1] && terms[2] && terms[3];
  const allAgree = () => {
    if (allTerms) {
      return setTerms([false, false, false, false]);
    } else {
      setTerms([true, true, true, true]);
    }
  };
  const oneAgree = (n) => {
    setTerms((prevTerms) =>
      prevTerms.map((term, idx) => (idx === n ? !term : term))
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const email = watch("email", "");
  const password = watch("password", "");
  const passwordConfirm = watch("passwordConfirm", "");

  const activeSubmit = (email, password, passwordConfirm) => {
    if (!(terms[0] && terms[1] && terms[2])) return false;
    if (email && password && passwordConfirm) {
      if (
        /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password) &&
        password.length >= 8 &&
        password.length <= 20
      )
        return true;
      else return false;
    } else return false;
  };

  const onSubmit = async (data) => {
    try {
      // 이메일과 비밀번호로 회원가입 요청
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (signUpError) {
        console.log("회원가입 오류:", signUpError.message);
        return;
      }
      // 회원가입 성공 후 유저 정보 확인
      const user = signUpData?.user;

      if (!user) {
        console.log("회원가입 중 오류: 사용자 정보를 가져올 수 없습니다.");
        return;
      }

      // 성공 시 추가 데이터 저장
      const { error: userError } = await supabase
        .from("users") // users 테이블에 데이터 저장
        .insert({
          id: user.id,
          created_at: user.created_at,
          email: user.email,
        });

      if (userError) {
        console.log("추가 데이터 저장 오류:", userError.message);
        return;
      }

      console.log("회원가입 성공!");
      navigation.navigate("successSignup"); // 성공 시 화면 이동
    } catch (error) {
      console.log("회원가입 중 오류 발생:", error.message);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.header} activeOpacity={0.6}>
          <EvilIcons name="chevron-left" size={45} color="black" />
          <Text style={styles.headerText}>로그인</Text>
        </TouchableOpacity>
      </Link>

      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>이메일 주소 입력 *</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputBox}
                placeholder="예) safekey@gmail.com"
                placeholderTextColor={"#a2a6ae"}
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          <Text style={[styles.errorText]}>
            {errors.email && errors.email.message}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>비밀번호 입력 *</Text>
          <View style={styles.inputBox}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 최대 20자이어야 합니다.",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message: "비밀번호는 영문과 숫자를 포함해야 합니다.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ width: 260, marginRight: 18 }}
                  placeholder="영문과 숫자 포함 8~20자 이내로 입력해주세요"
                  placeholderTextColor={"#a2a6ae"}
                  secureTextEntry={!showPw}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPw(!showPw)}
              activeOpacity={0.8}
            >
              <Image
                source={showPw ? eyeOpenImg : eyeCloseImg}
                style={styles.eyeImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.checkPwBox}>
            <View
              style={[
                styles.checkPw,
                { opacity: /[A-Za-z]/.test(password) ? 1 : 0.5 },
              ]}
            >
              <Feather name="check" size={16} color={COLORS.PURPLE} />
              <Text style={styles.checkText}>영문포함</Text>
            </View>
            <View
              style={[
                styles.checkPw,
                { opacity: /\d/.test(password) ? 1 : 0.5 },
              ]}
            >
              <Feather name="check" size={16} color={COLORS.PURPLE} />
              <Text style={styles.checkText}>숫자포함</Text>
            </View>
            <View
              style={[
                styles.checkPw,
                {
                  opacity:
                    password.length >= 8 && password.length <= 20 ? 1 : 0.5,
                },
              ]}
            >
              <Feather name="check" size={16} color={COLORS.PURPLE} />
              <Text style={styles.checkText}>8~20자 이내</Text>
            </View>
          </View>
          <Text style={styles.errorText}>
            {errors.password && errors.password.message}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>비밀번호 확인 *</Text>
          <View style={styles.inputBox}>
            <Controller
              control={control}
              name="passwordConfirm"
              rules={{
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ width: 260, marginRight: 18 }}
                  placeholder="비밀번호를 다시 입력해주세요"
                  placeholderTextColor={"#a2a6ae"}
                  secureTextEntry={!showPw2}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPw2(!showPw2)}
              activeOpacity={0.8}
            >
              <Image
                source={showPw2 ? eyeOpenImg : eyeCloseImg}
                style={styles.eyeImg}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.termsTitle}>
          <TouchableOpacity activeOpacity={0.8} onPress={allAgree}>
            <Ionicons
              name="checkbox"
              size={25}
              color={allTerms ? COLORS.PURPLE : "#C5CCD7"}
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>모두 동의 (선택 정보 포함)</Text>
        </View>
        <View style={styles.line} />
        <View>
          <View style={styles.termsDetail}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => oneAgree(0)}>
              <Feather
                name="check"
                size={20}
                color={terms[0] ? COLORS.PURPLE : "#C5CCD7"}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>[필수] 만 14세 이상</Text>
            <View style={styles.plus}>
              <AntDesign name="plus" size={20} color="black" />
            </View>
          </View>
          <View style={styles.termsDetail}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => oneAgree(1)}>
              <Feather
                name="check"
                size={20}
                color={terms[1] ? COLORS.PURPLE : "#C5CCD7"}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>[필수] 이용약관 동의</Text>
            <View style={styles.plus}>
              <AntDesign name="plus" size={20} color="black" />
            </View>
          </View>
          <View style={styles.termsDetail}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => oneAgree(2)}>
              <Feather
                name="check"
                size={20}
                color={terms[2] ? COLORS.PURPLE : "#C5CCD7"}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>[필수] 개인정보 처리방침 동의</Text>
            <View style={styles.plus}>
              <AntDesign name="plus" size={20} color="black" />
            </View>
          </View>
          <View style={styles.termsDetail}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => oneAgree(3)}>
              <Feather
                name="check"
                size={20}
                color={terms[3] ? COLORS.PURPLE : "#C5CCD7"}
              />
            </TouchableOpacity>
            <Text style={styles.termsText}>
              [선택] 광고성 정보 수신 및 마케팅 활용 동의
            </Text>
            <View style={styles.plus}>
              <AntDesign name="plus" size={20} color="black" />
            </View>
          </View>
        </View>
      </View>

      <Link href="/successSignup" asChild>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={
            activeSubmit(email, password, passwordConfirm)
              ? styles.submitBtn
              : styles.unSubmitBtn
          }
          activeOpacity={0.8}
          disabled={!activeSubmit(email, password, passwordConfirm)}
        >
          <Text style={styles.submitText}>가입하기</Text>
        </TouchableOpacity>
      </Link>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
    marginLeft: 20,
    position: "relative",
    left: -150,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
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
  checkPwBox: {
    flexDirection: "row",
    gap: 15,
    marginTop: 5,
    alignItems: "center",
  },
  checkPw: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  checkText: {
    fontSize: 12,
    color: COLORS.PURPLE,
  },
  submitBtn: {
    backgroundColor: COLORS.PURPLE,
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  unSubmitBtn: {
    backgroundColor: "#C5CCD7",
    width: 328,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  termsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  line: {
    width: 328,
    height: 1,
    backgroundColor: "#EFF0F6",
    marginVertical: 7,
  },
  termsDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  plus: {
    position: "absolute",
    right: 0,
  },
});
