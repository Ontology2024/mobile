import { COLORS } from "@/constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchPlace } from "../service/SearchService";
import { Text } from "./Text";
import { Entypo } from "@expo/vector-icons";
import { DestType } from "..";

interface SearchModalProps {
  modalVisible: boolean;
  setModalVisible(value: boolean): void;
  dest: DestType | undefined;
  setDest(value: DestType): void;
}

export function SearchModal({
  modalVisible,
  setModalVisible,
  dest,
  setDest,
}: SearchModalProps) {
  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const [searchText, setSearchText] = useState<string>(dest?.addr || "");
  const [items, setItems] = React.useState<
    { place_name: string; road_address_name: string; x: string; y: string }[]
  >([]);

  const onPressMyLocation = () => {
    console.log("my location");
  };

  const handleStartTextChange = useCallback(
    _.debounce(async (e) => {
      if (e.length > 1) {
        const places = await searchPlace(e);

        setItems(places);
      }
    }, 500),
    []
  );

  useEffect(() => {
    handleStartTextChange(searchText);
  }, [searchText, handleStartTextChange]);

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.searchContainer}>
          <Entypo
            name="chevron-thin-left"
            size={24}
            style={{ marginTop: "auto", marginBottom: "auto", marginRight: 10 }}
            onPress={() => setModalVisible(false)}
          />

          <View style={styles.textinputContainer}>
            <View style={styles.startDestContainer}>
              <TextInput
                style={styles.textInputStyle}
                value={searchText}
                placeholder="도착지를 입력해주세요"
                placeholderTextColor={"#c5ccd7"}
                onChangeText={setSearchText}
              />
              <TouchableOpacity onPress={onPressMyLocation}>
                <MaterialIcons
                  size={20}
                  name="location-searching"
                  color={COLORS.PURPLE}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.scrapContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setDest({
                addr: "매영로 421-10",
                latitude: "37.2493081",
                longitude: "127.0777909",
                title: "나의집",
              });
            }}
            style={styles.scrap}
          >
            <MaterialIcons name="star" size={12} color={"#767985"} />
            <Text style={{ fontSize: 12, color: "#767985" }}>나의집</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setDest({
                addr: "매영로 421-10",
                latitude: "37.2493081",
                longitude: "127.0777909",
                title: "친구집",
              });
            }}
            style={styles.scrap}
          >
            <MaterialIcons name="star" size={12} color={"#767985"} />
            <Text style={{ fontSize: 12, color: "#767985" }}>친구집</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setDest({
                addr: "경희대학교 국제캠퍼스",
                latitude: "37.24291020655134",
                longitude: "127.08118995506915",
                title: "학교",
              });
            }}
            style={styles.scrap}
          >
            <MaterialIcons name="star" size={12} color={"#767985"} />
            <Text style={{ fontSize: 12, color: "#767985" }}>학교</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.scrap,
              {
                backgroundColor: "#F4F6F9",
                borderWidth: 0,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 8,
              },
            ]}
          >
            <MaterialIcons name="add" size={12} color={"#767985"} />
          </View>
        </View>
        <View style={{ height: 8, backgroundColor: "#F4F6F9" }}></View>

        <ScrollView>
          {items?.map((item, index) => (
            <Pressable
              key={item.place_name + index}
              onPress={() => {
                setItems([]);
                setSearchText(stripHtmlTags(item.place_name));
                setDest({
                  addr: stripHtmlTags(item.place_name),
                  longitude: item.x,
                  latitude: item.y,
                  title: item.place_name,
                });
                setModalVisible(false);
              }}
            >
              <View style={styles.itemStyle}>
                <View style={styles.place_nameContainer}>
                  <MaterialIcons
                    name="location-pin"
                    size={16}
                    color={"#C5CCD7"}
                  />
                  <Text style={{ fontWeight: "400" }}>
                    {stripHtmlTags(item.place_name)}
                  </Text>
                </View>

                <View>
                  <Text style={styles.roadAddr}>{item.road_address_name}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    padding: 8,
    paddingRight: 20,
    paddingBottom: 12,
  },
  textinputContainer: {
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#F4F6F9",
    flexGrow: 1,
  },
  textInputStyle: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexGrow: 1,
  },
  startDestContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  scrap: {
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C5CCD7",
    alignItems: "center",
    justifyContent: "center",
  },
  scrapContainer: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 12,
    paddingTop: 4,
    paddingLeft: 40,
  },
  itemStyle: {
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF0F6",
  },
  place_nameContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  roadAddr: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8D94A3",
    marginLeft: 24,
    marginTop: 2,
  },
});
