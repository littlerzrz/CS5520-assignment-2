import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";

export default function ExpenseItem({item}) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Edit", { id: item.id })}>
      <View style={styles.container}>
        <Text style={styles.item}>{item.text}</Text>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    
  },
  item:{
    
  }

});
