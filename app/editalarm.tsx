import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import { useState } from "react";
import { COLORS } from "@/constants/colors";
import DateTimePicker from "react-native-modal-datetime-picker";

const week = ["월", "화", "수", "목", "금", "토", "일"];

export default function editalarm() {
  const router = useRouter();
  const [weekV, setWeekV] = useState(Array(7).fill(false));
  const [sw, setSw] = useState([false, false, false, false, false]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState("");
  const [startTime, setStartTime] = useState("오전 09:00");
  const [endTime, setEndTime] = useState("오전 09:00");

  const toggle = (idx) => {
    setSw((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };
  const selectWeekV = (idx) => {
    setWeekV((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  const showDatePicker = (v) => {
    if (v === "start") setDatePickerVisibility("start");
    else if (v === "end") setDatePickerVisibility("end");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility("");
  };

  const handleTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;
    const formattedTime = `${isAM ? "오전" : "오후"} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

    if (isDatePickerVisible === "start") {
      setStartTime(formattedTime);
    } else {
      setEndTime(formattedTime);
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} activeOpacity={0.6} onPress={() => router.back()}>
          <EvilIcons name="chevron-left" size={45} color="black" />
          <Text style={styles.headerText}>알림 설정</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "85%", gap: 13, marginHorizontal: 20, marginTop: 16, marginBottom: 20 }}>
        <Text style={styles.title}>푸시 알림</Text>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>모든 알림 일시 중단</Text>
          <Switch value={sw[0]} onChange={() => toggle(0)} color={COLORS.PURPLE} />
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>위험 지역에 있을 때 알림</Text>
          <Switch value={sw[1]} onChange={() => toggle(1)} color={COLORS.PURPLE} />
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>코인키가 주변에 많을 때 알림</Text>
          <Switch value={sw[2]} onChange={() => toggle(2)} color={COLORS.PURPLE} />
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>길찾기 완료했을 때 알림</Text>
          <Switch value={sw[3]} onChange={() => toggle(3)} color={COLORS.PURPLE} />
        </View>
      </View>

      <View style={{ width: 350, height: 1, backgroundColor: "#E7E7E7" }} />

      <View style={{ width: "85%", gap: 13, marginHorizontal: 20, marginTop: 16, marginBottom: 20 }}>
        <Text style={styles.title}>알림 제한</Text>
        <View style={styles.subcontainer}>
          <Text style={styles.content}>알림 제한 시간대 설정</Text>
          <Switch value={sw[4]} onChange={() => toggle(4)} color={COLORS.PURPLE} />
        </View>
      </View>

      <View style={{ width: "85%", gap: 13, marginHorizontal: 20, marginTop: 16, marginBottom: 20 }}>
        <Text style={styles.title}>요일 선택</Text>
        <View style={styles.buttonblock}>
          {week.map((val, idx) => (
            <TouchableOpacity activeOpacity={1} style={weekV[idx] ? styles.btn2 : styles.btn} key={idx} onPress={() => selectWeekV(idx)}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: weekV[idx] ? COLORS.PURPLE : "black" }}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ width: "85%", alignItems: "center", gap: 8 }}>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#767985" }}>시작 시간</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.time} onPress={() => showDatePicker("start")}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#8D94A3" }}>{startTime}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#767985" }}>종료 시간</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.time} onPress={() => showDatePicker("end")}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#8D94A3" }}>{endTime}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        isVisible={isDatePickerVisible ? true : false}
        mode="time"
        onConfirm={handleTime}
        onCancel={hideDatePicker}
        is24Hour={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    paddingVertical: 16,
    borderBottomColor: "#EFF0F6",
    borderBottomWidth: 1,
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
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#767985",
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2F323D",
  },
  buttonblock: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    borderRadius: 8,
  },
  btn2: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.PURPLE,
    borderRadius: 8,
  },
  time: {
    width: 91,
    height: 36,
    padding: 10,
    backgroundColor: "#F4F6F9",
    alignItems: "center",
    borderRadius: 8,
  },
});
