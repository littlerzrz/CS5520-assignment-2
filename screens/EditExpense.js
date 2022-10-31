import { View, StyleSheet, Alert } from "react-native";
import React from "react";
import { MyButton } from "../components";
import { deleteExpense, toggleImportance } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function EditExpense({ route }) {
  const navigation = useNavigation();
  const onConfirmMark = () =>
    toggleImportance(route.params.id).then(navigation.goBack);

  const onMark = () => {
    Alert.alert(
      "Important",
      "Are you sure you want to toggle its importance?",
      [
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: onConfirmMark },
      ]
    );
  };
  const onConfirmDelete = () =>
    deleteExpense(route.params.id).then(navigation.goBack);

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this expense?", [
      { text: "No", onPress: () => {} },
      { text: "Yes", onPress: onConfirmDelete },
    ]);
  };
  return (
    <View style={styles.container}>
      <MyButton text="Toggle Importance" type="primary" onPress={onMark} />
      <MyButton text="Delete" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop:80
  },
});
