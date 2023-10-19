import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const Init = () => {
  return async (dispatch) => {
    let token = null;
    token = await AsyncStorage.getItem("token");
    //console.log("Inıt token"+ token)
    if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};
export const InitBeforeTime = () => {
  return async (dispatch) => {
    let date_time_ = "";
    date_time_ = await AsyncStorage.getItem("date_time");
    //console.log("Inıt token"+ token)
    if (date_time_ !== null) {
      dispatch({
        type: "BEFORE_DATE_TIME",
        payload: date_time_,
      });
    }
  };
};

export const Login = (email, password) => {
  return async (dispatch) => {
    let IP = null;
    IP = await AsyncStorage.getItem("IP");

    if (email !== null && password !== null && IP !== null) {
      const response = await fetch(`http://${IP}:5035/User/LogIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const resData = await response.json();
      //console.log("resData"+resData)
      if (
        response &&
        response.result &&
        resData.result.sessionToken &&
        resData.result.user.id
      ) {
        await AsyncStorage.setItem("token", resData.result.sessionToken);
        await AsyncStorage.setItem(authUserId, resData.result.user.id);
      }

      dispatch({
        type: "LOGIN",
        payload: resData.result.sessionToken,
        authUserId: resData.result.user.id,
      });
    } else {
      Alert.alert("Add Server's IP address and check Server's connection");
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.removeItem("token").then(() =>
        AsyncStorage.removeItem("IP")
      );
      dispatch({
        type: "LOGOUT",
      });
      return true;
    } catch (e) {
      return false;
    }
  };
};

export const sendCameraID = (cameraID) => {
  //console.log("Test")
  //console.log(cameraID)
  if (cameraID !== null) {
    return (dispatch) => {
      dispatch({
        type: "CAMERA_ID",
        payload: cameraID,
      });
    };
  } else {
    console.log("CameraId not found");
  }
};

export const sendDirectionName = (directionName) => {
  if (directionName !== null) {
    return (dispatch) => {
      dispatch({
        type: "DIRECTION_NAME",
        payload: directionName,
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: "DIRECTION_NAME",
        payload: null,
      });
    };
  }
};

export const sendIPAddress = (IPaddress) => {
  if (IPaddress !== null) {
    return async (dispatch) => {
      let IPData = await IPaddress;
      if (IPData !== null) {
        await AsyncStorage.setItem("IP", IPData);
        dispatch({
          type: "IP_ADDRESS",
          payload: IPaddress,
        });
      } else {
        let IPData = null;
        await AsyncStorage.setItem("IP", IPData);
        dispatch({
          type: "IP_ADDRESS",
          payload: IPaddress,
        });
      }

      //console.log(ip)
    };
  } else {
    return async (dispatch) => {
      let IPData = null;
      if (IPData === null) {
        await AsyncStorage.setItem("IP", IPData);
      }
      //console.log(ip)
    };
  }
};

export const sendLicencePlateID = (licencePlateID) => {
  return (dispatch) => {
    dispatch({
      type: "LICENCE_PLATE_ID",
      payload: licencePlateID,
    });
  };
};

export const sendBeforeTimeDate = (beforeTimeDate) => {
  if (beforeTimeDate !== null) {
    return (dispatch) => {
      dispatch({
        type: "BEFORE_DATE_TIME",
        payload: beforeTimeDate,
      });
    };
  } else {
    console.log("Before Date and Time Not Found");
  }
};

export const sendSubsStartTimeDate = (currentTime) => {
  if (currentTime !== null) {
    return (dispatch) => {
      dispatch({
        type: "SUBS_START_DATE_TIME",
        payload: currentTime,
      });
    };
  }
};

export const sendSubsEndTimeDate = (nextTime) => {
  if (nextTime !== null) {
    return (dispatch) => {
      dispatch({
        type: "SUBS_END_DATE_TIME",
        payload: nextTime,
      });
    };
  }
};
