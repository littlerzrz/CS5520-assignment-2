import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { MyButton } from "../components";
import { colors } from "../vars";
import { addExpense } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function AddExpense() {
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const invalidInputAlert = () =>
    Alert.alert("Invalid Input", "Please check you input");
  const isPositiveInt = (str) => {
    if (typeof str != "string") return false;
    const num = Number(str);
    if (Number.isInteger(num) && num > 0) return true;
    return false;
  };
  const onSubmit = () => {
    if (!isPositiveInt(cost) || !description) return invalidInputAlert();
    addExpense({ cost, description }).then(() => {
      navigation.goBack();
    });
  };
  const onCancel = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Expense</Text>
      <View style={{ marginTop: 30 }}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setCost}
          value={cost}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <Text>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
        />
      </View>
      <View style={styles.buttons}>
        <MyButton text="Cancel" onPress={onCancel} />
        <MyButton text="Submit" type="primary" onPress={onSubmit} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 80,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
  },
  input: {
    marginTop: 8,
    height: 50,
    width: 350,
    backgroundColor: colors.MID_LIGHT,
    borderRadius: 5,
    padding: 10,
  },
  textArea: {
    height: 150,
    textAlign: "top",
  },
  buttons: {
    flexDirection: "row",
  },
});
