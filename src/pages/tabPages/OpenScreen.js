import React from "react";
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
import i18n from "../../constans/translation/I18n";
import I18n from "../../constans/translation/I18n";
import Icon from "react-native-vector-icons/Ionicons";
import FindUs from "../tabPages/FindUs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const WINDOW_WIDTH = Dimensions.get("window").width;

const DATA = [
  {
    id: "list1",
    icon: "medical-outline",
  },
  {
    id: "list2",
    icon: "bandage-outline",
  },
  {
    id: "list3",
    icon: "fast-food-outline",
  },
  {
    id: "list4",
    icon: "medical-outline",
  },
  {
    id: "list5",
    icon: "bandage-outline",
  },
  {
    id: "list6",
    icon: "fast-food-outline",
  },
];

const verticalDATA = [
  {
    id: "verticalList1",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
  {
    id: "verticalList2",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
  {
    id: "verticalList3",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
  {
    id: "verticalList4",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
  {
    id: "verticalList5",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
  {
    id: "verticalList6",
    title: "Medicine Prospectus",
    subtitle: "You need to use ....",
  },
];

const Item = ({ icon }) => (
  <View style={styles.item}>
    <Icon name={icon} size={50} color="black" style={styles.iconStyle} />
  </View>
);

const VerticalItem = ({ title, subtitle }) => (
  <View style={styles.verticalItem}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const OpenScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item icon={item.icon} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
          style={{ flexDirection: "row" }}
        />
        <FlatList
          data={verticalDATA}
          renderItem={({ item }) => (
              <VerticalItem title={item.title} subtitle={item.subtitle}/>
          )}
          keyExtractor={(item) => item.id}
          style={{ flexDirection: "column" }}
        />
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
          backgroundColor: COLORS.white,
          height: 125,
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
              backgroundColor={COLORS.white}
              underlayColor={COLORS.white}
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
              backgroundColor={COLORS.white}
              underlayColor={COLORS.white}
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
    marginTop: 20,
    marginLeft: 10,
  },
  item: {
    backgroundColor: "#86A789",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
    width: 100,
    height: 100,
    marginBottom: 20
  },
  verticalItem: {
    backgroundColor: "#B2C8BA",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
    width: WINDOW_WIDTH - 35,
    height: 100,
    marginTop: 20
  },
  iconStyle: {
    top: 12,
    left: 15,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: "gray"
  }
});
