import HomeScreen from "./HomeScreen";
import { Text, View, Button, Image, StyleSheet, ScrollView } from "react-native";
//Imports
import { useSelector } from "react-redux";
import { detailData } from "../reducers";

const DetailScreen = ({ navigation, route }) => {
  const emSize = 16; // Tamaño base en píxeles para 1em
  const fontSize = 4; // Tamaño deseado en em
  const paddingSize = 3;
  const errorFontSize = 2;

  // Cálculo del tamaño de padding en píxeles
  const fontTrue = fontSize * emSize;
  const paddingTrue = emSize * paddingSize;
  const errorFont = emSize * errorFontSize;

  const styles = StyleSheet.create({
    viewDiv: {
      flex: 1,
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      fontSize: fontTrue,
      fontWeight: "bold",
      textAlign: "center",
    },
    contentDetail: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    infoDetail: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
    },
    detailLi: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    imgDiv: {
      padding: paddingTrue,
    },
    detailButton: {
      padding: emSize,
      cursor: "pointer",
    },
    toLight: {
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
    },
    toDark: {
      borderWidth: 1,
      borderColor: "white",
      borderStyle: "solid",
    },
    errorView: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "red",
      fontSize: "2em",
    },
    errorButton: {
      borderWidth: 2,
      borderColor: "red",
      borderStyle: "solid",
    },
    boldText: {
      fontWeight: "bold",
    },
  });

  //Data from Redux
  const selectedUser = useSelector(detailData);

  // const prop = props;
  // console.log(prop);

  //FUNCTIONS
  const returnHome = () => {
    navigation.navigate("HomeScreen");
  };

  //RENDER

  if (selectedUser?.id !== undefined) {
    return (
      <ScrollView contentContainerStyle={styles.viewDiv}>
        <Text style={styles.title}>{selectedUser?.name}</Text>
        <View style={styles.contentDetail}>
          <View style={styles.infoDetail}>
            <View style={styles.detailLi}>
              <Text style={styles.boldText}>Id -</Text>{" "}
              <Text>{selectedUser?.id}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={styles.boldText}>Name - </Text>
              <Text>{selectedUser?.name}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={styles.boldText}>Status -</Text>{" "}
              <Text>{selectedUser?.status}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={styles.boldText}>Specie - </Text>
              <Text>{selectedUser?.species}</Text>
            </View>
          </View>
          <View style={styles.imgDiv}>
            <Image
              src={{ uri: selectedUser?.image }}
              style={{ maxWidth: 300, height: "auto" }}
            />
          </View>
        </View>
        <View style={styles.detailButton}>
          <Button title="Home" onPress={returnHome} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.errorView}>
        <Text>Sorry, there has been an error</Text>
        <View style={styles.errorButton}>
          <Button title="Home" onPress={returnHome} />
        </View>
      </View>
    );
  }
};

export default DetailScreen;
