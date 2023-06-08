import HomeScreen from "./HomeScreen";
import { Text, View, Button } from "react-native";

const DetailScreen = ({ navigation, route }) => {
  return (
    <View>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default DetailScreen;

