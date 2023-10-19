import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import I18n from "../../constans/translation/I18n";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import QRCode from "react-native-qrcode-svg";

const Ticket = ({ route }) => {
  const { itemData } = route.params;
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.goBack();
  };

  const titleWithoutPlate = itemData.subscriber
    ? itemData.subscriber.title.replace(/\([^)]+\)/, "").trim()
    : "";

  const [data, setData] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [latestPlate, setLatestPlate] = useState("");

  const [subscriptionListPlate] = React.useState([]);
  const [bannedListPlate] = React.useState([]);

  const [isSubscriptionEnabled] = useState(false);
  const [isBannedEnabled] = useState(false);

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);

  var time = moment().utc();
  var nowDateandTime = moment().utc(time);
  var beforeTwoday = moment().utc(nowDateandTime).subtract(2, "days");
  var afterTwoDay = moment().utc(nowDateandTime).add(2, "days");
  const [lastPassingPlate, setLastPassingPlate] = useState("");
  const [passCount, setPassCount] = useState(0);

  const passingListAPI = () => {
    const listIsEmpty =
      filteredDataSource.length < 1 ||
      data.length < 1 ||
      subscriptionListPlate.length < 1 ||
      bannedListPlate.length < 1;
    var lastId = -1;

    if (!listIsEmpty) lastId = filteredDataSource[0].id;

    fetch(`http://${IP}:5035/Passing/List`, {
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
          startFrom: beforeTwoday,
          startTo: afterTwoDay,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const totalItem = res.result.totalItemCount;

        if (totalItem !== 0 && totalItem !== 1) {
          const data1 = res.result.items;

          const lastPassingPlate = data1[0]?.plate.name.toUpperCase() || "";

          const passCountForLastPlate = data1.filter((item) => {
            const passingDate = moment(item.timestamp);
            return (
              passingDate.isSameOrAfter(beforeTwoday) &&
              passingDate.isSameOrBefore(afterTwoDay) &&
              item.plate.name.toUpperCase() === lastPassingPlate
            );
          }).length;

          setLastPassingPlate(lastPassingPlate);
          setPassCount(passCountForLastPlate);
          setFilteredDataSource(data1);

          const newPlate = lastPassingPlate;
          if (newPlate && newPlate !== latestPlate) {
            setLatestPlate(newPlate);
          }
          if (!listIsEmpty && isSubscriptionEnabled && isBannedEnabled) {
            if (
              lastId > 0 &&
              lastId !== data1[0].id &&
              (subscriptionListPlate.filter((e) => e.plate === lastPassingPlate)
                .length > 0 ||
                bannedListPlate.filter((e) => e.plate.name === lastPassingPlate)
                  .length > 0)
            ) {
              schedulePushNotification(lastPassingPlate);
            }
          }
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    passingListAPI();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.ticket, styles.cars]}>
        <View style={styles.top}>
          <Text style={styles.boardingPassText}>{I18n.t("passingTicket")}</Text>
          <View style={styles.big}>
            <Text style={styles.fromText}>OPTIMA</Text>
            <View style={styles.to}>
              <Text style={styles.toText}>SAN</Text>
              <Text>
                <Text style={styles.icon}>→</Text>
              </Text>
            </View>
          </View>
          <View style={styles.topSide}>
            <Image
              source={require("../../assets/Car2.png")}
              resizeMode="contain"
              style={styles.carLogo}
            />
            <Text>Baltimore</Text>
            <Text>San Diego</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          {/* Content for the bottom section */}
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>{I18n.t("plate")}</Text>
                <Text style={styles.plateText}>
                  {itemData.plate.name.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.rowLabelRight}>
                {itemData &&
                itemData.passingTrace &&
                itemData.passingTrace.direction
                  ? itemData.passingTrace.direction.toUpperCase()
                  : "Direction Not Available"}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>{I18n.t("passings")}</Text>
                <View style={styles.plateText}>
                  <Text style={styles.passingCount}>
                    {I18n.t("passesToday", { count: passCount })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>{I18n.t("visitorName")} </Text>
                <Text style={{ display: "flex", marginBottom: 5 }}>
                  {titleWithoutPlate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={
                itemData && itemData.passingTrace
                  ? itemData.passingTrace.direction
                  : "Data is not available"
              }
              size={100}
            />
            {/*
            <TouchableOpacity
              onPress={goBackToHome}
              style={styles.userInfoButton}
            >
              <Text style={styles.userInfoButtonText}>User Information</Text>
            </TouchableOpacity>
            */}
          </View>
          <TouchableOpacity onPress={goBackToHome} style={styles.goBackContent}>
            <FontAwesomeIcon icon={faBackward} size={20} color="black" />
            <Text style={styles.goBackButton}>{I18n.t("goBack")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e2e8",
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  ticket: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -135 }, { translateY: -287.5 }],
  },
  cars: {
    display: "block",
    height: 575,
    width: 270,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    borderRadius: 25,
    zIndex: 3,
  },
  top: {
    height: 220,
    backgroundColor: "#ffcc05",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  boardingPassText: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: 30,
    left: 10,
    transform: [{ translateX: -65 }], // Manually calculated
  },
  big: {
    position: "absolute",
    top: 100,
    fontSize: 65,
    fontWeight: "700",
    lineHeight: 0.8,
  },
  fromText: {
    color: "#ffcc05",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 0.5,
    fontSize: 36,
    marginLeft: 15,
  },
  to: {
    position: "absolute",
    left: 32,
    fontSize: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    top: 50,
  },
  toText: {
    fontSize: 35,
  },
  icon: {
    fontSize: 15,
  },
  topSide: {
    position: "absolute",
    right: 35,
    top: 110,
    textAlign: "right",
  },
  planeIcon: {
    fontSize: 25,
    marginBottom: 18,
  },
  bottom: {
    height: 355,
    backgroundColor: "#fff",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  column: {
    width: "100%",
    padding: "2rem",
  },
  row: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
  },
  rowContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rowLabel: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 3,
  },
  plateText: {
    display: "flex",
  },
  rowLabelRight: {
    textAlign: "right",
    marginTop: 10,
    fontWeight: "bold",
    color: "green",
  },
  rowLabelCenter: {
    textAlign: "center",
    marginTop: 10,
  },
  info: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -135 }], // Manually calculated
    bottom: 10,
    fontSize: 14,
    textAlign: "center",
    zIndex: 1,
  },
  infoLink: {
    textDecorationLine: "none",
    color: "#000",
    backgroundColor: "#ffcc05",
  },
  carLogo: {
    width: 50,
    height: 50,
  },
  qrCodeContainer: {
    alignItems: "center",
  },
  userInfoButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  userInfoButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  goBackContent: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  goBackButton: {
    textAlign: "center",
    marginLeft: 10,
  },
});

export default Ticket;
