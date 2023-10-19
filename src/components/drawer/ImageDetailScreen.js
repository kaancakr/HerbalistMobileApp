import React from "react";
import { StyleSheet, View, Image } from "react-native";

const ImageDetailScreen = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ImageDetailScreen;
