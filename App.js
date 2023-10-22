import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { DrawerContent } from "./src/components/drawer/DrawerContent";
import { LanguageProvider } from "./src/pages/tabPages/LanguageContext";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Auth from "./src/pages/authPages/Auth";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

StatusBar.setBarStyle("dark-content");

// App Main Screen Stack

const MyStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="tab"
        component={MainTabScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
    </Drawer.Navigator>
  );
};
// App Main Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="auth"
        component={Auth}
        options={{
          drawerHideStatusBarOnOpen: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//Redux Provider
const App = () => {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </Provider>
    </LanguageProvider>
  );
};

export default App;
