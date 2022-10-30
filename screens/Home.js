import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase_setup";
import { ExpenseList } from "../components";
import { screenOptions } from "../vars";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../vars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "expenses"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setExpenses([]);
          return;
        }
        setExpenses(
          querySnapshot.docs.map((snapDoc) => ({
            ...snapDoc.data(),
            id: snapDoc.id,
          }))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const headerRight = () => (
    <Pressable
      onPress={() => navigation.navigate("Add")}
      style={{ marginRight: 20 }}
    >
      <Text style={{ color: colors.WHITE, fontSize: 24 }}>+</Text>
    </Pressable>
  );
  const newScreenOptions = {
    ...screenOptions,
    headerRight,
    tabBarStyle: {
      backgroundColor: colors.DARK,
    },
    tabBarActiveTintColor: colors.MID_LIGHT,
  };
  return (
    <Tab.Navigator
      screenOptions={newScreenOptions}
    >
      <Tab.Screen
        name="All"
        options={{
          headerTitle: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="currency-usd"
              color={color}
              size={size}
            />
          ),
        }}
        children={() => <ExpenseList list={expenses} />}
      />
      <Tab.Screen
        name="Important"
        options={{
          headerTitle: "Important Expenses",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="exclamation"
              color={color}
              size={size}
            />
          ),
        }}
        children={() => <ExpenseList list={expenses} isImportant={true} />}
      />
    </Tab.Navigator>
  );
}
