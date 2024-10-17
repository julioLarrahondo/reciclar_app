import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const RecyclingDonationScreen = () => {
  const { t } = useTranslation();

  const handleDonation = () => {
    // Implement donation logic here
    console.log('Donation button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logoT.png')}
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t('recyclingDonation')}</Text>
        </View>

        <Image
          source={require('../assets/logoT.png')}
          style={styles.backgroundImage}
        />

        <Text style={styles.infoText}>
          {t('recyclingInfo')}
        </Text>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonation}>
          <Text style={styles.donateButtonText}>{t('donate')}</Text>
        </TouchableOpacity>

        <Text style={styles.impactText}>
          {t('donationImpact')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 20,
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  donateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  impactText: {
    fontSize: 14,
    color: '#388E3C',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecyclingDonationScreen;