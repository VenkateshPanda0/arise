import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./src/navigation/MainNavigator";
import AuthScreen from "./src/screens/AuthScreen";
import { loadUser, saveUser } from "./src/storage/storage";
import { checkAndResetDaily } from "./src/system/dailyReset";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user on app start
  useEffect(() => {
    const init = async () => {
      try {
        let storedUser = await loadUser();

        if (storedUser) {
          // Apply daily reset logic
          storedUser = checkAndResetDaily(storedUser);
          setUser(storedUser);
          await saveUser(storedUser);
        }
      } catch (e) {
        console.log("Load error:", e);
      }

      setLoading(false);
    };

    init();
  }, []);

  // 🔹 Save user whenever it changes
  useEffect(() => {
    if (user) {
      saveUser(user);
    }
  }, [user]);

  // 🔹 Loading screen
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color="#00D4FF" />
      </View>
    );
  }

  // 🔹 Main App
  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator user={user} setUser={setUser} />
      ) : (
        <AuthScreen setUser={setUser} />
      )}
    </NavigationContainer>
  );
}