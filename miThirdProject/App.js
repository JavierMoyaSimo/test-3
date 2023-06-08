import { Button, StyleSheet } from "react-native";
//New imports
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Components
import HomeScreen from "./components/HomeScreen";
import DetailScreen from "./components/DetailScreen";
//Redux
import { Provider } from "react-redux";
import store from "./app/store";

//To navigate
const Stack = createNativeStackNavigator();

export default function App() {
  //Normal mode- dark mode
  const [darkMode, setDarkMode] = useState(false);

  //Handle-button
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Button
          style={
            darkMode
              ? [styles.dark, styles.button]
              : [styles.light, styles.button]
          }
          onPress={handleDarkMode}
        >
          {darkMode ? "To Day!" : "To Night!"}
        </Button>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            style={darkMode ? styles.light : styles.dark}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            style={darkMode ? styles.light : styles.dark}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  light: {
    backgroundColor: "rgba(149, 174, 216, 0.215)",
    color: "black",
  },
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  button: {
    height: "5%",
    textAlign: "center",
    cursor: "pointer",
  },
});
