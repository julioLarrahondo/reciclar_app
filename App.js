import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'; // Importar Image
import './services/i18next';
import { useTranslation } from 'react-i18next';
import Inicio from './screens/Inicio';
import Reciclar from './screens/Reciclar';
import Maps from './screens/Maps';
import MasAplicaciones from './screens/MasAplicaciones';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function FooterNavigation({ t }) {
  const navigation = useNavigation();

  return (
    <View style={styles.footerButtons}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Image
          source={require('./assets/home.png')}  // Ruta al archivo PNG
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reciclar')}
      >
        <Image
          source={require('./assets/reciclaje.png')}  // Ruta al archivo PNG
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Maps')}
      >
        <Image
          source={require('./assets/maps.png')}  // Ruta al archivo PNG
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MasAplicaciones')}
      >
        <Image
          source={require('./assets/mas.png')}  // Ruta al archivo PNG
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('appName')}</Text>
        </View>

        <View style={styles.content}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Reciclar" component={Reciclar} />
            <Stack.Screen name="Maps" component={Maps} />
            <Stack.Screen name="MasAplicaciones" component={MasAplicaciones} />
          </Stack.Navigator>
        </View>

        <View style={styles.footer}>
          <FooterNavigation t={t} />
        </View>

        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#4CAF50',
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  footer: {
    height: 70,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#388E3C',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 37,   // Ajusta el tamaño del ícono
    height: 37,  // Ajusta el tamaño del íconoSSS
    
  },
});
