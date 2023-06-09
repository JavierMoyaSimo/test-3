//Imports
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { detailData } from "../reducers";

const DetailScreen = ({ navigation, route }) => {
  //darkMode params
  const { lightMode } = route.params;

  //Calculation of padding size in pixels
  const emSize = 16;
  const fontSize = 4;
  const paddingSize = 3;
  const fontTrue = fontSize * emSize;
  const paddingTrue = emSize * paddingSize;

  //Styles
  const styles = StyleSheet.create({
    viewDiv: {
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    infoDetail: {
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
    image: {
      width: 200,
      height: 200,
    },
    containerLight: {
      backgroundColor: "black",
      padding: paddingTrue,
    },
    containerDark: {
      backgroundColor: "rgba(149, 174, 216, 0.215)",
      padding: paddingTrue,
    },
    whiteLetter: {
      color:"white"
    },
    blackLetter: {
      color:"black"
    }
  });

  //Data from Redux
  const selectedUser = useSelector(detailData);

  //FUNCTIONS
  const returnHome = () => {
    navigation.navigate("HomeScreen");
  };

  //RENDER
  if (selectedUser?.id !== undefined) {
    return (
      <ScrollView
        contentContainerStyle={
          lightMode
            ? [styles.containerLight, styles.viewDiv]
            : [styles.containerDark, styles.viewDiv]
        }
      >
        <Text style={lightMode ?[styles.title, styles.whiteLetter] : [styles.title, styles.blackLetter] }>{selectedUser?.name}</Text>
        <View style={styles.contentDetail}>
          <View style={styles.infoDetail}>
            <View style={styles.detailLi}>
              <Text style={lightMode ?[styles.boldText, styles.whiteLetter] : [styles.boldText, styles.blackLetter] }>Id -</Text>
              <Text style={lightMode ?styles.whiteLetter : styles.blackLetter }>{selectedUser?.id}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={lightMode ?[styles.boldText, styles.whiteLetter] : [styles.boldText, styles.blackLetter] }>Name - </Text>
              <Text style={lightMode ?styles.whiteLetter : styles.blackLetter }>{selectedUser?.name}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={lightMode ?[styles.boldText, styles.whiteLetter] : [styles.boldText, styles.blackLetter] }>Status -</Text>
              <Text style={lightMode ?styles.whiteLetter : styles.blackLetter }>{selectedUser?.status}</Text>
            </View>
            <View style={styles.detailLi}>
              <Text style={lightMode ?[styles.boldText, styles.whiteLetter] : [styles.boldText, styles.blackLetter] }>Specie - </Text>
              <Text style={lightMode ?styles.whiteLetter : styles.blackLetter }>{selectedUser?.species}</Text>
            </View>
          </View>
          <View style={styles.imgDiv}>
            <Image source={{ uri: selectedUser?.image }} style={styles.image} />
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
        <Text style={lightMode ?[styles.boldText, styles.whiteLetter] : [styles.boldText, styles.blackLetter] }>Sorry, there has been an error</Text>
        <View style={styles.errorButton}>
          <Button title="Home" onPress={returnHome} />
        </View>
      </View>
    );
  }
};

export default DetailScreen;
