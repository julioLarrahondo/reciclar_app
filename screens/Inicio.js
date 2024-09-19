import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const InicioScreen = () => {
  const { t } = useTranslation(); // Hook para traducción

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('appName')}</Text>
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

export default InicioScreen;
