import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import './services/i18next';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setupDatabase } from './database/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Inicio from './screens/Inicio';
import Reciclar from './screens/Reciclar';
import Maps from './screens/Maps';
import Forms from './screens/Forms';
import Login from './screens/Login';
import MasAplicaciones from './screens/MasAplicaciones';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent() {
  const { t } = useTranslation();

  const handleLogout = () => {
    BackHandler.exitApp(); // Cierra la aplicación
  };

  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity style={styles.drawerItem}>
        <Ionicons name="person-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>{t('setting.profile')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem}>
        <Ionicons name="settings-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>{t('setting.setting')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>{t('setting.exit')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function FooterNavigation({ navigation }) {
  return (
    <View style={styles.footerButtons}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio')}>
        <Image source={require('./assets/home.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reciclar')}>
        <Image source={require('./assets/reciclaje.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Maps')}>
        <Image source={require('./assets/maps.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MasAplicaciones')}>
        <Image source={require('./assets/mas.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

function MainContent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Reciclar" component={Reciclar} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="Forms" component={Forms} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MasAplicaciones" component={MasAplicaciones} />
        </Stack.Navigator>
      </View>
      <View style={styles.footer}>
        <FooterNavigation navigation={navigation} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setupDatabase();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator drawerContent={() => <DrawerContent />}>
          <Drawer.Screen name="Main" component={MainContent} options={{ title: t('appName') }} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 0,
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
    width: 37,
    height: 37,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  icon2: {
    marginRight: 15,
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
