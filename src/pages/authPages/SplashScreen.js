import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export default class SplashScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../IMAGE/ekran2.png")}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.header}>
          <Image
            animation="bounceIn"
            source={require("../assets/Optima-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <ImageBackground
          source={require("../IMAGE/ekran2.png")}
          resizeMode="stretch"
          style={[styles.footer, {}]}
        >
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignInScreen")}
            >
              <Text style={styles.textSign}> Get started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    );
  }
}

const height_logo = height * 0.5;
const width_logo = width * 0.75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 66,
    paddingHorizontal: 15,
  },
  logo: {
    width: width_logo,
    height: height_logo,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: width / 4 + 10,
  },
  signIn: {
    width: 160,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    textAlign: "center",
  },
  textSign: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
