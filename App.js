import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image,BackHandler } from 'react-native';
import './services/i18next';
import { useTranslation } from 'react-i18next';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setupDatabase } from './database/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import Login from './screens/Login';
import Inicio from './screens/Inicio';
import Reciclar from './screens/Reciclar';
import Maps from './screens/Maps';
import Forms from './screens/Forms';
import MasAplicaciones from './screens/MasAplicaciones';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerContent() {

  const handleLogout = () => {
    // Cerrar la aplicación
    BackHandler.exitApp();
  };


  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity style={styles.drawerItem}>
        <Ionicons name="person-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem}>
        <Ionicons name="settings-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>Ajustes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#666" style={styles.icon2} />
        <Text style={styles.drawerText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}



function FooterNavigation() {
  const navigation = useNavigation();

  return (
    <View style={styles.footerButtons}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Image
          source={require('./assets/home.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reciclar')}
      >
        <Image
          source={require('./assets/reciclaje.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Maps')}
      >
        <Image
          source={require('./assets/maps.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MasAplicaciones')}
      >
        <Image
          source={require('./assets/mas.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

function MainContent() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.hamburgerButton}>
          <Image source={require('./assets/menuH.png')} style={styles.hamburgerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{t('appName')}</Text>
      </View>

      <View style={styles.content}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Reciclar" component={Reciclar} />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="Forms" component={Forms} />
          <Stack.Screen name="MasAplicaciones" component={MasAplicaciones} />
        </Stack.Navigator>
      </View>

      <View style={styles.footer}>
        <FooterNavigation />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setupDatabase();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={() => <DrawerContent />}>
        <Drawer.Screen name="Main">
          {() => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isAuthenticated ? (
                <Stack.Screen name="MainContent" component={MainContent} />
              ) : (
                <Stack.Screen name="Login">
                  {(props) => <Login {...props} onLogin={handleLogin} />}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
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
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  hamburgerButton: {
    position: 'absolute',
    left: 10,
    top: 40,
  },
  hamburgerIcon: {
    width: 30,
    height: 30,
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
    paddingTop: 50, // Espacio en la parte superior
    backgroundColor: '#FFFFFF ', // 
  },
  drawerItem: {
    flexDirection: 'row', // Alinear el ícono y el texto en fila
    alignItems: 'center', // Centrar el ícono y texto verticalmente
    paddingVertical: 15, // Espaciado vertical dentro de cada ítem
    paddingHorizontal: 20, // Espaciado horizontal dentro de cada ítem
    borderBottomWidth: 0.5, // Ligeras líneas divisorias entre los ítems
    borderBottomColor: '#ddd', // Color de la línea divisoria
  },
  icon2: {
    marginRight: 15, // Espacio entre el ícono y el texto
  },
  drawerText: {
    fontSize: 16, 
    color: '#333', // Color oscuro para el texto
    fontWeight: '500', // Peso intermedio para el texto
  },

});