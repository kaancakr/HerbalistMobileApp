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
  imageContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 5,
  },
  blockImage: {
    width: 150,
    height: 120,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 2,
  },
  plateName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
  },
  time: {
    fontSize: 14,
  },
  directionContainer: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  root: {
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: 10,
    paddingRight: 15,
    width: WINDOW_WIDTH - 10,
    marginLeft: 5,
  },
  separator: {
    height: 2,
    backgroundColor: "pink",
  },
  row: {
    flexDirection: "row",
    marginLeft: -50,
    marginRight: -20,
    height: Platform.OS === "ios" ? 110 : 90,
  },
  col1: {
    flex: 1,
    marginLeft: Platform.OS === "ios" ? 50 : 40,
    marginRight: Platform.OS === "ios" ? 50 : 10,
  },
  col2: {
    flex: 1,
    marginLeft: Platform.OS === "ios" ? 10 : 10,
    marginRight: Platform.OS === "ios" ? 20 : 40,
  },
  itemViewContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  col3: {
    flex: 0.1,
    marginRight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
  },
  drawerStyle: {
    marginRight: Platform.OS === "ios" ? -5 : 0,
  },
  modalHeader: {
    flexDirection: "row",
    maxWidth: 500,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffff",
  },
  switchText: {
    fontSize: 18,
  },
  modalText: {
    paddingLeft: 5,
    paddingBottom: 5,
  },
  ticketIcon: {
    marginTop: 10,
  },
  selectedCameras: {
    flexDirection: "row",
    width: 200,
    height: 300,
    marginTop: 20,
    marginLeft: 55,
  },
  pageSliderIcon: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#DBDEE2",
    borderColor: "#DBDEE2",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#ffff",
  },
  whiteList: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: COLORS.optimaGrey,
  },
  whiteListContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    position: "absolute",
    left: 0,
    right: 0,
    height: 800,
  },
  whiteListContent: {
    marginTop: 8, // Adjust the margin as needed
  },
  closeButtonStyle: {
    position: "relative",
    top: -37,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 300,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  listStyle: {
    borderRadius: 16,
  },
  modeSelector: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: 200,
    marginLeft: 80,
    backgroundColor: COLORS.optimaYellow,
    borderColor: COLORS.optimaYellow,
  },
  gateContainer: {
    backgroundColor: COLORS.white,
    height: 200,
    marginTop: 10,
    padding: 10,
    width: WINDOW_WIDTH - 20,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
  },
});
