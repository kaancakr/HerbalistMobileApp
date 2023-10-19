import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
  Linking,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import COLORS from "../../constans/colors";
import Icon from "react-native-vector-icons/Ionicons";
import I18n from "../../constans/translation/I18n";
import i18n from "../../constans/translation/I18n";
import { LanguageContext } from "./LanguageContext";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
import { useFocusEffect } from "@react-navigation/native";

const Tickets = ({ navigation }) => {
  
};

export default Tickets;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "white",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: "center",
  },
  mainBody: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imgBarrier: {
    width: 300,
    height: 250,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  titleBarrier: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 40,
    marginTop: 20,
    color: "#000",
  },
  buttonBarrier: {
    width: 240,
    height: 45,
    borderRadius: 200,
    backgroundColor: COLORS.yellow,
    marginTop: 10,
    marginLeft: 60,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: 240,
    marginTop: 10,
  },
  buttonImageIconStyle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? 10 : 40,
  },
  checkButton: {
    height: 130,
    width: 130,
    display: "none",
  },
  barrierContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barrierInfoContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 1, // Take 50% of the width
    flexDirection: "column",
    alignItems: "flex-end", // Align buttons to the right
  },
  stickyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: COLORS.tabBarColor,
    height: Platform.OS === "android" ? 90 : 103,
  },
  drawerStyle: {
    backgroundColor: "#E2E7EA",
    marginTop: Platform.OS === "android" ? 0 : 58,
    marginLeft: Platform.OS === "ios" ? 15 : 0,
    flexDirection: "row",
    marginRight: Platform.OS === "ios" ? -4.2 : 0,
  },
  gridView: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: Platform.OS === "ios" ? "center" : "flex-start",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 0 : 58,
    marginLeft: Platform.OS === "android" ? 10 : 62,
    flexDirection: "row",
  },
  itemContainer: {
    flexDirection: "row", // Separate into two sections with flexDirection 'row'
    justifyContent: "space-between", // Add space between the two sections
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
    width: WINDOW_WIDTH - 20,
    marginLeft: 10,
    height: 140,
    alignItems: "center",
  },
  topPart: {
    height: Platform.OS === "android" ? 100 : 130,
  },
  infoContainer: {
    flex: 1, // Take 50% of the width
  },
  itemName: {
    marginTop: 30,
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    backgroundColor: "#636e72",
    color: "white",
    padding: 10,
  },
  openBarrierButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffc107",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  openCameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  cameraIcon: {
    width: 20, // Set the width of the camera icon
    height: 20, // Set the height of the camera icon
    marginRight: 8, // Add some margin between the icon and text
  },
  openBarrierButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  openCameraButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
