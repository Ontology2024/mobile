import Button from "@/components/Button";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";

export function StartButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.startButtonContainer}>
      <Button onPress={onPress}>
        <View style={styles.button}>
          <Text style={{ color: "white", fontWeight: "600" }}>
            경로안내시작
          </Text>
          <AntDesign
            style={{ transform: [{ rotate: "90deg" }] }}
            name="back"
            size={20}
            color="white"
          />
        </View>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  startButtonContainer: {
    backgroundColor: "white",
    elevation: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
});
