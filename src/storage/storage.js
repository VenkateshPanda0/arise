import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user) => {
  await AsyncStorage.setItem("ARISE_USER", JSON.stringify(user));
};

export const loadUser = async () => {
  const data = await AsyncStorage.getItem("ARISE_USER");
  return data ? JSON.parse(data) : null;
};

export const resetUser = async () => {
  await AsyncStorage.removeItem("ARISE_USER");
};