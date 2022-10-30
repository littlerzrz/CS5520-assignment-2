import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";

const Tab = createBottomTabNavigator();

const Container = ({ type }) => {
  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "expenses"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setExpenses([]);
          return;
        }
        setExpenses(querySnapshot.docs.map((snapDoc) => snapDoc.data()));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const screenOptions = {};

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="All" component={AllExpenses} options={options.all} />
      <Tab.Screen
        name="Important"
        component={Important}
        options={options.important}
      />
    </Tab.Navigator>
  );
}
