import { StyleProp, View, ViewStyle } from "react-native";

interface HorizontalLineProps {
  style?: StyleProp<ViewStyle>
}

export default function HorizontalLine({ style }: HorizontalLineProps) {
  return <View style={[{ borderColor: "#E7E7E7", borderTopWidth: 1 }, style]} />
}