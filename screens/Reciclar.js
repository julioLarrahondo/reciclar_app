import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const ReciclarScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Image
          source={require('../assets/reciclaje.png')}  // Ruta al archivo PNG
          style={styles.headerIcon}  // Estilo para la imagen
        />
        <Text style={styles.headerText}>{t('recycle')}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

// Simulación de datos de la tabla Materiales
const materiales = [
  { id: '1', Nombre_material: 'Madera', Foto: 'https://acortar.link/4Jc5UA', descripcion: 'La madera, un recurso renovable y versátil, puede ser reciclada para reducir la deforestación y disminuir el volumen de residuos en los vertederos' },
  { id: '2', Nombre_material: 'Acero', Foto: 'https://acortar.link/la7eUK' },
  { id: '3', Nombre_material: 'Concreto', Foto: 'https://acortar.link/HojRUS' },
  { id: '4', Nombre_material: 'Vidrio', Foto: 'https://acortar.link/KXAecZ' },
  { id: '5', Nombre_material: 'Plástico', Foto: 'https://acortar.link/gnhZC5' },
  { id: '6', Nombre_material: 'Papel', Foto: 'https://acortar.link/h1Cgjd' },
  { id: '7', Nombre_material: 'Aluminio', Foto: 'https://acortar.link/q67Ozb' },
  
];

const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = Math.floor(width / numColumns);

const MaterialCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.Foto }} style={styles.image} />
    <Text style={styles.title}>{item.Nombre_material}</Text>
  </TouchableOpacity>
);

const ReciclarComponent = () => {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    // Navegar a la pantalla de Forms y pasar el material como parámetro
    navigation.navigate('Forms', { material: item });
  };

  return (
    <FlatList
      data={materiales}
      renderItem={({ item }) => <MaterialCard item={item} onPress={() => handleCardPress(item)} />}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,  // Ajusta el tamaño de la imagen
    height: 40,  // Ajusta el tamaño de la imagen
    marginRight: 10,  // Espacio entre la imagen y el texto
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    padding: 0,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#388E3C',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: tileSize - 21,
    height: tileSize + 30,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: tileSize - 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
    textAlign: 'center',
  },
});

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ReciclarScreen />
      <ReciclarComponent />
    </View>
  );
};

export default App;
