import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

class LastPassingInfo extends React.Component {
  render() {
    const { lastPassing } = this.props;

    if (lastPassing) {
      return (
        <View style={styles.lastPassingInfo}>
          <Text>Last Passing:</Text>
          <Text>{lastPassing.title}</Text>
          <Text>{lastPassing.plate.name.toUpperCase()}</Text>
          <Text>Date: {moment(lastPassing.date).format("D MMMM YYYY")}</Text>
          <Text>Time: {moment(lastPassing.date).format("HH:mm:ss")}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  lastPassingInfo: {
    marginLeft: -250,
    marginTop: 30
  },
});

export default LastPassingInfo;
