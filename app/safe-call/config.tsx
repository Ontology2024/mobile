import { useState } from "react";
import { View, Text, Pressable, Image, Modal, StyleProp, ViewStyle, TextInput, StyleSheet, ScrollView } from "react-native";
import LengthLimitedInput from "@/components/LengthLimitedInput";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Select, Option } from "@/components/Select";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import { router } from "expo-router";
import HorizontalLine from "@/components/HorizontalLine";

const close = require("@/assets/images/close.png");

export default function Config() {
  const [safeWord, setSafeWord] = useState("");
  const [safeWordTriggerCount, setSafeWordTriggerCount] = useState(2);
  const [shouldSendSOS, setShouldSendSOS] = useState(false);
  const [shouldAttachAudio, setShouldAttachAudio] = useState(false);
  const [sosRecivers, setSOSRecivers] = useState([] as { name: string, phone: string }[]);
  const [reciverRegisterModalVisibility, setReciverRegisterModalVisibility] = useState(false);

  return (
    <View style={configStyles.page}>
      <ScrollView contentContainerStyle={configStyles.scrollableContent} style={configStyles.scrollableContainer}>
        <Text style={configStyles.title}>세이프 워드 설정</Text>
        <Text style={configStyles.description}>AI와 전화 도중 세이프 워드를 언급하면</Text>
        <Text style={configStyles.description}>신고를 도와드립니다.</Text>
        <View style={configStyles.form}>
          <LengthLimitedInput
            maxLength={20}
            placeholder="세이프워드를 입력해주세요."
            value={safeWord}
            onChangeText={setSafeWord}
          />

          <View>
            <Text style={configStyles.safeWordCountTitle}>세이프 워드 반복 횟수</Text>
            <View style={configStyles.optionList}>
              <Select selection={safeWordTriggerCount} onSelect={option => typeof option === "number" && setSafeWordTriggerCount(option)}>
                <Option option={2}>
                  <Text>2회</Text>
                </Option>
                <HorizontalLine />
                <Option option={3}>
                  <Text>4회</Text>
                </Option>
                <HorizontalLine />
                <Option option={4}>
                  <Text>4회</Text>
                </Option>
              </Select>
            </View>
          </View>

          <View style={configStyles.switchsBox}>
            <View>
              <View style={configStyles.switchBoxHeader}>
                <Text style={configStyles.switchBoxTitle}>SOS 메시지 보내기</Text>
                <Switch isOn={shouldSendSOS} onToggle={setShouldSendSOS} style={configStyles.switch} />
              </View>
              <Text style={configStyles.switchBoxContent}>세이프 워드를 반복했을 때,</Text>
              <Text style={configStyles.switchBoxContent}>내가 지정해둔 사람들에게 SOS 메시지를 신속하게</Text>
              <Text style={configStyles.switchBoxContent}>보낼 수 있습니다.</Text>
            </View>
            <HorizontalLine />
            <View>
              <View style={configStyles.switchBoxHeader}>
                <Text style={configStyles.switchBoxTitle}>오디오 파일 첨부</Text>
                <Switch isOn={shouldAttachAudio} onToggle={setShouldAttachAudio} style={configStyles.switch} />
              </View>
              <Text style={configStyles.switchBoxContent}>주변 소리를 5초 동안 녹음하여</Text>
              <Text style={configStyles.switchBoxContent}>SOS 메시지에 첨부합니다.</Text>
            </View>
          </View>

          <View style={configStyles.sosReciverBox}>
            <View style={configStyles.sosReciverModalOpener}>
              <Text style={configStyles.sosReciverModalTitle}>SOS 메시지 받는 사람</Text>
              <Pressable onPress={() => setReciverRegisterModalVisibility(true)}>
                <AntDesign name="plus" size={20} color="black" />
              </Pressable>
            </View>
            <View style={configStyles.sosReciverList}>
              {
                sosRecivers.map(({ name, phone }, i) => (
                  <View key={name}>
                    { i % 2 === 1 && <HorizontalLine style={{ marginVertical: 8 }} />}
                    <View style={configStyles.sosReciver}>
                      <Text style={configStyles.sosReciverText}>{name}</Text>
                      <Text style={configStyles.sosReciverText}>{phone}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>

      <Button onPress={() => router.navigate("/safe-call/select")} style={configStyles.next}>
        <Text style={configStyles.buttonText}>다음</Text>
      </Button>

      <ReciverAddModal visible={reciverRegisterModalVisibility} onRequestClose={reciver => {
          if (reciver) setSOSRecivers([...sosRecivers, reciver])

          setReciverRegisterModalVisibility(false);
        }} />
    </View>
  )
}

const configStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollableContainer: {
    flex: 1,
  },
  scrollableContent: {
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  title: {
    alignSelf: "center",

    fontWeight: "600",
    fontSize: 30,

    marginBottom: 11,
    marginTop: 18,
  },
  description: {
    alignSelf: "center",

    fontWeight: "500",
    fontSize: 13,
    color: "#67686A",
  },
  form: {
    flex: 1,

    gap: 15,

    marginTop: 54,
  },
  safeWordCountTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#A2A2A2",

    marginLeft: 12,
    marginBottom: 11,
  },
  optionList: {
    gap: 8,

    padding: 12,

    borderRadius: 12,
    overflow: "hidden",

    backgroundColor: "#F4F6F9",
  },
  switchsBox: {
    gap: 8,

    padding: 12,

    borderRadius: 12,
    overflow: "hidden",

    backgroundColor: "#F4F6F9",
  },
  switchBoxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 6,
  },
  switchBoxTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2F323D",
  },
  switch: {
    flexBasis: 38,
  },
  switchBoxContent: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A2A2A2",
  },
  sosReciverBox: {
    padding: 12,

    borderRadius: 12,
    overflow: "hidden",

    backgroundColor: "#F4F6F9",
  },
  sosReciverModalOpener: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingRight: 9,
  },
  sosReciverModalTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#2F323D",
  },
  sosReciverList: {
    marginTop: 6,
  },
  sosReciver: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
  },
  sosReciverText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#A2A2A2",
  },
  next: {
    marginTop: 26,
    marginHorizontal: 36,
    marginBottom: 36,

    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
  }
})

interface ReciverAddModalProps {
  visible: boolean
  onRequestClose: (reciver?: { name: string, phone: string }) => void
  style?: StyleProp<ViewStyle>
}

function ReciverAddModal({ visible, onRequestClose, style }: ReciverAddModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.length > 0 && /^(?:\d{3}-\d{4}-\d{4}|\d{11})$/.test(phone);

  return (
    <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          setName("");
          setPhone("");
          onRequestClose();
        }}
        style={style}
      >
      <View style={reciverAddModalStyles.container}>
        <View style={reciverAddModalStyles.modal}> 
          <Pressable onPress={() => {
            setName("");
            setPhone("");
            onRequestClose();
          }}>
            <Image source={close} style={reciverAddModalStyles.close}/>
          </Pressable>
          <Text style={reciverAddModalStyles.title}>SOS 메시지 받는 사람 추가</Text>
          <TextInput value={name} onChangeText={setName} placeholder="이름을 입력해주세요." cursorColor="#6028FF" style={reciverAddModalStyles.textInput} />
          <TextInput value={phone} onChangeText={setPhone} placeholder="연락처를 입력해주세요." keyboardType="phone-pad" cursorColor="#6028FF" style={reciverAddModalStyles.textInput} />
          <Button active={isValid} onPress={() => {
              setName("");
              setPhone("");
              onRequestClose({ name, phone });
            }}>
            <Text style={[reciverAddModalStyles.saveText, ...isValid ? [{ color: "#FFFFFF" }] : []]}>저장</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const reciverAddModalStyles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#000000B2",
  },
  modal: { 
    width: 277,

    padding: 11,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",
  },
  close: {
    flex: 0,
    alignSelf: "flex-end",

    flexBasis: 12,
    aspectRatio: 1,

    marginBottom: 1.5,
  },
  title: {
    alignSelf: "center",

    fontWeight: "500",
    fontSize: 15,
    
    marginBottom: 26,
  },
  textInput: {
    paddingHorizontal: 14,
    paddingVertical: 12,

    borderColor: "#DADFE5",
    borderWidth: 1,
    borderRadius: 12,

    marginBottom: 10,
  },
  saveText: {
    alignSelf: "center",

    fontWeight: "600",
    fontSize: 16,
  }
});