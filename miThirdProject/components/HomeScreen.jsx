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

const HomeScreen = ({ navigation }) => {
  const emSize = 16; // Tamaño base en píxeles para 1em
  const paddingSize = 4; // Tamaño deseado en em

  // Cálculo del tamaño de padding en píxeles
  const paddingTrue = paddingSize * emSize;

  const styles = StyleSheet.create({
    totalWidth: {
      // flex: 1,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
    },
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
        <View style={[styles.container, styles.table]}>
          <View style={[styles.flex, styles.header]}>
            <Text style={styles.widthMax}>ID</Text>
            <Text style={styles.widthMax}>Name</Text>
            <Text style={styles.widthMax}>Status</Text>
            <Text style={styles.widthMax}>Species</Text>
            <Text style={styles.widthMax}>Face</Text>
          </View>

          {users.map((user, index) => (
            <>
              <View key={index} style={styles.flex}>
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
            </>
          ))}
        </View>
      </ScrollView>
    );
  }
};

export default HomeScreen;
