import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const FlagPickerItem = ({ label, value, flagIcon }) => {
  return (
    <View style={styles.container}>
      <Image source={flagIcon} style={styles.flagIcon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
  },
});

export default FlagPickerItem;
