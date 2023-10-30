import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import COLORS from "../../constans/colors";
import I18n from "../../constans/translation/I18n";
import Icon from "react-native-vector-icons/Ionicons";
import FindUs from "../tabPages/FindUs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
import * as SplashScreen from "expo-splash-screen";
import { Searchbar } from "react-native-paper";
SplashScreen.preventAutoHideAsync();

const OpenScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    HussarBold: require("../../../assets/fonts/HussarBold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.itemContainer}>
        <Text style={styles.topContainerText}>Sağlıklı Günler...</Text>
        <Text style={styles.topContainerSecondText}>
          Anadolu Aktarına Hoşgeldiniz
        </Text>
      </View>
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder="Nasıl Yardımcı Olabiliriz ?"
          style={styles.searchbar}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <View style={styles.firstIcon}>
            <View>
              <Icon name="medical-outline" color="#247158" size={80} />
            </View>

            <Text style={{ color: "#95877A" }}>Muayene İle İlaç Seçimi</Text>
          </View>
          <View style={styles.secondIcon}>
            <View>
              <Icon name="bandage-outline" color="#247158" size={80} />
            </View>

            <Text style={{ color: "#95877A" }}>Uzman Müdahalesi</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <View style={styles.firstIcon}>
            <View>
              <Icon name="eyedrop-outline" color="#247158" size={80} />
            </View>

            <Text style={{ color: "#95877A" }}>Şifalı Karışımlar</Text>
          </View>
          <View style={styles.secondIcon}>
            <View>
              <Icon name="man-outline" color="#247158" size={80} />
            </View>

            <Text style={{ color: "#95877A" }}>Hasta Takibi</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const OpenStack = createBottomTabNavigator();

export default function OpenStackScreen({ navigation }) {
  return (
    <OpenStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 125,
          backgroundColor: "#186049",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#E2E7EA",
        },
      }}
    >
      <OpenStack.Screen
        name={I18n.t("openScreenName")}
        component={OpenScreen}
        options={{
          headerTitle: () => (
            <Image
              style={{
                width: Platform.OS === "ios" ? 120 : 100,
                height: Platform.OS === "ios" ? 100 : 50,
                backgroundColor: "#186049",
              }}
              source={require("../../assets/anadolu_aktari_logo.png")}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <Icon.Button
              style={styles.drawerStyle}
              name="person-circle-outline"
              color={"#86A789"}
              size={40}
              backgroundColor={"#186049"}
              underlayColor={"#186049"}
              onPress={() => navigation.navigate("LoginScreen")} // 'Login' should be the name of the login screen
            >
              {" "}
            </Icon.Button>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} /> // Set the icon for this screen
          ),
        }}
      />
      <OpenStack.Screen
        name="Bize Ulaşın"
        component={FindUs}
        options={{
          headerTitle: () => (
            <Image
              style={{
                width: Platform.OS === "ios" ? 120 : 100,
                height: Platform.OS === "ios" ? 100 : 50,
              }}
              source={require("../../assets/anadolu_aktari_logo.png")}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <Icon.Button
              style={styles.drawerStyle}
              name="person-circle-outline"
              color={"#86A789"}
              size={40}
              backgroundColor={"#186049"}
              underlayColor={"#186049"}
              onPress={() => navigation.navigate("LoginScreen")} // 'Login' should be the name of the login screen
            >
              {" "}
            </Icon.Button>
          ),
          headerTitleStyle: {
            color: "black",
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="flask-outline" color={color} size={size} /> // Set the icon for this screen
          ),
        }}
      />
    </OpenStack.Navigator>
  );
}

// keyExtractor={item => item.index_id.toString()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    backgroundColor: "#186049",
    height: WINDOW_HEIGHT / 2.5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topContainerText: {
    fontSize: 34,
    marginTop: 180,
    marginLeft: 30,
    color: COLORS.white,
    fontFamily: "HussarBold",
  },
  topContainerSecondText: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 30,
    color: COLORS.white,
    fontFamily: "HussarBold",
  },
  searchbarContainer: {
    width: WINDOW_WIDTH - 30,
    marginLeft: 15,
    marginTop: -20,
  },
  searchbar: {
    borderRadius: 20,
  },
  bottomContainer: {
    width: WINDOW_WIDTH - 30,
    marginLeft: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  firstIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    width: 150,
    padding: 10,
    marginRight: 40,
    marginBottom: 20,
    borderColor: "white",
    backgroundColor: "white", // Add a background color
    ...Platform.select({
      android: {
        elevation: 5, // For Android
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  secondIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    width: 150,
    padding: 10,
    marginBottom: 20,
    borderColor: "white",
    backgroundColor: "white", // Add a background color
    ...Platform.select({
      android: {
        elevation: 5, // For Android
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
});
