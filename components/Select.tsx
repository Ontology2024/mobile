import { createContext, ReactNode, useContext } from "react";
import { StyleProp, ViewStyle, View, Pressable, StyleSheet } from "react-native";

interface SelectProps {
  selection: unknown
  onSelect: (option: unknown) => void
  children: ReactNode
}

export function Select({ selection, onSelect, children }: SelectProps) {
  return <SelectContext.Provider value={{ selection, onSelect }}>{children}</SelectContext.Provider>
}

const SelectContext = createContext<{ selection: unknown, onSelect: (option: unknown) => void }>({ selection: undefined, onSelect: () => {} })

interface OptionProps {
  option: unknown
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export function Option({ option, children, style }: OptionProps) {
  const { selection, onSelect } = useContext(SelectContext)

  return (
    <View style={[optionStyles.container, style]}>
      <Pressable onPress={() => onSelect(option)} style={[optionStyles.base, ...selection === option ? [optionStyles.chosen] : []]}>
        { selection === option && <View style={optionStyles.dot} /> }
      </Pressable>
      {children}
    </View>
  );
}

const optionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  base: {
    flexGrow: 0,
    flexShrink: 0,
    width: 23,
    height: 23,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 11.5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  chosen: {
    borderColor: "#6028FF",
  },
  dot: {
    flexShrink: 0,
    width: 13,
    height: 13,

    backgroundColor: "#6028FF",
    borderRadius: 6.5,
    overflow: "hidden",
  }
})