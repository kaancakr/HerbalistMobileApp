import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import Tickets from "./Tickets";
import ExploreScreen from "./ExploreScreen";
import SendNotifications from "./SendNotifications";
import SlidingButton from "../../components/drawer/SlidingButton";
import COLORS from "../../constans/colors";
import I18n from "../../constans/translation/I18n";
import { LanguageContext } from "./LanguageContext";

//const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabScreen({ navigation }) {
  const languageContext = useContext(LanguageContext);
  const selectedLanguage = languageContext.selectedLanguage;

  const [setInformationModalVisible] = useState(false);

  const handleOpenInformationTab = () => {
    setInformationModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { height: 90, backgroundColor: COLORS.white},
          tabBarLabelStyle: { marginBottom: 5, fontSize: 12, color: COLORS.white },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === "Home") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Previous Tickets") {
              iconName = focused ? "receipt" : "receipt-outline";
            } else if (route.name === "White List") {
              iconName = focused ? "car" : "car-outline";
            } else if (route.name === "Notifications") {
              iconName = focused ? "notifications" : "notifications-outline";
            }
        
            return (
              <Icon
                name={iconName}
                size={size}
                color={focused ? COLORS.optimaGreen : COLORS.optimaGrey} // Set color based on focus state
                style={{ marginBottom: -10 }}
              />
            );
          },
        })}        
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: I18n.t("plateList"),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarColor: "#009387",
            headerShown: false,

            tabBarActiveTintColor: COLORS.optimaGreen,
            tabBarInactiveTintColor: COLORS.optimaGrey,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Previous Tickets"
          component={Tickets}
          options={{
            headerStyle: {
              backgroundColor: "#E2E7EA",
            },

            tabBarLabel: I18n.t("ticketsPrevious"),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            headerTitle: (
              props // App ar
            ) => (
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
                color="black"
                size={25}
                backgroundColor="#E2E7EA"
                onPress={() => navigation.openDrawer()}
              >
                {" "}
              </Icon.Button>
            ),
            tabBarActiveTintColor: COLORS.optimaGreen,
            tabBarInactiveTintColor: COLORS.optimaGrey,
          }}
        />
        <Tab.Screen
          name="White List"
          component={ExploreScreen}
          options={{
            headerShown: false,
            tabBarLabel: I18n.t("whiteList"),
            tabBarLabelStyle: {
              fontSize: 12,
            },

            tabBarActiveTintColor: COLORS.optimaGreen,
            tabBarInactiveTintColor: COLORS.optimaGrey,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={SendNotifications}
          options={{
            headerStyle: {
              backgroundColor: COLORS.optimaBlack,
            },

            tabBarLabel: I18n.t("notifications"),
            tabBarLabelStyle: {
              fontSize: 12,
            },
            headerTitle: (
              props // App ar
            ) => (
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
                color="black"
                size={25}
                backgroundColor={COLORS.optimaBlack}
                onPress={() => navigation.openDrawer()}
              >
                {" "}
              </Icon.Button>
            ),
            tabBarActiveTintColor: COLORS.optimaGreen,
            tabBarInactiveTintColor: COLORS.optimaGrey,
          }}
        />
      </Tab.Navigator>
      <View style={styles.slidingButtonContainer}>
        <SlidingButton
          onPressCamera={() => setCameraPickerVisible(true)}
          onPressInfo={handleOpenInformationTab}
          onPressFilter={() => navigation.navigate("FilterScreen")}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

export default MainTabScreen;

// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#E2E7EA',
//     },
//     headerTintColor: '#000',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//       color: '#E2E7EA'
//     }
//   }}>
//     <HomeStack.Screen name="menu" component={HomeScreen}
//       options={{
//       headerTitle: (props) => ( // App Logo
//       <Image
//         style={{ width: Platform.OS === 'ios' ? 120 : 100, height: Platform.OS === 'ios' ? 100 : 50 }}
//         source={require('../../assets/Optima-logo.png')}
//         resizeMode='contain'
//       />),
//         headerRight: () => (
//           <Icon.Button style={styles.drawerStyle}
//             name="settings"
//             color="black"
//             size={25}
//             backgroundColor="#E2E7EA"
//             onPress={() => navigation.openDrawer()}> </Icon.Button>
//         )
//       }} />
//       <HomeStack.Screen name="filter" component={FilterScreen}
//       />

//   </HomeStack.Navigator>
// );

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#777",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  drawerStyle: {
    color: "#000",
    paddingRight: 3,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.optimaBlack, // Set your desired background color
  },
  slidingButtonContainer: {
    position: "absolute",
    bottom: 35, // Adjust the position as needed
    left: Dimensions.get("window").width / 2 - 30, // Adjust the position as needed
    justifyContent: "center",
    alignItems: "center",
  },
});
