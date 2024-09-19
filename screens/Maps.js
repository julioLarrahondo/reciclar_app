import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

const MapsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Maps Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default MapsScreen;
