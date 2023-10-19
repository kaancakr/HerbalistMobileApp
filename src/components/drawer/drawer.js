import React from "react";
import { StyleSheet, Image } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
//BlurView
import { BlurView } from "expo-blur";
//Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomDrawerContent from "./customDrawer";
import Stack from "../stack/stack";
const AppDrawer = createDrawerNavigator();

const Drawer = () => {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerTransparent: { position: "absolute", backgroundColor: "black" },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={30}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerTintColor: "#000",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <AppDrawer.Screen
        name="Stack"
        component={Stack}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name="settings"
              size={40}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
          headerTitle: (
            props // App Logo
          ) => (
            <Image
              style={{
                width: Platform.OS === "ios" ? 120 : 120,
                height: Platform.OS === "ios" ? 100 : 120,
                position: "absolute",
              }}
              //source={require('./src/assets/Optima-logo.png')}
              resizeMode="center"
            />
          ),

          // headerRight: () => (
          //   <Ionicons
          //     name="settings"
          //     color="black"
          //     size={25}
          //     backgroundColor="#E2E7EA"
          //     onPress={() => navigation.openDrawer()}> </Ionicons>
          // ),
        }}
      />
    </AppDrawer.Navigator>
  );
};

export default Drawer;
