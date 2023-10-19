import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Init } from "./src/store/actions/auth";
import { store } from "./src/store";
import { DrawerContent } from "./src/components/drawer/DrawerContent";
import COLORS from "./src/constans/colors";
import { LanguageProvider } from "./src/pages/tabPages/LanguageContext";

import MainTabScreen from "./src/pages/tabPages/MainTabScreen";
import Auth from "./src/pages/authPages/Auth";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

StatusBar.setBarStyle('dark-content'); 

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

const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.Reducers.authToken);
  const authUserId = useSelector((state) => state.Reducers.authUserId);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  //Token Authorization
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />

        {token === null ? <AuthStack /> : <MyStack />}
      </NavigationContainer>
    </LanguageProvider>
  );
};
//Redux Provider
const App = () => {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </LanguageProvider>
  );
};

export default App;
