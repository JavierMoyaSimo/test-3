//Imports
import { Button, StyleSheet, View } from "react-native";
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
  //Normal mode - dark mode
  const [darkMode, setDarkMode] = useState(false);

  //Handle-button
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <View style={ darkMode ? [styles.container, styles.light] : [styles.container, styles.dark]}>
        <View style={darkMode ? styles.light : styles.dark}>
          <Button
            title={darkMode ? "To Day!" : "To Night!"}
            onPress={handleDarkMode}
          />
        </View>
        <NavigationContainer style={styles.toFlex}>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              initialParams={{ lightMode: darkMode }}
            />
            <Stack.Screen
              name="DetailScreen"
              component={DetailScreen}
              initialParams={{ lightMode: darkMode }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  toFlex: {
    flexDirection: "column",
  },
});
