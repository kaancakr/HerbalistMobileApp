import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../constans/colors";
import { createStackNavigator } from "@react-navigation/stack";
import I18n from "../../constans/translation/I18n";

const WINDOW_WIDTH = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  
};
const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
          height: 110,
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#E2E7EA",
        },
      }}
    >
      <HomeStack.Screen
        name={I18n.t("homeScreenName")}
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Image
              style={{
                width: Platform.OS === "ios" ? 120 : 100,
                height: Platform.OS === "ios" ? 100 : 50,
              }}
              source={require("../../assets/Optima-logo.png")}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <Icon.Button
              style={styles.drawerStyle}
              name="settings"
              color={COLORS.optimaGreen}
              size={25}
              backgroundColor={COLORS.white}
              underlayColor={COLORS.white}
              onPress={() => navigation.openDrawer()}
            >
              {" "}
            </Icon.Button>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

// keyExtractor={item => item.index_id.toString()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: WINDOW_WIDTH - 20,
    backgroundColor: COLORS.white,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: COLORS.optimaRed,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    marginLeft: 5,
    marginTop: 10,
  },
});
