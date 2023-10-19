import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Light extends React.Component {
  render() {
    const cameraIsExit = true; // Replace with your logic
    const isFreePark = false; // Replace with your logic
    const trafficLightClass = 'your-traffic-light-class'; // Replace with your class name

    if (cameraIsExit && !isFreePark) {
      return (
        <View style={styles.lightSection}>
          <View style={[styles.trafficLight, styles[trafficLightClass]]}>
            <View style={styles.light}></View>
            <View style={styles.light}></View>
            <View style={styles.light}></View>
          </View>
        </View>
      );
    } else {
      return null; // Render nothing when the condition is not met
    }
  }
}

const styles = StyleSheet.create({
  lightSection: {
    display: 'flex',
    marginRight: 300
  },
  trafficLight: {
    width: 50, // Adjust the width as needed
    backgroundColor: '#343537',
    padding: 8,
    borderRadius: 20, // Adjust the borderRadius as needed
    marginLeft: 20, // Adjust the margin as needed
  },
  light: {
    width: '100%',
    paddingTop: '100%',
    backgroundColor: '#b3bbc5',
    borderRadius: 999, // Use a large number for a circle
    marginVertical: 10, // Adjust the margin as needed
  },
  yourTrafficLightClass: {
    // You can define additional styles for different traffic light classes here
  },
});

export default Light;
