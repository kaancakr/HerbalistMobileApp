import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../constans/colors";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import moment from "moment";
import {
  sendDirectionName,
  sendLicencePlateID,
  sendBeforeTimeDate,
} from "../../store/actions/auth";
import I18n from "../../constans/translation/I18n";

const FilterScreen = ({ navigation }) => {
  const [textPlate, onChangePlate] = React.useState(null);

  // const [cameraDetails, setCameraDetails] = useState([]);
  // const [selectedCamera, setSelectedCamera] = useState("");

  // const [licencePlate, setLicencePlate] = useState(null)

  const [directionDetails, setDirectionDetails] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [loadingDirection, setLoadingDirection] = useState(false);

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);

  const dispatch = useDispatch();
  var time = moment().utc();
  var nowDateandTime = moment().utc(time);

  var threeDaysAgo = moment().utc(nowDateandTime).subtract(3, "days");
  var twoDaysLater = moment().utc(nowDateandTime).add(2, "days");

  const plateList = () => {
    fetch(`http://${IP}:5035/Plate/List`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageQuery: {
          page: 1,
        },
        filter: {
          name: textPlate,
          startWithTimeFrom: threeDaysAgo,
          startWithTimeTo: twoDaysLater,
        },
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log(res)
        // dispatch(sendLicencePlateID(null));
        // console.log(res.result)
        if (textPlate === null) {
          dispatch(sendLicencePlateID(null));
        } else {
          dispatch(sendLicencePlateID(res.result.items[0].id));
        }
      })
      .catch((error) => console.error(error));
  };

  const searchFunc = () => {
    plateList();
    if (selectedDirection === null) {
      dispatch(sendDirectionName("Entrance"));
    } else if (selectedDirection === 1) {
      dispatch(sendDirectionName("Entrance"));
    } else if (selectedDirection === 2) {
      dispatch(sendDirectionName("Exit"));
    } else if (selectedDirection === 3) {
      dispatch(sendDirectionName("Duplex"));
    }
  };

  const resetFunc = () => {
    dispatch(sendLicencePlateID(null));
  };
  const displayDirectionPicker = async () => {
    //console.log(DirectionList);17
    setDirectionDetails(DirectionList);
    setLoadingDirection(true);
  };

  const renderDirectionPicker = () => {
    if (directionDetails !== null) {
      return directionDetails.map((direction, key) => {
        return (
          <SelectPicker.Item
            label={direction.name}
            value={direction.id}
            key={key}
          />
        );
      });
    } else {
      return <SelectPicker.Item label={"Direction"} value={"id"} key={"key"} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{I18n.t("filtering")}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{I18n.t("licensePlate")}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePlate}
          value={textPlate}
          placeholder={I18n.t("licensePlate")}
          keyboardType="default"
        />
      </View>

      {/*
      <View style={styles.directionContainer}>
        <Text style={styles.label}>{I18n.t('direction')}</Text>
        <TouchableOpacity
          onPress={displayDirectionPicker}
          style={styles.directionPickerButton}
          activeOpacity={0.5}
        >
          <Icon
            name="swap-horizontal-outline"
            style={styles.directionPickerIcon}
          />
          <View style={styles.directionPickerSeparator} />
          {Platform.OS === "android" ? (
            <View>
              <Text
                style={styles.directionPickerText}
              >
                <SelectPicker
                  selectedValue={selectedDirection}
                  style={styles.directionPicker}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedDirection(itemValue);
                  }}
                  dropdownIconColor={COLORS.tabBarColor}
                  dropdownIconRippleColor={COLORS.tabBarColor}
                >
                  {renderDirectionPicker()}
                </SelectPicker>
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.directionPickerText}>
                <SelectPicker
                  selectedValue={selectedDirection}
                  style={styles.directionPicker}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedDirection(itemValue);
                  }}
                >
                  {renderDirectionPicker()}
                </SelectPicker>
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View> 
      */}

      <View style={styles.buttonContainer}>
        {/* Search Button */}
        <TouchableOpacity
          onPress={() => {
            searchFunc();
            navigation.navigate(I18n.t("homeScreenName")); // Navigate to the Home screen
          }}
          style={styles.searchButton}
        >
          <Text style={styles.buttonText}>{I18n.t("search")}</Text>
        </TouchableOpacity>

        {/* Reset Button */}
        <TouchableOpacity onPress={resetFunc} style={styles.resetButton}>
          <Text style={styles.buttonText}>{I18n.t("resetFilter")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 30,
  },
  heading: {
    alignItems: "center",
    paddingTop: 50,
  },
  headingText: {
    fontSize: 18,
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 10,
  },
  input: {
    height: 55,
    width: 175,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonGPlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 55,
    width: 20,
    borderRadius: 5,
    margin: 5,
  },
  buttonFacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.tabBarColor,
    borderWidth: 0.5,
    borderColor: "white",
    height: 55,
    borderRadius: 5,
    margin: 5,
    width: 175,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 10,
    marginTop: 20,
    height: 55,
    width: 45,
  },
  buttonTextStyle: {
    color: "#000",
    marginBottom: 4,
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    borderColor: COLORS.tabBarColor,
    width: 150,
    marginBottom: 20,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    borderColor: COLORS.tabBarColor,
    width: 150,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5, // Add margin for button text
  },
});
