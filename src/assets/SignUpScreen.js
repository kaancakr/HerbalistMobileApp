import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";

import I18n from "../../constans/translation/I18n";
import COLORS from "../../constans/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

export default class SignUpScreen extends Component {
  render() {
    return (
      <View resizeMode="cover" style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text alignItems="center">
              <Icon name="arrow-back" color={COLORS.white} size={30} />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT / 2,
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.textFont}>{I18n.t("signUpScreenText")}</Text>
          <Text style={styles.textFontMail}>
            {I18n.t("signUpScreenCommunicate")}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e2024",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Platform.OS === "ios" ? 15 : 15,
    paddingBottom: 150,
    width: WINDOW_WIDTH,
    marginTop: Platform.OS === "ios" ? 50 : 50,
  },
  textFont: {
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 45,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  textFontMail: {
    marginLeft: 45,
    fontSize: 15,
    lineHeight: 40,
    marginTop: 10,
    color: "white",
  },
  mainBody: {
    marginTop: 50,
    marginLeft: 24,
    marginRight: 24,
    marginEnd: 24,
    marginBottom: 50,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
