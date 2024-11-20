import { Link, router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import Button from "@/components/Button";
import { Text } from "../map/components/Text";
import { SafeCallHeader } from "./components/SafeCallHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const chatBubble = require("@/assets/images/chat-bubble.png");

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeCallHeader />
      <View style={styles.page}>
        <Text style={[styles.title, { marginTop: 50 }]}>친근한 AI와</Text>
        <Text style={styles.title}>전화를 해 보세요!</Text>
        <Text style={styles.description}>
          친구와 대화하듯 전화가 가능합니다.
        </Text>
        <View style={{ flexGrow: 1 }} />
        <Image source={chatBubble} style={styles.chatGraphic} />
        <View style={{ flexGrow: 2 }} />
        <Link href="/safe-call/config" asChild>
          <Button onPress={() => {}} style={styles.startButton}>
            <Text style={styles.startButtonText}>좋아, 시작할게.</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "white",
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
  },
  startButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
