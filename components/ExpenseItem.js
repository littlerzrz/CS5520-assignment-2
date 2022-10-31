import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { colors, pressedStyle } from "../vars";

export default function ExpenseItem({ item }) {
  const navigation = useNavigation();
  const backgroundColor = item.important ? colors.MID : colors.MID_DARK;
  return (
    <View style={styles.main}>
      <Pressable
        onPress={() => navigation.navigate("Edit", { id: item.id })}
        style={({ pressed }) => {
          return pressed && pressedStyle;
        }}
        android_ripple={{ color: colors.LIGHT, foreground: true }}
      >
        <View style={[styles.container, { backgroundColor }]}>
          <Text style={styles.text}>{item.description}</Text>
          <View style={styles.cost}>
            <Text style={styles.text}>{item.cost}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    margin: 8,
  },
  container: {
    flexDirection: "row",
    width: 300,
    height: 60,
    backgroundColor: colors.MID_DARK,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: colors.DARK,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cost: {
    width: 60,
    height: 40,
    backgroundColor: colors.LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
