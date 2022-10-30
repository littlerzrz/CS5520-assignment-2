import { View, FlatList, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import { colors } from "../vars";
export default function ExpenseList({ list, isImportant }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={isImportant ? list.filter((item) => item.important) : list}
          renderItem={({ item }) => <ExpenseItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 4,
    marginTop: 20,
  },
});
