import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MyButton } from "../components";
import { deleteExpense, toggleImportance } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase_setup";
import { colors } from "../vars";

export default function EditExpense({ route }) {
  const {id} = route.params;
  const navigation = useNavigation();
  const [item, setItem] = useState({});
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, "expenses", id), (doc) => {
      if(!doc.exists) return;
      setItem(doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onConfirmMark = () =>
    toggleImportance(id, !item.important).then(navigation.goBack);

  const onMark = () => {
    Alert.alert(
      "Important",
      `Are you sure you want to ${item.important? 'remove' : 'mark'} important?`,
      [
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: onConfirmMark },
      ]
    );
  };
  const onConfirmDelete = () =>
    deleteExpense(id).then(navigation.goBack);

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this expense?", [
      { text: "No", onPress: () => {} },
      { text: "Yes", onPress: onConfirmDelete },
    ]);
  };
  return (
    <View style={styles.container}>
      <MyButton text={`${item.important ? 'Remove' : 'Mark'} Important`} type="primary" onPress={onMark} />
      <MyButton text="Delete" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop:80,
    backgroundColor:colors.LIGHT
  },
});
