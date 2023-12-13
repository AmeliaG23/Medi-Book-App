// Components/Map.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const Map = () => {
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d1.0146!3d52.9548';

  return (
    <View style={styles.mapContainer}>
      <WebView source={{ uri: mapUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    marginVertical: 10,
  },
});

export default Map;
