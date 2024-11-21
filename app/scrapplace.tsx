import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

const sampleImg = require("@/assets/images/sampleImg.png");

const sampleData = [
  {
    place: "나의집",
    distance: "1km",
    address: "경기도 수원시 영통구 덕영대로 42",
  },
  {
    place: "회사",
    distance: "4.3km",
    address: "서울특별시 서초구 서초대로 84",
  },
  {
    place: "친구집",
    distance: "2.7km",
    address: "서울특별시 서초구 서초대로 84",
  },
];

export default function Scrapplace() {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState(Array(sampleData.length).fill(false));
  const onEdit = () => {
    setEdit(true);
  };
  const onDelete = () => {
    setEdit(false);
    setCheck((prev) => prev.map((val) => (val = false)));
    check.forEach((val, idx) => {
      if (val) sampleData.splice(idx, 1);
    });
  };
  const checked = (n) => {
    setCheck((prev) => prev.map((val, idx) => (idx === n ? !val : val)));
  };
  const controlOver = (str) => {
    if (str.length > 25) {
      return str.slice(0, 23) + "...";
    }
    return str;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {edit ? (
          <TouchableOpacity
            style={styles.headerLeft}
            activeOpacity={0.6}
            onPress={() => setEdit(false)}
          >
            <EvilIcons name="chevron-left" size={45} color="black" />
            <Text style={styles.headerText}>자주 가는 장소 편집</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerLeft}
            activeOpacity={0.6}
            onPress={() => router.back()}
          >
            <EvilIcons name="chevron-left" size={45} color="black" />
            <Text style={styles.headerText}>자주 가는 장소 설정</Text>
          </TouchableOpacity>
        )}
        {!edit && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.navEditBox}
            onPress={onEdit}
          >
            <Feather name="edit" size={18} color="black" />
            <Text style={{ fontSize: 14, fontWeight: "500" }}>편집</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.addContainer}>
        {!edit && (
          <Link href="addplace" asChild>
            <TouchableOpacity activeOpacity={0.7} style={styles.addBox}>
              <View style={{ backgroundColor: "#F4F6F9", padding: 6 }}>
                <AntDesign name="plus" size={16} color="black" />
              </View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                장소 추가하기
              </Text>
            </TouchableOpacity>
          </Link>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 230, gap: 12 }}
        >
          {sampleData.map((data, idx) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.scrapBox}
              key={idx}
              onPress={() => checked(idx)}
            >
              {edit && (
                <Ionicons
                  name={check[idx] ? "checkbox" : "checkbox-outline"}
                  size={20}
                  color={check[idx] ? COLORS.PURPLE : "black"}
                  style={{ marginRight: -15 }}
                />
              )}
              <View style={{ gap: 8 }}>
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <MaterialIcons name="stars" size={20} color={COLORS.PURPLE} />
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {data.place}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#767985" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {controlOver(`${data.distance} · ${data.address}`)}
                </Text>
              </View>
              <View style={styles.imgbox}>
                <Image source={sampleImg} style={{ width: 60, height: 60 }} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {edit && (
        <View style={styles.editfooter}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onDelete}
            style={styles.deletebtn}
          >
            <Feather name="trash-2" size={20} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#2F323D" }}>
              삭제
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  navEditBox: {
    marginRight: 30,
    backgroundColor: "#F4F6F9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  addContainer: {
    width: "88%",
    marginVertical: 16,
    marginHorizontal: 20,
    gap: 12,
  },
  addBox: {
    width: "100%",
    padding: 16,
    gap: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#EFF0F6",
    borderWidth: 1,
    borderRadius: 12,
  },
  scrapBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EFF0F6",
  },
  imgbox: {
    borderColor: "#EFF0F6",
    borderWidth: 1,
    borderRadius: 12,
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  editfooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 95,
    paddingTop: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -30 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    backgroundColor: "white",
  },
  deletebtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 110,
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C5CCD7",
  },
});
