import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Image, Text,
  SafeAreaView, 
  Linking, 
  Platform,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
  useIsDrawerOpen, // Import this
} from '@react-navigation/drawer'; // Make sure you're importing from @react-navigation/drawer
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeleteAccountScreen } from './DeleteAccountScreen';
import { useNavigation, DrawerActions } from '@react-navigation/native'; // Import DrawerActions
import i18n from '../../constans/translation/I18n';
import { useDispatch } from "react-redux";
import { Logout } from "../../store/actions/auth";
import { Ionicons } from '@expo/vector-icons';

export function DrawerContent() {

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.defaultLocale);
  const [showPicker, setShowPicker] = useState(false);

  const token = useSelector((state) => state.Reducers.authToken);
  const IP = useSelector((state) => state.Reducers.authIPAddress);
  const navigation = useNavigation();

  const authUserId = useSelector((state) => state.Reducers.authUserId);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  
  const handleDeleteAccount = async () => {
    if (authUserId,token) { // Use authUserId here
      try {
        await removeSubscriber(authUserId,token); // Use authUserId here
        setShowDeleteAccountModal(false);
        dispatch(Logout());
        navigation.navigate('QRReader');
      } catch (error) {
        console.log('Error removing account:', error);
      }
    } else {
      console.log('No subscriber ID or authUserId found.');
    }
  };

  const removeSubscriber = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5035/User/Remove?Id=${authUserId}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token, // Make sure you're using the correct token here
          }
        }
      );
      
      const responseData = await response.json();
  
      if (response.ok && responseData.success) {
      } else {
      }
    } catch (error) {
      console.error('Error removing subscriber:', error);
    }
  };
  
  const [languageChanged, setLanguageChanged] = useState(false);
  
  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    setShowPicker(false);
    i18n.locale = language;
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      setLanguageChanged(true);
    } catch (error) {
      console.error('Error saving language to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (languageChanged) {
      navigation.navigate('tab', { screen: 'HomeScreen', params: { reset: true } });
  
      // Reset the languageChanged state
      setLanguageChanged(false);
    }
  }, [languageChanged]);
  
  
  const languages = [
    {
      label: "Turkish",
      value: "tr",
      iconSource: require('../../assets/turkey.jpeg'),
    },
    {
      label: "English",
      value: "en",
      iconSource: require('../../assets/england.jpeg'),
    },
    {
      label: "Arabic",
      value: "ar",
      iconSource: require('../../assets/arabic.jpeg'),
    },
  ];

  const dispatch = useDispatch();
  const submit = () => {
    dispatch(Logout());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Image
        source={require('../../assets/Logo4.png')}
        style={styles.sideMenuProfileIcon}
      />

      <DrawerContentScrollView >
        <View>
          <TouchableOpacity
            style={styles.customItem}
            onPress={() => {
              Linking.openURL(
                'https://www.optima-engineering.com/en/gallery/application'
              );
            }}
          >
            <Ionicons name="globe" size={25} color="grey" />
            <Text style={styles.drawerText}>{i18n.t('visitUs')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customItem}
            onPress={() => {
              Linking.openURL(
                'https://www.optima-engineering.com/en/corporate/about-optima'
              );
            }}
          >
            <Ionicons name="people-circle-outline" size={25} color="grey" />
            <Text style={styles.drawerText}>{i18n.t('aboutOptima')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customItem}
            onPress={() => {
              Linking.openURL(
                'https://www.optima-engineering.com/tr/urunler'
              );
            }}
          >
            <Ionicons name="hardware-chip-outline" size={25} color="grey" />
            <Text style={styles.drawerText}>{i18n.t('products')}</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setShowPicker((prev) => !prev)}>
          <View style={styles.languageButton}>
            <Text style={styles.languageButtonText}>
              {i18n.t('chooseLanguage')}
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
              <TouchableOpacity onPress={() => handleLanguageChange(item.value)}>
                <View style={styles.languageItem}>
                  <Image source={item.iconSource} style={styles.languageIcon} />
                  <Text style={styles.languageLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={styles.customDeleteItem}>
          <Text
            style={styles.deleteButtonText}
            onPress={() => {
              setShowDeleteAccountModal(true);
            }}>
            {i18n.t('deleteAccount')}
          </Text>
        </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Icon
            name="exit-to-app"
            color='black'
            size={15}
          />
        )}
        label={i18n.t('signOut')}
        onPress={submit}
      />

      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'black',
          paddingBottom: 20
        }}>
        Copyright Optima © 2023
      </Text>
      <DeleteAccountScreen
        visible={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
        onDeleteAccount={handleDeleteAccount}
        userId={authUserId} // Pass the userId as a prop
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    maxWidth: Platform.OS === 'ios' ? 120 : 140,
    maxHeight: Platform.OS === 'ios' ? 100 : 110,
    borderRadius: Platform.OS === 'ios' ? 10 : 10,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  languageContainer: {
    width: 150, // Set your desired absolute width
    height: 50, // Set your desired absolute height
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    marginLeft: 10
  },
  languageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 135,
    right: 25,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  languagePicker: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'white',
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff', // Add background color to each language item
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
    color: '#333', // Add text color to the language label
  },
  customDeleteItem: {
    width: 150, // Set your desired absolute width
    height: 50, // Set your desired absolute height
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    marginLeft: 10,
    backgroundColor: 'red',
    marginTop: 5
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '400'
  },
  drawerText: {
    marginLeft: 10
  }
});