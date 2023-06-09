import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
// New imports
import { useDispatch } from "react-redux";
import { addDetail } from "../reducers";
import { useState, useEffect } from "react";
import { getUsers } from "../services/apiCalls";


const HomeScreen = ({ navigation, route }) => {

  const { lightMode } = route.params;
  console.log(lightMode);

  //useEffect
  useEffect(() => {
    if (lightMode === true) {
      console.log("lightMode change" , lightMode)
    }
  }, [lightMode]);
  // //Normal mode- dark mode
  // const [darkMode, setDarkMode] = useState(false);

  // //Handle-button
  // const handleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   dispatch(addDetailsDark({  detailsDark: darkMode }));
  // };

  const emSize = 16; // Tamaño base en píxeles para 1em
  const paddingSize = 4; // Tamaño deseado en em

  // Cálculo del tamaño de padding en píxeles
  const paddingTrue = paddingSize * emSize;

  const styles = StyleSheet.create({
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
    totalWidth: {
      // flex: 1,
      width: "100%",
      // display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
    },
    //PRUEBA
    containerLight: {
      backgroundColor: "blue",
      padding: paddingTrue,
    },
    containerDark: {
      backgroundColor: "orange",
      padding: paddingTrue,
    },
    //TERMINAPRUEBA
    table: {
      // flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    flex: {
      // flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    widthMax: {
      // flex: 1,
      // marginBottom: 16,
      // backgroundColor: "lightblue",
      width: "25%",
    },
    hr: {
      width: "100%",
      borderBottomColor: "black",
      borderBottomWidth: 1,
      // marginVertical: 10,
    },
    header: {
      backgroundColor: "rgba(190, 164, 223, 0.219)",
      width: "100%",
    },
    image: {
      maxWidth: 60,
      height: "auto",
      cursor: "pointer",
    },
  });

  const dispatch = useDispatch();

  //HOOKS

  //useState
  const [users, setUsers] = useState([]);

  //useEffect
  useEffect(() => {
    if (users.length === 0) {
      getUsers()
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => console.error(error));
    }
  }, [users.length]);

  //FUNCTIONS

  const clickedUser = (user) => {
    dispatch(addDetail({ ...user, details: user }));

    setTimeout(() => {
      navigation.navigate("DetailScreen");
    }, 750);
  };

  //RENDER

  if (users) {
    return (
      <ScrollView contentContainerStyle={styles.totalWidth}>
        {/* <View
          style={lightNight ? [styles.light, styles.button] : [styles.dark, styles.button]}
          onClick={handleDarkMode}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="1.5em"
              viewBox="0 0 512 512"
            >
              <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 384 512"
            >
              <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
            </svg>
          )}
        </View> */}
        <View style={lightMode ?[styles.containerLight, styles.table] :[styles.containerDark, styles.table] }>
          <View style={[styles.flex, styles.header]}>
            <Text style={styles.widthMax}>ID</Text>
            <Text style={styles.widthMax}>Name</Text>
            <Text style={styles.widthMax}>Status</Text>
            <Text style={styles.widthMax}>Species</Text>
            <Text style={styles.widthMax}>Face</Text>
          </View>

          {users.map((user, index) => (
            <View key={index}>
              <View  style={styles.flex}>
                <TouchableOpacity
                  style={styles.widthMax}
                  onPress={() => clickedUser(user)}
                >
                  <Text>{user.id}</Text>
                </TouchableOpacity>

                <Text style={styles.widthMax}>{user.name}</Text>
                <Text style={styles.widthMax}>{user.status}</Text>
                <Text style={styles.widthMax}>{user.species}</Text>
                <View style={styles.widthMax}>
                  <TouchableOpacity onPress={() => clickedUser(user)}>
                    <Image
                      source={{ uri: user.image }}
                      alt={user.name}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.hr} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

export default HomeScreen;
