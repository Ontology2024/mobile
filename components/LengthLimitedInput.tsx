import { View, Text, TextInput, StyleProp, TextStyle, Pressable, Image, StyleSheet } from "react-native";

interface LengthLimitedInputProps {
  maxLength: number
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  style?: StyleProp<TextStyle>
}

function LengthLimitedInput({ maxLength, value, onChangeText, placeholder, style }: LengthLimitedInputProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={styles.input}
        placeholderTextColor="#C5CCD7"
        cursorColor="#6028FF"
      />
      <Text style={styles.count}>{value.length}/{maxLength}</Text>
      {
        value.length >= 1 &&
          <Pressable onPress={() => onChangeText("")}>
            <Image style={styles.clear} source={require("@/assets/images/x-circle-contained.png")} />
          </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    paddingVertical: 4,
    paddingHorizontal: 12,

    borderColor: "#DADFE5",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    flexGrow: 1,
    alignSelf: "stretch",

    fontSize: 16,
    fontWeight: 500,
    
    paddingVertical: 8,
  },
  count: {
    flexShrink: 0,

    color: "#A4A4A4",
    fontSize: 10,
    fontWeight: 400,
    textAlign: "center",
  },
  clear: {
    flexShrink: 0,
    height: 20,

    aspectRatio: 1,
  },
})

export default LengthLimitedInput