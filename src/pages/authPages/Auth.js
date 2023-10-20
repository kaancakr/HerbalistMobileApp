import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import QRReader from "./QRReader";
import HomeScreen from "../tabPages/HomeScreen";
import OpenScreen from "../tabPages/OpenScreen"

const Stack = createStackNavigator();
// Second Stack

function Auth({ navigation }) {
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
