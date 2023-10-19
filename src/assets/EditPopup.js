import {
  Modal,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useSelector } from "react-redux";
import I18n from "../../constans/translation/I18n";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const EditPopup = ({
  selectedItem,
  showEditPopup,
  closeEditPopup,
  selectedPlateType,
}) => {
  const [editedData, setEditedData] = useState({
    amount: selectedItem.amount || 0,
    startDate: selectedItem.startDate
      ? moment(selectedItem.startDate)
      : moment(),
    endDate: selectedItem.endDate ? moment(selectedItem.endDate) : moment(),
    note: selectedItem?.note || "",
    transactionNote: selectedItem?.transactionNote || "",
    name: selectedItem?.subscriber?.title || "",
    nameBlocked: selectedItem?.plate?.name || "",
    listType: selectedPlateType || "",
  });

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [showNoteSection, setShowNoteSection] = useState(false);
  const [showTransactionNoteSection, setShowTransactionNoteSection] =
    useState(false);

  const toggleNoteSection = () => {
    setShowNoteSection(!showNoteSection);
  };

  const toggleTransactionNoteSection = () => {
    setShowTransactionNoteSection(!showTransactionNoteSection);
  };

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEditedData({ ...editedData, startDate: selectedDate });
    }
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEditedData({ ...editedData, endDate: selectedDate });
    }
    setShowEndDatePicker(false);
  };

  const handleNoteContentSizeChange = (contentWidth, contentHeight) => {
    const minHeight = Math.max(100, contentHeight + 20);
    setNoteHeight(minHeight);
  };

  const [noteHeight, setNoteHeight] = useState(100);

  const handleSaveEdit = () => {
    const updatedSubscription = {
      amount: editedData.amount,
      startDate: editedData.startDate,
      endDate: editedData.endDate,
      note: editedData.note.trim(),
      transactionNote: editedData.transactionNote.trim(),
    };

    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Check if note is empty before sending the request
            if (updatedSubscription.note === "") {
              updatedSubscription.note = ""; // Set it to an empty string
            }

            fetch(
              `http://${IP}:5035/Subscription/Update?Id=${selectedItem.id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                  Accept: "application/json",
                },
                body: JSON.stringify(updatedSubscription),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                closeEditPopup();
              })
              .catch((error) => {
                console.error("Error saving subscription data:", error);
              });
          },
        },
      ]
    );
  };

  const handleBlockedEdit = () => {
    const blockedPlateUpdate = {
      note: editedData.note.trim(), // Ensure it's a trimmed string or an empty string
      startDate: editedData.startDate.toISOString(),
      endDate: editedData.endDate.toISOString(),
      plate: editedData.nameBlocked,
    };

    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Check if note is empty before sending the request
            if (blockedPlateUpdate.note === "") {
              blockedPlateUpdate.note = ""; // Set it to an empty string
            }

            fetch(
              `http://${IP}:5035/BlockedPlate/Update?Id=${selectedItem.id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                  Accept: "application/json",
                },
                body: JSON.stringify(blockedPlateUpdate),
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("Blocked plate data saved successfully:", data);
                closeEditPopup();
              })
              .catch((error) => {
                console.error("Error saving blocked plate data:", error);
              });
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={showEditPopup}
      animationType="slide"
      style={styles.popupContainer}
    >
      <View style={styles.modalContent}>
        {selectedPlateType === "blocked" && (
          <Text style={styles.visitorName}>{editedData.nameBlocked}</Text>
        )}
        <Text style={styles.visitorName}>{editedData.name}</Text>

        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.datePicker}
          >
            <Text style={styles.datePickerText}>
              {I18n.t("startDate")}{" "}
              {moment(editedData.startDate).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DatePicker
              value={editedData.startDate.toDate()} // Remove .toDate()
              mode="datetime"
              onChange={handleStartDateChange}
              style={styles.datePicker}
            />
          )}
        </View>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.datePicker}
          >
            <Text style={styles.datePickerText}>
              {I18n.t("endDate")}{" "}
              {moment(editedData.endDate).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DatePicker
              value={editedData.endDate.toDate()} // Remove .toDate()
              mode="datetime"
              onChange={handleEndDateChange}
              style={styles.datePicker}
            />
          )}
        </View>
        {selectedPlateType === "subscriber" && (
          <View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{I18n.t("amount")}:</Text>
              <TextInput
                value={editedData.amount.toString()}
                onChangeText={(text) =>
                  setEditedData({ ...editedData, amount: text })
                }
                keyboardType="numeric"
                style={styles.amountInput}
              />
            </View>
          </View>
        )}

        <TouchableOpacity onPress={toggleNoteSection} style={styles.noteButton}>
          <Text style={styles.noteButtonText}>{I18n.t("editNote")}</Text>
        </TouchableOpacity>

        {showNoteSection && (
          <TextInput
            value={editedData.note}
            onChangeText={(text) =>
              setEditedData({ ...editedData, note: text })
            }
            placeholder="Note"
            multiline
            onContentSizeChange={(e) =>
              handleNoteContentSizeChange(
                e.nativeEvent.contentSize.width,
                e.nativeEvent.contentSize.height
              )
            }
            style={[styles.visitorNote, { height: noteHeight }]}
          />
        )}
        {selectedPlateType === "subscriber" && (
          <TouchableOpacity
            onPress={toggleTransactionNoteSection}
            style={styles.noteButton}
          >
            <Text style={styles.noteButtonText}>
              {I18n.t("editTransactionNote")}
            </Text>
          </TouchableOpacity>
        )}
        {showTransactionNoteSection && (
          <TextInput
            value={editedData.transactionNote}
            onChangeText={(text) =>
              setEditedData({ ...editedData, transactionNote: text })
            }
            placeholder="TransactionNote"
            multiline
            onContentSizeChange={(e) =>
              handleNoteContentSizeChange(
                e.nativeEvent.contentSize.width,
                e.nativeEvent.contentSize.height
              )
            }
            style={[styles.visitorNote, { height: noteHeight }]}
          />
        )}

        <View style={styles.buttonContainer}>
          {selectedPlateType === "subscriber" && (
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={[
                styles.button,
                Platform.OS === "android" ? styles.androidButton : null,
              ]}
            >
              <Text style={styles.buttonText}>{I18n.t("save")}</Text>
            </TouchableOpacity>
          )}

          {selectedPlateType === "blocked" && (
            <TouchableOpacity
              onPress={handleBlockedEdit}
              style={[
                styles.button,
                Platform.OS === "android" ? styles.androidButton : null,
              ]}
            >
              <Text style={styles.buttonText}>{I18n.t("save")}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={closeEditPopup}
            style={[
              styles.button,
              Platform.OS === "android" ? styles.androidButton : null,
            ]}
          >
            <Text style={styles.buttonText}>{I18n.t("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditPopup;

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: WINDOW_HEIGHT,
    marginTop: -50
  },
  visitorName: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
  },
  visitorNote: {
    height: 200,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginBottom: 10,
    borderColor: "#ffc107",
    backgroundColor: "#fff",
  },
  datePicker: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  datePickerText: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ffc107",
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  amountContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    width: 200,
    height: 60,
  },
  amountText: {
    fontSize: 16,
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 60,
    borderColor: "#ffc107",
  },
  noteButton: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  noteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  androidButton: {
    // Add your Android-specific button styles here
    backgroundColor: "white",
  },
  buttonText: {
    color: "#ffc107",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#ffc107",
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: -20,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Adjust padding as needed
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
});
