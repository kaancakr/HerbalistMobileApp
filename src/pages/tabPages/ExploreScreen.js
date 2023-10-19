import React from "react";
import {
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import COLORS from "../../constans/colors";

const BASE_PADDING = 20;

const WINDOW_WIDTH = Dimensions.get("window").width;

const ExploreScreen = ({ navigation }) => {

};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: BASE_PADDING,
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  row: {
    flexDirection: "row",
    marginLeft: -BASE_PADDING,
    marginRight: -BASE_PADDING,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  PlateSize: {
    fontSize: 15,
    justifyContent: "center",
  },
  content: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.darkGray,
  },

  sectionHeader: {
    fontSize: 22,
    backgroundColor: COLORS.softGray,
    padding: 20,
    borderRadius: 10,
    width: WINDOW_WIDTH - 20,
    marginLeft: 10,
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 24,
  },
  pickerContainer: {
    height: Platform.OS === "ios" ? 160 : 50,
    marginTop: Platform.OS === "ios" ? -30 : 10,
  },
  drawerStyle: {
    marginRight: Platform.OS === "ios" ? -1.2 : 3.5,
  },
  menuButtonContainer: {
    flex: 1,
    alignItems: "flex-end", // Use alignItems: 'flex-end' to align the trash can icon to the right side
  },
  menuButton: {},
});
