import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Switch,
  FlatList,
} from "react-native";
import { Surface, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import COLORS from "../../constans/colors";
import I18n from "../../constans/translation/I18n";
import i18n from "../../constans/translation/I18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../store/actions/firebaseConfig";

const { width } = Dimensions.get("screen");

const LoginScreen = ({ navigation, route }) => {

  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "397825100171-0mb9mb62pcohglk6hp4pjji7cc37a76p.apps.googleusercontent.com",
    androidClientId:
      "397825100171-9p6kou3elami72qv14rth458kh8jhoc5.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);



  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [IpAddress, setIpAddress] = React.useState(""); // Add this line
  const [rememberMe, setRememberMe] = React.useState(false);
  const [networkStatus, setNetworkStatus] = useState("online");

  const [qrIpAddress, setQrIpAddress] = useState(""); // IP Address from QR code
  const [qrUsername, setQrUsername] = useState(""); // Username from QR code
  const [qrPassword, setQrPassword] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(I18n.defaultLocale);
  const [showPicker, setShowPicker] = React.useState(false);

  const [signInButtonRef, setSignInButtonRef] = useState(null);

  const triggerSignIn = () => {
    // Programmatically trigger the "Sign In" button
    if (signInButtonRef) {
      signInButtonRef.click();
    }
  };

  useEffect(() => {
    if (signInButtonRef && qrUsername && qrPassword && qrIpAddress) {
      // If the ref and QR code data are available, trigger the "Sign In" button
      triggerSignIn();
    }
  }, [signInButtonRef, qrUsername, qrPassword, qrIpAddress]);

  const checkNetworkStatus = async () => {
    try {
      const connectionInfo = await NetInfo.fetch();
      setNetworkStatus(connectionInfo.isConnected ? "online" : "offline");
    } catch (error) {
      console.error("Error checking network status:", error);
    }
  };

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

  const dispatch = useDispatch();

  const submit = async () => {
    if (networkStatus === "offline") {
      // Display a network error alert if there is no internet connection
      Alert.alert("Network Error", "Please check your internet connection.");
      return;
    }

    if (rememberMe) {
      saveCredentialsToAsyncStorage(username, password);
      saveRememberMeStateToAsyncStorage(true);
      saveLastLoginDateToAsyncStorage(); // Add this line
    } else {
      saveRememberMeStateToAsyncStorage(false);
    }

    // Now, dispatch the login action after checking network status
    dispatch(Login(username, password, IpAddress))
      .then((response) => {
        if (response === "wrong_password") {
          // Display an alert for wrong password
          Alert.alert(
            "Wrong Password",
            "Please check your password and try again."
          );
        } else {
          navigation.navigate("HomeScreen"); // Navigate to the home screen upon successful login
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const saveLastLoginDateToAsyncStorage = async () => {
    try {
      const currentDate = new Date();
      await AsyncStorage.setItem("lastLoginDate", currentDate.toISOString());
    } catch (error) {
      console.error("Error saving last login date:", error);
    }
  };

  const saveRememberMeStateToAsyncStorage = async (rememberMe) => {
    try {
      await AsyncStorage.setItem("rememberMe", JSON.stringify(rememberMe));
    } catch (error) {
      console.error("Error saving rememberMe state to AsyncStorage:", error);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };
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

  return (
    <View style={styles.loginContent}>
      <View style={styles.container}>
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
        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={toggleRememberMe}
            color="black"
          />
          <Text style={{ color: "white", marginLeft: 10, fontSize: 14 }}>
            {I18n.t("rememberMe")}
          </Text>
        </View>

        <Surface style={styles.box}>
          <View>
            <Image
              style={{
                width: Platform.OS === "ios" ? 120 : 100,
                height: Platform.OS === "ios" ? 100 : 50,
                left: 105
              }}
              source={require("../../assets/anadolu_aktari_logo.png")}
              resizeMode="contain"
            />
            <View>
              <TextInput
                label="Username"
                mode="outlined"
                placeholder={I18n.t("UserName")}
                autoCapitalize="none"
                color={COLORS.black}
                placeholderTextColor={COLORS.gray}
                style={{
                  borderColor: "#454545",
                  borderWidth: 2,
                  margin: 5,
                  height: 50,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View>
              <TextInput
                secureTextEntry
                label="Password"
                mode="outlined"
                placeholder={I18n.t("Password")}
                color={COLORS.black}
                placeholderTextColor={COLORS.gray}
                style={{
                  borderColor: "#454545",
                  borderWidth: 2,
                  margin: 5,
                  height: 50,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  padding: 10,
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>

          <View style={{ flexDirection: "column" }}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                mode="contained"
                ref={(button) => setSignInButtonRef(button)}
                style={{
                  marginTop: 35,
                  backgroundColor: COLORS.optimaGreen,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: COLORS.optimaGreen,
                  width: 150,
                  height: 30,
                  borderRadius: 5,
                }}
                onPress={() => promptAsync()}
              >
                <Text style={{ color: "white" }}>{I18n.t("signIn")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                mode="contained"
                color={COLORS.tabBarYellow}
                style={{
                  marginTop: 10,
                  backgroundColor: "#B4B4B3",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#B4B4B3",
                  width: 150,
                  height: 30,
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate("OpenScreen")}
              >
                <Text>{I18n.t("goBack")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingTop: 10,
  },
  loginContent: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#454545",
  },
  box: {
    justifyContent: "center",
    shadowOpacity: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 15,
    paddingRight: 20,
    paddingLeft: 20,
    height: 375,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: COLORS.white,
    marginBottom: 20,
    fontWeight: "bold",
  },
  header: {
    justifyContent: "flex-start",
    paddingBottom: 20,
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
    height: 100,
    width: width,
    marginTop: -40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 25,
    backgroundColor: "#1e2024",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 50,
    marginTop: 50,
    padding: 15,
    elevation: 3,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.optimaGreen,
    borderWidth: 1,
  },
  buttonOpen: {
    backgroundColor: COLORS.optimaGreen,
  },
  buttonClose: {
    backgroundColor: COLORS.optimaGreen,
  },
  textStyle: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 13,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 13,
    right: 20,
    padding: 5,
  },
  languageButton: {
    backgroundColor: COLORS.optimaGreen,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.optimaGreen,
  },
  languageButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  pickerContainer: {
    position: "absolute",
    bottom: 65,
    right: 35,
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
  rememberMe: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    bottom: 15,
    left: 25,
    zIndex: 1,
    elevation: 5,
    padding: 5,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 15,
    left: 10,
    padding: 5,
  },
});
