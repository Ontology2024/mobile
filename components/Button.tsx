import { ReactNode } from "react"
import { Pressable, StyleProp, ViewStyle, StyleSheet } from "react-native"

interface ButtonProps {
  onPress: () => void
  children: ReactNode
  active?: boolean
  style?: StyleProp<ViewStyle>
}

export default function Button({ onPress, children, active = true, style }: ButtonProps) {
  return (
    <Pressable style={[styles.base, ...active ? [] : [styles.inactive], style]} onPress={active ? onPress : () => {}}>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#6028FF",

    paddingVertical: 14,

    borderRadius: 12,
    overflow: "hidden"
  },
  inactive: {
    backgroundColor: "#F4F6F9"
  }
})