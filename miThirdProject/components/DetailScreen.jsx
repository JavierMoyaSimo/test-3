import HomeScreen from "./HomeScreen";
import { Text, View, Button } from "react-native";

const DetailScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default DetailScreen;

