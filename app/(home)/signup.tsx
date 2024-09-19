import { View, Text, StyleSheet,Image } from "react-native";
import React from "react";

export default function signup() {
  return (
    <View style={styles.container}>
      <Text>signup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
