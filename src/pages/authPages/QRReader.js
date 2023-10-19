import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Linking,
  Image,
  ImageBackground,
  Alert,
  FlatList,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { store } from "../../store/index";
import COLORS from "../../constans/colors";
import I18n from "../../constans/translation/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../constans/translation/I18n";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function QRReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const isFocused = useIsFocused();
  const [ipSaved, setIpSaved] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(I18n.defaultLocale);
  const [showPicker, setShowPicker] = React.useState(false);

  const navigation = useNavigation();

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    setShowPicker(false);
    i18n.locale = language;
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.error("Error saving language to AsyncStorage:", error);
    }
  };

  const languages = [
    {
      label: "Turkish",
      value: "tr",
      iconSource: require("../../assets/turkey.jpeg"),
    },
    {
      label: "English",
      value: "en",
      iconSource: require("../../assets/england.jpeg"),
    },
    {
      label: "Arabic",
      value: "ar",
      iconSource: require("../../assets/arabic.jpeg"),
    },
  ];

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem("selectedLanguage");
        if (language) {
          setSelectedLanguage(language);
          I18n.locale = language;
        }
      } catch (error) {
        console.error("Error fetching language from AsyncStorage:", error);
      }
    };

    fetchSelectedLanguage();
  }, []);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (status !== "granted") {
      navigation.navigate("LoginScreen");
    }
  };

  useEffect(() => {
    if (isFocused) {
      askForCameraPermission();
    }
  }, [isFocused]);

  const isValid = (qrData) => {
    if (!qrData || typeof qrData !== "object") {
      return false;
    }

    if (!qrData.ipAddress || !qrData.username || !qrData.password) {
      return false;
    }
    return true;
  };

  const dispatch = useDispatch();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    try {
      const qrData = JSON.parse(data);
  
      if (isValid(qrData)) {
        navigation.navigate("LoginScreen", {
          scannedData: data,
          username: qrData.username,
          password: qrData.password,
          ipAddress: qrData.ipAddress,
        });

        AsyncStorage.setItem("IP", qrData.ipAddress)
          .then(() => {
            setIpSaved(true);
          })
          .catch((error) => {
            console.error("Error saving IP address:", error);
          });
  
        dispatch(Login(qrData.username, qrData.password, qrData.ipAddress))
          .then((response) => {
            if (response === "wrong_password") {
              Alert.alert("Wrong Password", "Please check your password and try again.");
            } else {
              navigation.navigate("HomeScreen"); // Navigate to the home screen upon successful login
            }
          })
          .catch((error) => {
            console.error("Error during login:", error);
          });
      } else {
        Alert.alert("Invalid QR Code", "The scanned QR code data is invalid.");
      }
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      Alert.alert("Error", "An error occurred while processing the QR code data.");
    }
  };
  

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred while opening the link:", err)
    );
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/background3.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/Optima-logo.png")} // Replace with the actual image path
          style={styles.imageStyle}
        />
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.maintext}>{text}</Text>
        <TouchableOpacity onPress={() => openLink(text)}>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>{I18n.t("openLink")}</Text>
          </View>
        </TouchableOpacity>
        {scanned && (
          <Button
            title={"Could not read code? Try again"}
            onPress={() => setScanned(false)}
            color="tomato"
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>{I18n.t("loginManually")}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {/* loginManually button */}
          <View style={styles.languageContainer}>
            <TouchableOpacity onPress={() => setShowPicker((prev) => !prev)}>
              <View style={styles.languageButton}>
                <Text style={styles.languageButtonText}>
                  {i18n.t("chooseLanguage")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <View style={styles.pickerContainer}>
              <FlatList
                data={languages}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleLanguageChange(item.value)}
                  >
                    <View style={styles.languageItem}>
                      <Image
                        source={item.iconSource}
                        style={styles.languageIcon}
                      />
                      <Text style={styles.languageLabel}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "#df1111",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  linkContainer: {
    borderColor: "#383e42",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#2B2730",
    height: Platform.OS === "ios" ? 50 : 60,
    // Android shadow
    elevation: 5, // Change the value to adjust the shadow depth
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  linkText: {
    color: COLORS.white,
    textDecorationLine: "none",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#2B2730",
    height: Platform.OS === "ios" ? 30 : 40,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  imageStyle: {
    height: 100,
    width: 300,
    marginBottom: 20,
  },
  languageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 85,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "flex",
    zIndex: 1,
  },
  languageButton: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#383e42",
    zIndex: 1,
  },
  pickerContainer: {
    position: "absolute",
    bottom: 55,
    right: 15,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  languagePicker: {
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    color: "white",
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff", // Add background color to each language item
    borderRadius: 5, // Add border radius to each language item
    marginBottom: 5,
  },
  languageIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 3, // Add border radius to the icon
  },
  languageLabel: {
    fontSize: 16,
    color: "#333", // Add text color to the language label
  },
});
