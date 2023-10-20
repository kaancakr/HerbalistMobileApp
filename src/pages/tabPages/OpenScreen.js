import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import COLORS from "../../constans/colors";
import i18n from "../../constans/translation/I18n";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from "@react-navigation/stack";
import I18n from "../../constans/translation/I18n";
import Icon from "react-native-vector-icons/Ionicons";
import FindUs from "../tabPages/FindUs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const WINDOW_WIDTH = Dimensions.get("window").width;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

type ItemProps = { title: string };
const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const OpenScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
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
              color={COLORS.optimaGreen}
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
        name="Find Us"
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
              color={COLORS.optimaGreen}
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
  },
  itemContainer: {
    marginTop: 20,
  },
  item: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
  },
});
