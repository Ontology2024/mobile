import React from "react";
import { View, StyleSheet, Text as RText, TextProps } from "react-native";

export function Text({ style, ...props }: TextProps) {
  return (
    <RText
      style={[
        { fontFamily: "Pretendard", fontWeight: "500", fontSize: 16 },
        style,
      ]}
      {...props}
    ></RText>
  );
}
