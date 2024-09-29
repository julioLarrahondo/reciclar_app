import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Lista de centros de reciclaje
  const recyclingCenters = [
    {
      latitude: 3.3950644,
      longitude: -76.525664,
      title: "Reciclemos El Mundo",
      description: "Centro de reciclaje"
    },
   
    {
      latitude: 4.6199293,
      longitude: -74.08381,
      title: "Empresa de reciclaje Bogotá",
      description: "Compra de material reciclable"
    },
   
      
      {
      latitude: 3.3950644,
      longitude: -76.525664,
      title: "Reciclemos El Mundo",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4311116,
      longitude: -76.5081519,
      title: "FURVIN - Reciclaje en Cali",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4228771,
      longitude: -76.4949816,
      title: "Bodega de Reciclaje Franco",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4455293,
      longitude: -76.5227022,
      title: "GEO RECICLABLES DE COLOMBIA",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4193549,
      longitude: -76.5163054,
      title: "Eko Industria Del Reciclaje Plastico Sas",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4295543,
      longitude: -76.5355343,
      title: "Zona Eco *CENTRO DE RECICLAJE*",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4227651,
      longitude: -76.5215349,
      title: "RECICLADORA",
      description: "Centro de reciclaje",
    },
    {
      latitude: 3.4615077,
      longitude: -76.5151771,
      title: "Reciplanet S.A.S.",
      description: "Centro de reciclaje",
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Esperando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marcador de la ubicación actual del usuario */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            description="Estoy aquí"
          />

          {/* Marcadores de los centros de reciclaje */}
          {recyclingCenters.map((center, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: center.latitude, longitude: center.longitude }}
              title={center.title}
              description={center.description}
              image={require('../assets/logomaps.png')} // Verifica que el archivo logomaps.png esté en la carpeta correcta
            />
          ))}
        </MapView>
      ) : (
        <Text>Cargando mapa...</Text>
      )}
      <View style={styles.coordsContainer}>
        <Text style={styles.coordsText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coordsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  coordsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
