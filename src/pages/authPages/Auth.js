import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import QRReader from "./QRReader";
import HomeScreen from "../tabPages/HomeScreen";
import OpenScreen from "../tabPages/OpenScreen";
import React, { useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../store/actions/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
// Second Stack

function Auth({ navigation }) {

  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "397825100171-0mb9mb62pcohglk6hp4pjji7cc37a76p.apps.googleusercontent.com",
    androidClientId:
      "397825100171-9p6kou3elami72qv14rth458kh8jhoc5.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Stack.Navigator
      screenOptions={{
        style: {
          height: 220,
          borderTopWidth: 0,
          elevation: 0,
          headerShown: false,
        },
      }}
    >
      <Stack.Screen
        name="OpenScreen"
        component={OpenScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="QRReader"
        component={QRReader}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default Auth;
