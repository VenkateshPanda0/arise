import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import TasksScreen from "../screens/TasksScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator({ user, setUser }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        // 🔹 Tab bar styling
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#111",
          height: 60,
          paddingBottom: 8,
        },

        tabBarActiveTintColor: "#00D4FF",
        tabBarInactiveTintColor: "#666",

        // 🔹 Icons
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Stats":
              iconName = "bar-chart-outline";
              break;
            case "Tasks":
              iconName = "checkbox-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      {/* 🔹 HOME */}
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen {...props} user={user} setUser={setUser} />
        )}
      </Tab.Screen>

      {/* 🔹 STATS */}
      <Tab.Screen name="Stats">
        {(props) => (
          <StatsScreen {...props} user={user} />
        )}
      </Tab.Screen>

      {/* 🔹 TASKS */}
      <Tab.Screen name="Tasks">
        {(props) => (
          <TasksScreen {...props} user={user} setUser={setUser} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}