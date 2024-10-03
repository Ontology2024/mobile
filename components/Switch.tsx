import { StyleProp, ViewStyle, Pressable, StyleSheet, View } from "react-native"

interface SwitchProps {
  isOn: boolean
  onToggle: (isOn: boolean) => void
  style?: StyleProp<ViewStyle>
  handleStyle?: StyleProp<ViewStyle>
}

export default function Switch({ isOn, onToggle, style, handleStyle }: SwitchProps) {
  return (
    <Pressable onPress={() => onToggle(!isOn)} style={[styles.base, ...isOn ? [styles.on] : [], style]}>
      <View style={[styles.handle, handleStyle]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",

    backgroundColor: "#78788029",

    paddingVertical: 2,
    paddingHorizontal: 1.5,

    borderRadius: 75,
    overflow: "hidden",
  },
  on: {
    justifyContent: "flex-end",

    backgroundColor: "#6028FF",
  },
  handle: {
    width: 20,
    height: 20,

    flexShrink: 0,

    backgroundColor: "#FFFFFF",

    borderRadius: 10,
    overflow: "hidden",
  },
});