import { router } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const chatBubble = require("@/assets/images/chat-bubble.png");

export default function Index() {
  return (
    <View style={styles.page}>
      <Text style={[styles.title, { marginTop: 23 }]}>친근한 AI와</Text>
      <Text style={styles.title}>전화를 해 보세요!</Text>
      <Text style={styles.description}>친구와 대화하듯 전화가 가능합니다.</Text>
      <View style={{ flexGrow: 1 }} />
      <Image source={chatBubble} style={styles.chatGraphic} />
      <View style={{ flexGrow: 2 }} />
      <Pressable onPress={() => router.navigate("/safe-call/config")} style={styles.startButton}>
        <Text style={styles.startButtonText}>
          좋아, 시작할게.
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,

    alignItems: "center",

    paddingHorizontal: 36,
    paddingBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    color: "#67686A",

    marginTop: 22,
  },
  chatGraphic: {
    width: 160,
    height: 160,
    aspectRatio: 1,
  },
  startButton: {
    alignSelf: "stretch",

    backgroundColor: "#6028FF",

    paddingVertical: 14,

    borderRadius: 12,
    overflow: "hidden", // https://reactnative.dev/docs/view-style-props#borderradius
  },
  startButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  }
})