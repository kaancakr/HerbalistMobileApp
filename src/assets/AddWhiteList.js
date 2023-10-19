import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
//Moment
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../constans/colors";

import {
  sendSubsStartTimeDate,
  sendSubsEndTimeDate,
} from "../../store/actions/auth";
import I18n from "../../constans/translation/I18n";

function getDateTimes(selectedValue, isChecked) {
  var time = moment().utc();
  var nowDateandTime = moment().utc(time).add(3, "hours");

  var month1 = moment().utc(nowDateandTime).add(1, "month");
  //console.log(month1);
  var months2 = moment().utc(nowDateandTime).add(2, "months");
  //console.log(months2);
  var months3 = moment().utc(nowDateandTime).add(3, "months");
  //console.log(months3);
  var year1 = moment().utc(nowDateandTime).add(1, "year");
  //console.log(year1);
  var years2 = moment().utc(nowDateandTime).add(2, "years");
  //console.log(years2);
  var years3 = moment().utc(nowDateandTime).add(3, "years");
  //console.log(years3);
  var nextDateTime;
  if (isChecked !== true) {
    switch (selectedValue) {
      case "Month1":
        nextDateTime = month1;
        break;
      case "Month2":
        nextDateTime = months2;
        break;
      case "Month3":
        nextDateTime = months3;
        break;
      case "Year1":
        nextDateTime = year1;
        break;
      case "Years2":
        nextDateTime = years2;
        break;
      case "Years3":
        nextDateTime = years3;
        break;
      default:
        break;
    }
  } else {
    nextDateTime = null;
  }
  return [nowDateandTime, nextDateTime];
}

const AddWhiteList = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [selectedListType, setSelectedListType] = useState("black");

  const [addComplexID, setAddComplexID] = React.useState(null);

  const [selectedBlock, setSelectedBlock] = React.useState("");
  const [blockDetails, setBlockDetails] = React.useState([]);
  const [BlockID, setBlockID] = React.useState("");

  const [selectedValue, setSelectedValue] = useState("");

  const [isChecked, setChecked] = useState(false);

  const [addPlateName, setAddPlateName] = React.useState("");
  const [title, setTitle] = React.useState(null);

  const [notes, setNotes] = React.useState("");

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const submit = (currDateTime, nextDateTime) => {
    dispatch(sendSubsStartTimeDate(currDateTime));
    dispatch(sendSubsEndTimeDate(nextDateTime));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addBlockedPlate = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
      const requestBody = {
        note: notes,
        startDate: startDate,
        endDate: endDate,
        plate: addPlateName,
      };

      fetch(
        `http://${IP}:5035/${
          selectedListType === "black" ? "BlockedPlate" : "Whitelist"
        }/Add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          resolve(json); // Resolve the promise with the API response
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          reject(error); // Reject the promise with the error
        });
    });
  };

  // White List Connection API

  const apiConnection = (currDateTime, nextDateTime) => {
    fetch(`http://${IP}:5035/Complex/Add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addComplexID,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    fetch(`http://${IP}:5035/Complex/List`, {
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
          name: blockDetails.name,
        },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result.totalItemCount === 0) {
        } else {
          const blockId = json.result.items[0].id;
        }
      })
      .catch((error) => console.error(error));

    fetch(`http://${IP}:5035/Subscriber/Add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complexId: selectedBlock.id,
        title: title, //addSubcriberName
      }),
    })
      .then((response) => response.json())
      .then((subscriberJson) => {
        const subscriberId = subscriberJson.result.id;
        //  console.log("Subscriber ID");
        //  console.log(subscriberJson);
        //  console.log(subscriberId);

        fetch(`http://${IP}:5035/Subscription/Add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriberId: subscriberId,
            amount: 1,
            startDate: currDateTime,
            endDate: nextDateTime,
          }),
        })
          .then((response) => response.json())
          .then((subscriptionJson) => {
            fetch(`http://${IP}:5035/Plate/Add`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: addPlateName,
              }),
            })
              .then((response) => response.json())
              .then((plateJson) => {
                const plateId = plateJson.result.id;
                //  console.log("Plate Add");
                //  console.log(plateJson);

                fetch(`http://${IP}:5035/SubscriberVehicle/Add`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    subscriberId: subscriberId,
                    plateId: plateId,
                    name: title,
                  }),
                })
                  .catch((e) => {
                    setIsLoadingPage(false);
                    setIsLoading(false);
                  })
                  .then((response) => response.json())
                  .then((subVehicleJson) => {});
              });
          })
          .then(() => {
            setIsLoading(false);
            setIsLoadingPage(true);
          });
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const displayComplexIdPicker = () => {
    fetch(`http://${IP}:5035/Complex/ListAll`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const dataSetBlock = res.result.items;
        setBlockDetails(dataSetBlock);
        setBlockID(dataSetBlock);
      })
      .catch((error) => console.error(error));
  };

  const renderBlockPicker = () => {
    return blockDetails.map((item) => {
      return (
        <Picker.Item
          label={`${item.name} (${
            selectedListType === "black" ? "Black" : "White"
          } List)`}
          value={item.id}
          key={item.id}
        />
      );
    });
  };

  const callFunc = () => {
    // Check if the required fields are empty
    if (!addPlateName || !title) {
      // Display an alert to the user
      alert("Please fill in all the blanks.");
      return;
    }

    const [currDateTime, nextDateTime] = getDateTimes(selectedValue, isChecked);

    // Convert nextDateTime to ISO string if it's a valid date object
    const nextDateTimeISO = nextDateTime ? nextDateTime.toISOString() : null;

    if (selectedListType === "black") {
      // Add to Black List
      addBlockedPlate(currDateTime.toISOString(), nextDateTimeISO)
        .then((response) => {
          // Show the success alert for Black List
          Alert.alert(
            "Success",
            "Successfully added blocked plate to Black List!",
            [
              {
                text: "OK",
                onPress: () => {
                  // You can add any additional logic here if needed
                },
              },
            ]
          );
        })
        .catch((error) => {
          // Handle the error case for Black List
          console.error("Error adding to Black List:", error);
          // You can also show an error alert if needed
          Alert.alert(I18n.t("failed"), I18n.t("failedlonger"), [
            {
              text: "OK",
              onPress: () => {
                // You can add any additional error handling logic here if needed
              },
            },
          ]);
        });
    } else if (selectedListType === "white") {
      // Add to White List
      apiConnection(currDateTime.toISOString(), nextDateTimeISO);
      // Show the success alert for White List
      Alert.alert(I18n.t("success"), I18n.t("successlonger"), [
        {
          text: "OK",
          onPress: () => {
            // You can add any additional logic here if needed
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View>
        <View>
          <View style={{ paddingTop: 45, paddingBottom: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {" "}
                {I18n.t("subscription")}{" "}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
                margin: 15,
                borderRadius: 5,
              }}
            >
              <View style={{ borderRadius: 5 }}>
                <TextInput
                  style={[
                    styles.textInput,
                    { borderColor: COLORS.tabBarColor },
                  ]}
                  onChangeText={setTitle}
                  value={title}
                  placeholder={I18n.t("subscriberName")}
                  keyboardType="default"
                  placeholderTextColor={COLORS.grey} // This line sets the placeholder color
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
                margin: 15,
                borderRadius: 5,
              }}
            >
              <TextInput
                style={[styles.textInput, { borderColor: COLORS.tabBarColor }]}
                onChangeText={setAddPlateName}
                value={addPlateName}
                placeholder={I18n.t("licensePlate")}
                keyboardType="default"
                placeholderTextColor={COLORS.grey} // This line sets the placeholder color
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.listText}>
            <Text> {I18n.t("listType")} </Text>
          </View>
          <View style={styles.listTypePicker}>
            <View>
              <TouchableOpacity onPress={toggleModal}>
                <Text
                  style={
                    selectedListType === "black"
                      ? styles.blackButtonStyle
                      : styles.whiteButtonStyle
                  }
                >
                  {selectedListType === "black"
                    ? I18n.t("blackList")
                    : I18n.t("whiteList")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedListType === "white" && (
            <View>
              <Text> {I18n.t("chooseBlock")} </Text>
              <TouchableOpacity
                title={"open"}
                onPress={displayComplexIdPicker}
                style={styles.buttonFacebookStyle}
                activeOpacity={0.5}
              >
                <Icon
                  name="business-outline"
                  style={styles.buttonImageIconStyle}
                />
                <View style={styles.buttonIconSeparatorStyle} />

                {Platform.OS === "android" ? (
                  <View>
                    <Text style={styles.buttonTextStyle}>
                      <SelectPicker
                        selectedValue={selectedBlock}
                        style={{ height: 50, width: 120 }}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedBlock(itemValue);
                        }}
                        dropdownIconColor={COLORS.tabBarColor}
                        dropdownIconRippleColor={COLORS.tabBarColor}
                      >
                        {renderBlockPicker()}
                      </SelectPicker>
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.buttonTextStyle}>
                      <SelectPicker
                        selectedValue={selectedBlock}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedBlock(itemValue);
                        }}
                      >
                        {renderBlockPicker()}
                      </SelectPicker>
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.picker}>
          <Image
            style={{
              width: Platform.OS === "ios" ? 250 : 250,
              height: Platform.OS === "ios" ? 70 : 70,
              marginTop: -100,
              marginBottom: 50,
            }}
            source={require("../../assets/Optima-logo.png")}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.pickerButtonsText}>{I18n.t("close")}</Text>
          </TouchableOpacity>
          <FlatList
            data={["black", "white"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedListType(item);
                  toggleModal();
                }}
              >
                <Text style={[styles.pickerButtons]}>
                  {item === "black" ? I18n.t("blackList") : I18n.t("whiteList")}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <View style={{ paddingTop: 15 }}>
        {selectedListType === "white" && (
          <View style={{ alignItems: "center" }}>
            <Text> {I18n.t("subscriptionTimeInterval")} </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                title={"open"}
                style={styles.buttonFacebookStyle}
                activeOpacity={0.5}
              >
                <Icon name="calendar" style={styles.buttonImageIconStyle} />
                <View style={styles.buttonIconSeparatorStyle} />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                  }}
                >
                  <View
                    style={{
                      flex: 1,

                      backgroundColor: COLORS.tabBarColor,

                      borderColor: COLORS.white,
                    }}
                  >
                    {Platform.OS === "ios" ? (
                      <SelectPicker
                        selectedValue={selectedValue}
                        itemStyle={{
                          height: 50,
                          width: 150,

                          paddingRight: 10,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <SelectPicker.Item
                          label={I18n.t("month1")}
                          value="Month1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months2")}
                          value="Month2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months3")}
                          value="Month3"
                        />
                        <SelectPicker.Item
                          label={I18n.t("year1")}
                          value="Year1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years2")}
                          value="Years2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years3")}
                          value="Years3"
                        />
                      </SelectPicker>
                    ) : (
                      <SelectPicker
                        selectedValue={selectedValue}
                        itemStyle={{
                          height: 70,
                          width: 150,
                          paddingBottom: 50,
                          paddingRight: 10,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <SelectPicker.Item
                          label={I18n.t("month1")}
                          value="Month1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months2")}
                          value="Month2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months3")}
                          value="Month3"
                        />
                        <SelectPicker.Item
                          label={I18n.t("year1")}
                          value="Year1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years2")}
                          value="Years2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years3")}
                          value="Years3"
                        />
                      </SelectPicker>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.main}>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? COLORS.tabBarColor : undefined}
                />
                <Text style={styles.paragraph}>
                  {I18n.t("chooseAnUnlimitedSubscription")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={{ paddingTop: 15 }}>
        {selectedListType === "black" && (
          <View style={{ alignItems: "center", marginTop: -20 }}>
            <Text> {I18n.t("blockedTimeInterval")} </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                title={"open"}
                style={styles.buttonFacebookStyle}
                activeOpacity={0.5}
              >
                <Icon name="calendar" style={styles.buttonImageIconStyle} />
                <View style={styles.buttonIconSeparatorStyle} />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                  }}
                >
                  <View
                    style={{
                      flex: 1,

                      backgroundColor: COLORS.tabBarColor,

                      borderColor: COLORS.white,
                    }}
                  >
                    {Platform.OS === "ios" ? (
                      <SelectPicker
                        selectedValue={selectedValue}
                        itemStyle={{
                          height: 50,
                          width: 150,

                          paddingRight: 10,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <SelectPicker.Item
                          label={I18n.t("month1")}
                          value="Month1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months2")}
                          value="Month2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months3")}
                          value="Month3"
                        />
                        <SelectPicker.Item
                          label={I18n.t("year1")}
                          value="Year1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years2")}
                          value="Years2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years3")}
                          value="Years3"
                        />
                      </SelectPicker>
                    ) : (
                      <SelectPicker
                        selectedValue={selectedValue}
                        itemStyle={{
                          height: 70,
                          width: 150,
                          paddingBottom: 50,
                          paddingRight: 10,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <SelectPicker.Item
                          label={I18n.t("month1")}
                          value="Month1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months2")}
                          value="Month2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("months3")}
                          value="Month3"
                        />
                        <SelectPicker.Item
                          label={I18n.t("year1")}
                          value="Year1"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years2")}
                          value="Years2"
                        />
                        <SelectPicker.Item
                          label={I18n.t("years3")}
                          value="Years3"
                        />
                      </SelectPicker>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.main}>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? COLORS.tabBarColor : undefined}
                />
                <Text style={styles.paragraph}>
                  {I18n.t("chooseAnUnlimitedSubscription")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {selectedListType === "black" && ( // Check if selectedListType is "white"
        <View style={{ alignItems: "center", paddingTop: 25 }}>
          <Text> {I18n.t("addNotes")} </Text>
          <View>
            <TextInput
              style={{
                height: 100,
                width: 300,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor: COLORS.tabBarColor,
              }}
              onChangeText={setNotes}
              value={notes}
              placeholder={I18n.t("enterNotes")}
              multiline
            />
          </View>
        </View>
      )}

      <View style={{ alignItems: "center", paddingTop: 25 }}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.tabBarColor,
              borderRadius: 5,
              borderColor: COLORS.tabBarColor,
              width: 100,
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
            }}
            onPress={() => {
              callFunc();
            }}
          >
            <Text> {I18n.t("save")} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddWhiteList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // marginTop: 30,
    padding: 30,
  },
  main: {
    marginVertical: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  buttonGPlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    width: 20,
    borderRadius: 5,
    margin: 5,
  },
  buttonFacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.tabBarColor,
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 60,
    borderRadius: 5,
    width: 220,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 10,
    marginTop: 20,
    height: 45,
    width: 35,
  },
  buttonTextStyle: {
    color: "#000",
    marginLeft: 2,
    height: 210,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
  selector: {
    flexDirection: "column",
    backgroundColor: COLORS.tabBarColor,
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 220,
    borderRadius: 5,
    width: 220,
    display: "flex",
  },
  listTypePicker: {
    marginBottom: 40,
    borderWidth: 4,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: COLORS.tabBarColor,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    width: 150,
    borderWidth: 4,
    padding: 10,
    borderRadius: 5,
  },
  listText: {
    marginTop: 10,
  },
  picker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: WINDOW_HEIGHT / 2 - 100,
  },
  pickerButtons: {
    fontSize: 18,
    padding: 10,
    margin: 10,
    borderWidth: 3,
    textAlign: "center",
    borderRadius: 10,
    color: "black",
    borderColor: "#ffc107",
    width: 150,
  },
  pickerButtonsText: {
    fontSize: 18,
    padding: 10,
    margin: 10,
    borderWidth: 3,
    textAlign: "center",
    borderRadius: 10,
    color: "black",
    borderColor: COLORS.grey,
    width: 100,
    marginBottom: 30,
  },
});
