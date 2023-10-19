import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Modal,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "../../constans/translation/I18n";
import COLORS from "../../constans/colors";

const SELECTED_CAMERAS_KEY = "selectedCameras";

const SlidingButton = ({ navigation }) => {
  const [slideAnim] = useState(new Animated.Value(0));

  const [isInformationModalVisible, setInformationModalVisible] =
    useState(false);

  const [data, setData] = useState([]);

  const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
  const [rotation] = useState(new Animated.Value(0));

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [initialData, setInitialData] = useState([]);
  const [apiData, setApiData] = useState([]);

  const [cameraDetails, setCameraDetails] = useState([]);

  const [isCameraPickerVisible, setCameraPickerVisible] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState([]);

  useEffect(() => {
    if (initialData.length > 0 && apiData.length > 0) {
      setData([...initialData, ...apiData]);
      setFilteredDataSource([...initialData, ...apiData]);
      setLoading(true);
    }
  }, [initialData, apiData]);

  const handleToggleIcons = () => {
    setShowAdditionalIcons(!showAdditionalIcons);
    const degrees = showAdditionalIcons ? 0 : 45; // Rotate 45 degrees clockwise
    Animated.timing(rotation, {
      toValue: degrees,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const handleCloseModal = () => {
    setCameraPickerVisible(false);
  };

  const handleOpenInformationTab = () => {
    setInformationModalVisible(true);
  };

  const handleCloseInformationModal = () => {
    setInformationModalVisible(false);
  };

  const handleConfirmSelection = () => {
    setCameraPickerVisible(false);
    passingListAPI(selectedCameras);
  };

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);

  useEffect(() => {
    passingListAPI(selectedCameras);
    loadSelectedCameras();
    displayCameraPicker();
  }, []);

  const passingListAPI = (selectedCameraIds) => {
    // Add a 2-second delay using setTimeout
    setTimeout(() => {
      fetch(`http://${IP}:5035/Passing/ListByCameras`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            terminalIds: selectedCameraIds,
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.result !== null) {
            const resultTotalPage = res.result.pageCount;
            const newData = res.result.items.map((item) => ({
              ...item,
              direction: item.passingTrace.direction ? "entrance" : "exit",
            }));
            setData((prevData) => [...prevData, ...newData]);
            setFilteredDataSource(newData);
            setTotalPage(resultTotalPage);
            setLoading(true); // Hide loading indicator
          } else {
            setTotalPage("1");
            Alert.alert("", "Please login again");
            setLoading(false); // Hide loading indicator
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Hide loading indicator
        });
    }, 2000); // 2-second delay
  };

  const displayCameraPicker = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5035/Terminal/AccessibleTerminal`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (
        responseData.success &&
        responseData.result &&
        Array.isArray(responseData.result)
      ) {
        const cameras = responseData.result.map((terminal) => ({
          id: String(terminal.id),
          dnm: terminal.terminalName,
          sourceUri: terminal.alprCamera?.sourceUri,
        }));
        setCameraDetails(cameras);
      } else {
        console.error("Failed to fetch accessible cameras");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const loadSelectedCameras = async () => {
    try {
      const selectedCamerasJSON = await AsyncStorage.getItem(
        SELECTED_CAMERAS_KEY
      );
      if (selectedCamerasJSON) {
        const loadedSelectedCameras = JSON.parse(selectedCamerasJSON);
        setSelectedCameras(loadedSelectedCameras);
      }
    } catch (error) {
      console.error("Error loading selected cameras:", error);
    }
  };  

  const toggleCameraSelection = (cameraId) => {
    // Toggle the camera's selection status
    let updatedSelectedCameras;
    if (selectedCameras.includes(cameraId)) {
      updatedSelectedCameras = selectedCameras.filter((id) => id !== cameraId);
    } else {
      updatedSelectedCameras = [...selectedCameras, cameraId];
    }

    setSelectedCameras(updatedSelectedCameras);

    AsyncStorage.setItem(
      SELECTED_CAMERAS_KEY,
      JSON.stringify(updatedSelectedCameras)
    ).catch((error) => {
      console.error("Error setting selected cameras:", error);
    });
  };

  const renderCameraItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleCameraSelection(item.id)}
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: selectedCameras.includes(item.id) ? "green" : "gray",
          backgroundColor: selectedCameras.includes(item.id)
            ? "green"
            : "white",
          marginRight: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedCameras.includes(item.id) && (
          <Icon name="checkmark" color="white" size={20} />
        )}
      </View>
      <Text>{item.dnm}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    // Slide in the buttons when the component mounts
    Animated.spring(slideAnim, {
      toValue: 1,
      tension: 2,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View>
      {showAdditionalIcons && (
        <>
          <TouchableOpacity onPress={() => setCameraPickerVisible(true)}>
            <View style={styles.icons}>
              <Icon name="videocam" size={30} color={COLORS.optimaGreen} />
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isCameraPickerVisible}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 15,
                  }}
                >
                  <View style={styles.modalHeader}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>
                      {I18n.t("selectCameras")}
                    </Text>
                    <Icon
                      name="information-circle-outline"
                      onPress={handleOpenInformationTab}
                      color="black"
                      resizeMode="center"
                      size={20}
                      style={{
                        height: 50,
                        width: 50,
                        paddingLeft: 10,
                        marginTop: 2,
                      }}
                    />
                    <Icon
                      name="close-outline"
                      onPress={handleCloseModal}
                      color="black"
                      resizeMode="center"
                      size={30}
                      style={{
                        height: 50,
                        width: 120,
                        paddingLeft: 40,
                        marginTop: -5,
                      }}
                    />
                  </View>
                  {/* Render the list of cameras with checkboxes */}
                  <FlatList
                    data={cameraDetails}
                    renderItem={renderCameraItem}
                    keyExtractor={(item) => item.id}
                    style={styles.cameraItems}
                  />
                  <Button
                    title={I18n.t("confirm")}
                    onPress={handleConfirmSelection}
                  />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenInformationTab}>
            <View>
              <View style={styles.icons}>
                <Icon name="information-circle" size={30} color={COLORS.optimaRed} />
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isInformationModalVisible}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    style={{
                      width: 300,
                      backgroundColor: "white",
                      padding: 20,
                      borderRadius: 15,
                    }}
                  >
                    <View style={styles.modalHeader}>
                      <Text style={{ fontSize: 20, marginBottom: 10 }}>
                        {I18n.t("information")}
                      </Text>
                      <Icon
                        name="close-outline"
                        onPress={handleCloseInformationModal}
                        color="black"
                        resizeMode="center"
                        size={30}
                        style={{
                          height: 50,
                          width: 160,
                          paddingLeft: 120,
                          marginTop: -5,
                        }}
                      />
                    </View>
                    <View style={{ margin: 5 }}>
                      <Text>
                        <View style={{ marginBottom: 20 }}>
                          <Text>{I18n.t("infoText1")}</Text>
                        </View>
                        <View>
                          <Text>{I18n.t("infoText2")}</Text>
                        </View>
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
            <View style={styles.icons}>
              <Icon name="filter" size={30} color={COLORS.optimaGreen} />
            </View>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={handleToggleIcons}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "-360deg"], // Rotate back to 0 degrees
                }),
              },
            ],
          }}
        >
          <Icon name="add-circle" size={70} color={COLORS.optimaGreen} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SlidingButton;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    maxWidth: 250,
    margin: 5,
  },
  icons: {
    width: 60, // Adjust width and height as needed
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2, // Border width
    borderColor: COLORS.optimaGrey, // Border color
    borderRadius: 20, // Border radius (half of the width/height for a circle)
    backgroundColor: COLORS.white, // Background color
    marginLeft: 2, // Adjust margin as needed
    marginBottom: 10,
  },
});
