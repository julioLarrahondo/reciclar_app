import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, BackHandler, TouchableOpacity, Text } from 'react-native';
import './services/i18next';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importa tus pantallas
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
    BackHandler.exitApp();
  };

  return (
    <View style={styles.drawerContent}>
      {/* Opciones de menú */}
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

// Modificamos MainStackNavigator para recibir userId
function MainStackNavigator({ userId }) {
  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio">
        {(props) => <Inicio {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name="Reciclar" component={Reciclar} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="Forms" component={Forms} />
      <Stack.Screen name="MasAplicaciones" component={MasAplicaciones} />
    </Stack.Navigator>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  // Si no utilizas setupDatabase, puedes comentarlo o eliminarlo
  // useEffect(() => {
  //   setupDatabase();
  // }, []);

  // Modificamos handleLogin para recibir userId
  const handleLogin = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Drawer.Navigator drawerContent={() => <DrawerContent />}>
          <Drawer.Screen name="Main">
            {(props) => <MainStackNavigator {...props} userId={userId} />}
          </Drawer.Screen>
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
