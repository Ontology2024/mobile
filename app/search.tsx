import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK } from "@/constants/mock";

const leftarrowImg = require("@/assets/images/leftarrow.png");
const currentlocationImg = require("@/assets/images/currentlocation.png");
const starImg = require("@/assets/images/star.png");
const plusImg = require("@/assets/images/plus.png");
const destinationImg = require("@/assets/images/destination.png");
const closeImg = require("@/assets/images/close.png");

const scrapList = ["나의집", "회사", "친구집"];

export default function search() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const onChangeText = (payload) => setText(payload);
  const [currentSearchList, setCurrentSearchList] = useState(MOCK.currSearchList);

  useEffect(() => {
    const loadSearchList = async () => {
      try {
        const storedList = await AsyncStorage.getItem("currentSearchList");
        if (storedList) {
          setCurrentSearchList(JSON.parse(storedList));
        }
      } catch (e) {
        console.error(e.value);
      }
    };

    loadSearchList();
  }, []);

  const updateSearchList = async (newList) => {
    try {
      setCurrentSearchList(newList);
      await AsyncStorage.setItem("currentSearchList", JSON.stringify(newList));
    } catch (e) {
      console.error(e.value);
    }
  };

  const addSearchList = async (search) => {
    try {
      const newList = currentSearchList;
      if (search) {
        newList.push({ name: search, scrap: false });
      }
      updateSearchList(newList);
      await AsyncStorage.setItem("dest", search);
      navigation.goBack();
    } catch (e) {
      console.log(e.value);
    }
  };

  const removeItem = (index) => {
    const updatedList = currentSearchList.filter((_, idx) => idx !== index);
    updateSearchList(updatedList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={leftarrowImg} style={styles.arrowimg} />
        </TouchableOpacity>
        <View style={styles.searchbar}>
          <TextInput
            style={styles.searchText}
            onSubmitEditing={() => addSearchList(text)}
            onChangeText={onChangeText}
            returnKeyType="done"
            value={text}
            placeholder="도착지를 입력해주세요"
          />
          <Image source={currentlocationImg} style={styles.locationimg} />
        </View>
      </View>

      <View style={styles.scrapBox}>
        {scrapList.map((scrapName) => (
          <View style={styles.scrapinfo} key={scrapName}>
            <Image source={starImg} style={styles.scrapImg} />
            <Text style={styles.scrapText}>{scrapName}</Text>
          </View>
        ))}
        <TouchableOpacity activeOpacity={0.8} style={styles.plusBox}>
          <Image source={plusImg} style={styles.scrapImg} />
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", height: 6, backgroundColor: "#F4F6F9" }} />

      <View>
        <View style={styles.currentSearchTitleBox}>
          <Text style={styles.currentSearchTitleText}>최근검색</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
          {currentSearchList.map((value, idx) => (
            <View style={styles.currentSearchListBox} key={value.name}>
              <Image source={value.scrap ? starImg : destinationImg} style={value.scrap ? styles.starImg : styles.destImg} />
              <View style={styles.currentSearchListBox2}>
                <Text style={styles.currentSearchListText}>{value.name}</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => removeItem(idx)}>
                  <Image source={closeImg} style={styles.closeBtn} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 70,
    paddingHorizontal: 12,
  },
  searchbar: {
    flexDirection: "row",
    backgroundColor: "#F4F6F9",
    borderRadius: 12,
    gap: 8,
    padding: 12,
  },
  searchText: {
    width: 267,
    fontSize: 16,
    fontWeight: "500",
  },
  arrowimg: {
    width: 10,
    height: 20,
  },
  locationimg: {
    width: 20,
    height: 20,
  },
  scrapBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    marginVertical: 12,
    marginLeft: 60,
  },
  scrapinfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderColor: "#C5CCD7",
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 25,
  },
  scrapImg: {
    width: 9,
    height: 9,
  },
  scrapText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#767985",
  },
  plusBox: {
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 25,
    height: 25,
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
  destImg: {
    width: 15,
    height: 19,
  },
  starImg: {
    width: 15,
    height: 15,
  },
  currentSearchListText: {
    fontSize: 16,
    fontWeight: "400",
  },
  closeBtn: {
    width: 12,
    height: 12,
  },
});
