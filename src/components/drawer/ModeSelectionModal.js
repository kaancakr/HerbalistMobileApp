import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../constans/colors";

const ModeSelectionModal = ({ visible, onClose, onSelectMode }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: COLORS.optimaGreen }}>
          <Text style={styles.topText}>Choose Mode:</Text>
          <TouchableOpacity onPress={() => onSelectMode('simple')} style={styles.innerRows}>
            <Text style={styles.innerText}>Simple Mode</Text>
            <Icon name="albums-outline" color="black" size={20} style={{marginTop: 10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectMode('advanced')} style={styles.innerRows}>
            <Text style={styles.innerText}>Advanced Mode</Text>
            <Icon name="cog" color="black" size={20} style={{marginTop: 10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButtonOuter}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    topText: {
        fontSize: 20,
        marginBottom: 20,
        padding: 10
    },
    innerText: {
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    closeButtonOuter: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        borderColor: 'red',
        backgroundColor: 'red',
        alignItems: "center",
        justifyContent: "center"
    },
    cancelButton: {
        padding: 10,
        textAlign: "center",
        color: 'white',
        fontSize: 16
    },
    innerRows: {
        display: "flex",
        flexDirection: 'row'
    }
});

export default ModeSelectionModal;