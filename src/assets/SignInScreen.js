import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  Dimensions,
  Alert,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
// Store
import { store } from "../store/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "./../translation/I18n";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      IPADDRESS: "",
    };
  }

  loginUser = () => {
    const BASE_URL = store?.ipaddress;
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    fetch(`http://${BASE_URL}/User/LogIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        AsyncStorage.setItem("id_token", json.result.sessionToken).then(() => {
          store.setStore("SET_TOKEN", json.result.sessionToken);
        });
        AsyncStorage.setItem("ip_address", store.ipaddress);
      })
      .catch((error) => {
        console.error(error);
        this.onLoginFail();
      });

    // AsyncStorage.setItem('id_token', resData.result.sessionToken).then(() => {
    //         store.setStore('SET_TOKEN', resData.result.sessionToken)
    // })
    // await AsyncStorage.setItem("token", resData.result.sessionToken);
    // dispatch({
    //   type: "LOGIN",
    //   payload: resData,
    // });

    // console.log(response)
    // .then((response) => {

    //   // AsyncStorage.setItem('id_token', response.data.data).then(() => {
    //   //   store.setStore('SET_TOKEN', response.data.data)
    //   // })
    //   // AsyncStorage.setItem('ip_address', store.ipaddress)
    // })
    // .catch((error) => {
    //   console.log(error);
    //   this.onLoginFail();
    // })

    // axios.get(`http://${BASE_URL}/api/values/gettoken?username=${username}&password=${password}`)
    //   .then((response) => {
    //     AsyncStorage.setItem('id_token', response.data.data).then(() => {
    //       store.setStore('SET_TOKEN', response.data.data)
    //     })
    //     AsyncStorage.setItem('ip_address', store.ipaddress)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.onLoginFail();
    //   })
  };

  onLoginFail = () => {
    this.setState({
      error: "Check your IP Address",
      loading: false,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <ImageBackground
        source={require("../IMAGE/ekran2.png")}
        style={styles.container}
      >
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.header}>
          <Image
            animation="bounceIn"
            source={require("../assets/Logo-small.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View
          style={[
            styles.footer,
            {
              backgroundColor: "#1e2024",
            },
          ]}
        >
          <Text
            style={[
              styles.text_footer,
              {
                color: "white",
              },
            ]}
          >
            {i18n.t("username")}{" "}
          </Text>
          <View style={styles.action}>
            <Feather name="user" color={"white"} size={20} />
            <TextInput
              placeholder={i18n.t("yourUsername")}
              placeholderTextColor="#666666"
              value={email}
              autoCapitalize="none"
              style={[
                styles.textInput,
                {
                  color: "white",
                },
              ]}
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: "white",
                marginTop: 35,
              },
            ]}
          >
            {i18n.t("password")}
          </Text>

          <View style={styles.action}>
            <Feather name="lock" color={"white"} size={20} />
            <TextInput
              secureTextEntry
              placeholder={i18n.t("yourPassword")}
              placeholderTextColor="#666666"
              value={password}
              style={[
                styles.textInput,
                {
                  color: "white",
                },
              ]}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <View style={styles.button}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUpScreen")}
                style={[
                  styles.signIn,
                  {
                    borderColor: "black",
                  },
                ]}
              >
                <LinearGradient
                  colors={["#292c31", "#000"]}
                  style={styles.signUp}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "white",
                      },
                    ]}
                  >
                    {i18n.t("signUp")}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text> {"\n"} </Text>
              <View>
                <TouchableOpacity
                  onPress={this.loginUser}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "black",
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#292c31", "#000"]}
                    style={styles.signUp}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "white",
                        },
                      ]}
                    >
                      {i18n.t("signIn")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.button}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("IPScreen")}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "black",
                      paddingTop: 5,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#292c31", "#000"]}
                    style={styles.signUp}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "white",
                        },
                      ]}
                    >
                      {" "}
                      {i18n.t("IPAddress")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const height_logo = height * 0.25;
const widht_logo = width * 0.95;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: Platform.OS === "ios" ? 20 : 20,
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: "center",
  },
  footer: {
    flex: 3,
    backgroundColor: "#5F90AB",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  logo: {
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 0 : 0,
    height: height_logo,
    width: widht_logo,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    alignItems: "center",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    paddingBottom: Platform.OS === "ios" ? 8 : 8,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    paddingBottom: Platform.OS === "ios" ? 8 : 8,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? -5 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },

  button: {
    alignItems: "center",
    marginTop: 40,
  },
  signIn: {
    width: Platform.OS === "ios" ? 120 : 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Platform.OS === "ios" ? 10 : 10,
    flexDirection: "row",
    textAlign: "center",
    paddingRight: 5,
  },
  signUp: {
    width: Platform.OS === "ios" ? 120 : 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Platform.OS === "ios" ? 10 : 10,
    flexDirection: "row",
    textAlign: "center",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
  },
});
