import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert, // Import Alert from react-native
} from 'react-native';
import i18n from '../../constans/translation/I18n';

export function DeleteAccountScreen({ visible, onClose, onDeleteAccount, userId }) {
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the confirmation step

  const handleDeleteAccount = async () => {
    if (showConfirmation) { // Only proceed if confirmation step is shown
      onClose();
      try {
        await onDeleteAccount(userId); // Pass the 'userId' to onDeleteAccount
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    } else {
      // Show confirmation alert
      Alert.alert(
        i18n.t('confirmDeleteAccount'),
        i18n.t('deleteAccountConfirmation'), // Custom confirmation message
        [
          {
            text: i18n.t('cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('delete'),
            onPress: () => setShowConfirmation(true), // Set the state to show confirmation
            style: 'destructive',
          },
        ]
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {i18n.t('confirmDeleteAccount')}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>{i18n.t('delete')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}>
            <Text style={styles.cancelButtonText}>{i18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
