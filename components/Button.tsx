import { ReactNode } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"

interface ButtonProps {
  onPress: () => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export default function Button({ onPress, children, style }: ButtonProps) {
  return (
    <Pressable style={[{ backgroundColor: "#6028FF", paddingVertical: 14, borderRadius: 12, overflow: "hidden" }, style]} onPress={onPress}>
      {children}
    </Pressable>
  )
}