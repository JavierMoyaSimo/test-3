//Imports
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addDetail } from "../reducers";
import { useState, useEffect } from "react";
import { getUsers } from "../services/apiCalls";

const HomeScreen = ({ navigation, route }) => {
  //darkMode params
  const { lightMode } = route.params;

  // Calculation of padding size in pixels
  const emSize = 16;
  const paddingSize = 4;
  const paddingTrue = paddingSize * emSize;

  //Styles
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
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
    },
    containerLight: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
      color: "white",
    },
    containerDark: {
      backgroundColor: "white",
      padding: paddingTrue,
      color: "black",
    },
    table: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    flex: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    widthMax: {
      width: "20%",
      padding: 2,
    },
    hr: {
      width: "100%",
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    header: {
      backgroundColor: "rgba(190, 164, 223, 0.219)",
    },
    image: {
      width: 50,
      height: 50,
    },
  });

  

  //HOOKS

  //useState
  const [users, setUsers] = useState([]);

  //useEffect to get data from the api
  useEffect(() => {
    if (users.length === 0) {
      getUsers()
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => console.error(error));
    }
  }, [users.length]);

  //useEffect to see the value of lightmode
  useEffect(() => {
    if (lightMode === true) {
      console.log("lightMode change", lightMode);
    }
  }, [lightMode]);


  const dispatch = useDispatch();
  
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
        <View
          style={
            lightMode
              ? [styles.containerLight, styles.table]
              : [styles.containerDark, styles.table]
          }
        >
          <View style={[styles.flex, styles.header]}>
            <Text style={styles.widthMax}>ID</Text>
            <Text style={styles.widthMax}>Name</Text>
            <Text style={styles.widthMax}>Status</Text>
            <Text style={styles.widthMax}>Species</Text>
            <Text style={styles.widthMax}>Face</Text>
          </View>

          {users.map((user, index) => (
            <View style={styles.width100} key={index}>
              <View style={styles.flex}>
                <Text style={styles.widthMax}>{user.id}</Text>
                <Text style={styles.widthMax}>{user.name}</Text>
                <Text style={styles.widthMax}>{user.status}</Text>
                <Text style={styles.widthMax}>{user.species}</Text>
                <View style={styles.widthMax}>
                  <TouchableOpacity onPress={() => clickedUser(user)}>
                    <Image
                      accessibilityLabel={user.name}
                      source={{ uri: user.image }}
                      style={[styles.image]}
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
