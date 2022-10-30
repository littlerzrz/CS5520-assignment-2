import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ list }) {
  return (
    <View>
      <FlatList
        data={list}
        renderItem={({ item }) => <ExpenseItem item={item} />}
      />
    </View>
  );
}
