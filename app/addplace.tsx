import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import * as location from "expo-location";
import { Snackbar } from "react-native-paper";

const currentlocationImg = require("@/assets/images/currentlocation.png");

export default function Addplace() {
  const [search, setSearch] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);

  const searching = (s) => {
    setSearch(s);
  };
  const getCurrPostion = async () => {
    const { granted } = await location.requestForegroundPermissionsAsync();
    if (granted) {
      const loc = await location.getCurrentPositionAsync({});
      const info = await location.reverseGeocodeAsync(loc.coords);
      const { region, city, name } = info[0];
      setSearch(`${region} ${city} ${name}`);
    }
  };
  const addPlace = () => {
    setSnackVisible(true);
    setTimeout(() => {
      setSnackVisible(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="scrapplace" asChild>
          <TouchableOpacity style={styles.headerLeft} activeOpacity={0.6}>
            <EvilIcons name="chevron-left" size={45} color="black" />
            <Text style={styles.headerText}>장소 추가하기</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.search}
          onChangeText={searching}
          returnKeyType="done"
          value={search}
          placeholder="장소를 검색하여 추가해보세요"
        />
        <TouchableOpacity activeOpacity={0.8} onPress={getCurrPostion}>
          <Image
            source={currentlocationImg}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", height: 6, backgroundColor: "#F4F6F9" }} />

      <View style={{ width: "100%" }}>
        {!search && (
          <View style={styles.currentSearchTitleBox}>
            <Text style={styles.currentSearchTitleText}>최근검색</Text>
          </View>
        )}
        <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
          <View style={styles.currentSearchListBox}>
            <View style={{ position: "relative", top: -8 }}>
              <FontAwesome6 name="location-dot" size={14} color="#C5CCD7" />
            </View>
            <View style={styles.currentSearchListBox2}>
              <View style={{ gap: 2 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#2F323D" }}
                >
                  세이프키하우스 본점
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: "400", color: "#8D94A3" }}
                >
                  경기도 용인시 기흥구 덕영대로 481
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addBtn}
                onPress={addPlace}
              >
                <AntDesign name="plus" size={16} color={COLORS.PURPLE} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: COLORS.PURPLE,
                  }}
                >
                  추가
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <Snackbar
        visible={snackVisible}
        duration={1000}
        elevation={0}
        style={styles.snackbar}
      >
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Ionicons name="checkbox" size={20} color={COLORS.PURPLE} />
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            장소가 추가되었어요!
          </Text>
        </View>
      </Snackbar>
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
  currentSearchTitleBox: {
    paddingLeft: 20,
    paddingVertical: 12,
    borderBottomColor: "#E5EBF0",
    borderBottomWidth: 1,
  },
  currentSearchTitleText: {
    color: "#8D94A3",
    fontSize: 14,
    fontWeight: "600",
  },
  currentSearchListBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingLeft: 20,
    borderBottomColor: "#E5EBF0",
    borderBottomWidth: 1,
  },
  currentSearchListBox2: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentSearchListText: {
    fontSize: 16,
    fontWeight: "400",
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.PURPLE,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    width: 335,
    height: 46,
    backgroundColor: "#F4F6F9",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    width: 283,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#2F323D",
  },
  snackbar: {
    backgroundColor: "#F4F6F9",
    width: 335,
    alignSelf: "center",
    borderRadius: 8,
  },
});
