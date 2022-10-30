import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const Container = (type) => {
  return (
    <SafeAreaView>
      <View>

      </View>
    </SafeAreaView>
  )
}


export default function Home() {
  const screenOptions = {

  }
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
