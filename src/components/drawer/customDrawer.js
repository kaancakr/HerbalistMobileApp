import React from 'react';
import {
  View,
  StyleSheet,
  Image, 
  Text,
  SafeAreaView, 
  Linking, 
  Platform
} from 'react-native';

import { 
  DrawerContentScrollView ,
  DrawerItem
} from '@react-navigation/drawer';
import i18n from '../../constans/translation/I18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = () => {
  return(
  <SafeAreaView style={{ flex: 1 , backgroundColor: 'gray'}} >
  <Image
    source={require('../../assets/Logo-small.png')}
    style={styles.sideMenuProfileIcon}
  />
  <DrawerContentScrollView >
    <View style={styles.customItem}>
      <Text
        onPress={() => {
          Linking.openURL('https://www.optima-engineering.com/en/gallery/application');
        }}>
      {i18n.t('visitUs')}
      </Text>
    </View>
    <View style={styles.customItem}>
      <Text
        onPress={() => {
          Linking.openURL('https://www.optima-engineering.com/en/corporate/about-optima');
        }}>
      {i18n.t('aboutOptima')}
      </Text>
    </View>
    <View style={styles.customItem}>
      <Text
        onPress={() => {
          Linking.openURL('https://www.optima-engineering.com/tr/urunler');
        }}>
        {i18n.t('products')}
      </Text>
    </View>
  </DrawerContentScrollView>
  <DrawerItem
    icon={({ color, size }) => (
      <Icon
        name="exit-to-app"
        color='black'
        size={15}
      />
    )}
    label={i18n.t('signOut')}
    // onPress={async () => {
    //   await AsyncStorage.removeItem('id_token').then(() => store.setStore('SET_TOKEN', null))
    // }}
  />
  <Text
    style={{
      fontSize: 16,
      textAlign: 'center',
      color: 'black',
      paddingBottom: 20
    }}>
    Copyright Optima © 2021
  </Text>
</SafeAreaView>
)
    // return (
    //   <DrawerContentScrollView {...props}>
    //     <DrawerItem
    //       label="Home"
    //       onPress={() => props.navigation.navigate('Home')}
    //     />
    //     <DrawerItem
    //       label="Settings"
    //       onPress={() => props.navigation.navigate('Settings')}
    //     />
    //   </DrawerContentScrollView>
    // );
  }

export default CustomDrawerContent;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: Platform.OS === 'ios' ? 140 : 140,
    height: Platform.OS === 'ios' ? 110 : 110,
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
});