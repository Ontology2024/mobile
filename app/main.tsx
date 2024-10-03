import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from "react-native";
import { COLORS } from "@/constants/colors";
import BottomSheet from "react-native-simple-bottom-sheet";
import Panel from "@/components/Panel";
import NavHeader from "@/components/nav/NavHeader";
import RecommendBox from "@/components/nav/RecommendBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapSearchParams } from "@/constants/MapSearchParams";
import { useNavigation } from "@react-navigation/native";
import { navInfo } from "@/constants/NavMock";
import Tmap from "@/components/Tmap";
import { supabase } from "@/lib/supabase";
import Mykey from "@/components/Mykey";
import * as location from "expo-location";

const marketImg = require("@/assets/images/market.png");
const coinkeyImg = require("@/assets/images/coinkey.png");
const purplekeyImg = require("@/assets/images/purplekey.png");
const mykeyImg = require("@/assets/images/mykey.png");
const menuImg = require("@/assets/images/menu.png");
const closeImg = require("@/assets/images/close.png");
const navarrowImg = require("@/assets/images/navarrow.png");

const mapOptionsKey = "map_opt";

export default function Home() {
  const navigation = useNavigation();
  const [goToKey, setGoToKey] = useState(false);
  const [clickinfo, setClickinfo] = useState(false);
  const goToMykey = () => {
    closeModal();
    setGoToKey(true);
  };
  const openMyPage = () => {
    closeModal();
    navigation.navigate("mypage");
  };
  const [key, setKey] = useState(0);
  const { start, dest, setSearchParams } = useContext(MapSearchParams);
  const [selectedItems, setSelectedItems] = useState({
    안전시설: true,
    범죄: true,
    안전도: true,
  });

  const loadStoredData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(mapOptionsKey);
      if (storedItems) {
        setSelectedItems(JSON.parse(storedItems));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = async (item) => {
    const updatedItems = {
      ...selectedItems,
      [item]: !selectedItems[item],
    };
    setSelectedItems(updatedItems);
    try {
      await AsyncStorage.setItem(mapOptionsKey, JSON.stringify(updatedItems));
    } catch (e) {
      console.log(e);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  useEffect(() => {
    const initialize = async () => {
      await loadStoredData();
    };
    initialize();
  }, []);

  useEffect(() => {
    const load = async () => {
      const email = await AsyncStorage.getItem("email");
      let { data: coin, error } = await supabase.from("users").select("coinkey").eq("email", email);
      if (error) {
        console.log(error);
        return;
      }

      await AsyncStorage.setItem("coinkey", coin[0].coinkey.toString());
      setKey(coin[0].coinkey);
    };
    load();
  }, []);

  const [curr, setCurr] = useState("");
  useEffect(() => {
    const getCurrPostion = async () => {
      const { granted } = await location.requestForegroundPermissionsAsync();
      if (granted) {
        const loc = await location.getCurrentPositionAsync({});
        const info = await location.reverseGeocodeAsync(loc.coords);
        const { district } = info[0];
        setCurr(district);
      }
    };
    getCurrPostion();
  }, []);

  return (
    <View style={styles.container}>
      {!goToKey &&
        (start && dest ? (
          <NavHeader />
        ) : (
          <View style={styles.top}>
            <View style={styles.topBox1}>
              <Image source={purplekeyImg} style={{ width: 10, height: 18 }} />
              <Text style={styles.keyCount}>{key}</Text>
            </View>
            <View style={styles.topBox2}>
              {Object.keys(selectedItems).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.checkbox, { opacity: selectedItems[key] ? 1 : 0.5 }]}
                  onPress={() => handleSelect(key)}
                  activeOpacity={0.8}
                >
                  <Image source={require("@/assets/images/check.png")} style={styles.checkImg} />
                  <Text style={styles.checkText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

      {/* Tmap 렌더링 부분 */}
      {goToKey ? (
        <Mykey setGoToKey={setGoToKey} coin={key} setKey={setKey} />
      ) : (
        <TouchableOpacity activeOpacity={1} style={{ flex: 1,width:"100%", position: "relative", top: -125, zIndex: -1 }}>
          <Tmap />
        </TouchableOpacity>
      )}

      {!goToKey &&
        (start && dest ? (
          <View style={styles.panelBox}>
            <RecommendBox navInfo={navInfo} />
          </View>
        ) : (
          <View style={styles.panelBox}>
            <BottomSheet isOpen animationDuration={200} sliderMaxHeight={650}>
              <Panel start={start} dest={dest} curr={curr} clickinfo={clickinfo} />
            </BottomSheet>
          </View>
        ))}

      {start && dest ? (
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.9} style={styles.footerBox3}>
            <Text style={[styles.safecall, { color: "white" }]}>경로 안내 시작</Text>
            <Image source={navarrowImg} style={styles.navarr} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.6} style={styles.footerBox1} onPress={() => setClickinfo(!clickinfo)}>
            <Text style={styles.safecall}>AI 안심전화</Text>
            <Image source={require("@/assets/images/headphones.png")} style={styles.headphone} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.footerBox2} onPress={modalVisible ? closeModal : openModal}>
            <Image source={menuImg} style={styles.menu} />
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={modalVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
                <View style={styles.modalBox}>
                  <Text style={styles.modalOption}>상점</Text>
                  <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7}>
                    <Image source={marketImg} style={{ width: 28, height: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBox}>
                  <Text style={styles.modalOption}>코인키</Text>
                  <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7} onPress={goToMykey}>
                    <Image source={coinkeyImg} style={{ width: 17, height: 27 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBox}>
                  <Text style={styles.modalOption}>마이페이지</Text>
                  <TouchableOpacity style={styles.modalOptionBox} activeOpacity={0.7} onPress={openMyPage}>
                    <Image source={mykeyImg} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.closeBox} onPress={closeModal}>
                  <Image source={closeImg} style={styles.close} />
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  top: {
    width: "100%",
    height: 40,
    marginTop: 80,
    flexDirection: "row",
    gap: 10,
  },
  topBox1: {
    width: 90,
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
    gap: 10,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  keyCount: {
    color: COLORS.PURPLE,
    fontSize: 18,
    fontWeight: "600",
  },
  topBox2: {
    width: 220,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  checkImg: {
    width: 18,
    height: 10,
  },
  checkText: {
    fontSize: 13,
    fontWeight: "500",
  },
  selection: {
    width: "15%",
    height: "15%",
    backgroundColor: "#d9d9d9",
  },
  footer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  footerBox1: {
    paddingVertical: 13,
    paddingHorizontal: 90,
    borderColor: "#C5CCD7",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  safecall: {
    fontSize: 17,
    marginRight: 6,
    fontWeight: "600",
  },
  headphone: {
    width: 20,
    height: 20,
  },
  navarr: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  footerBox2: {
    padding: 13,
    marginLeft: 10,
    backgroundColor: "#8D94A3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  footerBox3: {
    paddingVertical: 13,
    paddingHorizontal: 110,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  closeBox: {
    padding: 13,
    paddingVertical: 13.5,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -63.8,
    right: 5.6,
  },
  menu: {
    width: 20,
    height: 20,
  },
  close: {
    width: 15,
    height: 15,
    margin: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalContent: {
    marginRight: 18,
    marginBottom: 105,
  },
  modalBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 24,
  },
  modalOption: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    marginRight: 20,
  },
  modalOptionBox: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  panelBox: {
    width: "100%",
    position: "absolute",
    bottom: 100,
  },
});
