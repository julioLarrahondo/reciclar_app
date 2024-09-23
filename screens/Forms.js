import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Forms = () => {
  const route = useRoute();
  const { material } = route.params;
  const { t } = useTranslation();

  const [idUsuario, setIdUsuario] = useState('');
  const [idMaterial] = useState(material?.Nombre_material || '');
  const [descripcion] = useState(material?.descripcion || '');
  const [cantidad, setCantidad] = useState('');
  const [fecha] = useState(new Date());
  const [puntos, setPuntos] = useState('');
  const [foto, setFoto] = useState(material?.Foto || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({
      idUsuario,
      idMaterial,
      cantidad,
      fecha,
      puntos,
      foto,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('recycling.record')}</Text>

      {foto && <Image source={{ uri: foto }} style={styles.image} />}

      {/* ID Usuario (opcional) */}
      {/* 
      <TextInput
        style={styles.input}
        placeholder="ID Usuario"
        value={idUsuario}
        onChangeText={setIdUsuario}
        keyboardType="numeric"
      />
      */}

      <Text style={styles.title}>{idMaterial}</Text>
      <Text style={styles.date}>{fecha.toLocaleDateString()}</Text>

      <Text style={styles.date}>{descripcion}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('recycling.quantity')}
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
{/*
      <TextInput
        style={styles.input}
        placeholder="Puntos"
        value={puntos}
        onChangeText={setPuntos}
        keyboardType="numeric"
      />
*/}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenido se expanda
    padding: 2,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
    textAlign: 'justify',
  },
  image: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#388E3C',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Forms;
