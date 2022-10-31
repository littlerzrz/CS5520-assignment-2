import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors, pressedStyle } from "../vars";
export default function MyButton({ text, onPress, type = "normal" }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.basic,
        styles[type],
        pressed && pressedStyle,
      ]}
      android_ripple={{ color: colors.LIGHT, foreground: true }}
      onPress={onPress}
    >
      <Text style={[styles[type].text]}>{text}</Text>
    </Pressable>
  );
}
const normalBtn = {
  padding: 12,
  width: 200,
  height: 60,
  borderRadius: 5,
  shadowRadius: 3,
  shadowOpacity: 0.2,
  margin: 14,
  borderWidth: 2,
  shadowOffset: { width: 1, height: 2 },
  shadowColor: colors.DARK,
  borderColor: colors.DARK,
};
const styles = StyleSheet.create({
  basic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
    marginRight: 14,
  },
  normal: {
    ...normalBtn,
    backgroundColor: colors.WHITE,
    text: { fontSize: 18, color: colors.DARK },
  },
  primary: {
    ...normalBtn,
    backgroundColor: colors.DARK,
    text: { fontSize: 18, color: colors.WHITE },
  },
  text: {
    text: {
      fontSize: 24,
      color: colors.WHITE,
    },
  },
});
