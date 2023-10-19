import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust the import as needed
import COLORS from "../../constans/colors";

const WINDOW_WIDTH = Dimensions.get("window").width;

const PageSlider = ({ countPage, totalPage, prevPage, nextPage }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          flex: 0.1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderWidth: 2,
          padding: 5,
          borderColor: COLORS.optimaGreen,
          backgroundColor: COLORS.white,
          marginRight: 7,
          marginLeft: 7,
          marginBottom: 10,
          overflow: "hidden",
        },
      ]}
    >
      {/* flex: 1 */}
      <View style={{ flex: 2, backgroundColor: "white" }}>
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <View style={{ flex: 2, backgroundColor: COLORS.white }} />
          <View style={{ flex: 3, backgroundColor: COLORS.white }}>
            <View
              style={{
                flex: 1,
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  prevPage();
                }}
              >
                <Icon
                  name="arrow-back"
                  color={COLORS.optimaGreen}
                  resizeMode="center"
                  size={30}
                  style={{ height: 50, width: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Flex : 2 */}
      <View style={{ flex: 2 }}>
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <View style={{ flex: 3, backgroundColor: COLORS.white }}>
            <View
              style={[
                styles.container,
                {
                  flexDirection: "column",
                },
              ]}
            >
              <View
                style={{ flex: 0.1, backgroundColor: COLORS.white }}
              />
              <View style={{ flex: 2, backgroundColor: COLORS.white }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: COLORS.optimaGreen,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {countPage} / {totalPage}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.1, backgroundColor: COLORS.optimaGreen }} />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>

      {/* flex:3 */}
      <View style={{ flex: 2, backgroundColor: COLORS.optimaBlack }}>
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View
              style={{
                flex: 1,
                width: 60,
                height: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  nextPage();
                }}
              >
                <Icon
                  name="arrow-forward"
                  color={COLORS.optimaGreen}
                  resizeMode="center"
                  size={30}
                  style={{ height: 50, width: 50, paddingLeft: 25 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PageSlider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: WINDOW_WIDTH - 10,
      },
      imageContainer: {
        flex: 1,
        marginRight: 10,
      },
      image: {
        width: 150,
        height: 120,
        borderRadius: 5,
      },
      detailsContainer: {
        flex: 2,
      },
      plateName: {
        fontSize: 16,
        fontWeight: "bold",
      },
      date: {
        fontSize: 14,
      },
      time: {
        fontSize: 14,
      },
      directionContainer: {
        flex: 1,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      },
      root: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 5,
        paddingRight: 15,
        width: WINDOW_WIDTH - 10,
        marginLeft: 5,
      },
      separator: {
        height: 2,
        backgroundColor: COLORS.optimaGreen,
      },
      row: {
        flexDirection: "row",
        marginLeft: -50,
        marginRight: -20,
        height: Platform.OS === "ios" ? 110 : 90,
      },
      col1: {
        flex: 1,
        marginLeft: Platform.OS === "ios" ? 50 : 40,
        marginRight: Platform.OS === "ios" ? 50 : 10,
      },
      col2: {
        flex: 1,
        marginLeft: Platform.OS === "ios" ? 10 : 10,
        marginRight: Platform.OS === "ios" ? 20 : 40,
      },
      itemViewContainer: {
        width: "100%",
        paddingHorizontal: 10,
      },
    
      col3: {
        flex: 0.1,
        marginRight: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: "blue",
      },
      drawerStyle: {
        marginRight: Platform.OS === "ios" ? -5 : 0,
      },
      modalHeader: {
        flexDirection: "row",
        maxWidth: 500,
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
      },
      switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#ffff",
      },
      switchText: {
        fontSize: 18,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        backgroundColor: "#ffff",
      },
      modalText: {
        paddingLeft: 5,
        paddingBottom: 5,
      },
      ticketIcon: {
        marginTop: 10,
      },
      selectedCameras: {
        flexDirection: "row",
        width: 200,
        height: 300,
        marginTop: 20,
        marginLeft: 55,
      },
});
