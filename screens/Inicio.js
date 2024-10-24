import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import * as Localization from 'expo-localization'; // Asegúrate de importar Localization si lo estás usando

const InicioScreen = () => {
  const [userData, setUserData] = useState(null); // Estado para guardar datos del usuario
  const [newsData, setNewsData] = useState([]); // Estado para guardar datos de las noticias
  const [loadingUser, setLoadingUser] = useState(true); // Estado para manejar el indicador de carga del usuario
  const [loadingNews, setLoadingNews] = useState(true); // Estado para manejar el indicador de carga de noticias
  const userId = "66f4cede0542f7c4d039e383"; // ID de usuario
  const userLanguage = Localization.locale.split('-')[0]; // Idioma del usuario

  // Función para obtener datos del usuario
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://apipyton.onrender.com/api/usuario/${userId}`);
      console.log('Respuesta de usuario:', response.data); // Agregado
      if (response.data.body && response.data.body.success) {
        setUserData(response.data.body.data);
      } else {
        console.log('Error al obtener los datos del usuario:', response.data.body.error);
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    } finally {
      setLoadingUser(false); // Finaliza la carga del usuario
    }
  };

  // Función para obtener las noticias
  const fetchNewsData = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'reciclar', // Palabra clave de búsqueda
          language: userLanguage,
          pageSize: 10,
          apiKey: 'c99df673b9a04edd89fa65ba6b2be921', // Tu clave API de NewsAPI
        },
      });
      //console.log('Respuesta de noticias:', response.data); // Agregado
      if (response.data.articles) {
        setNewsData(response.data.articles); // Guardar las noticias
      } else {
        console.log('Error al obtener las noticias');
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    } finally {
      setLoadingNews(false); // Finaliza la carga de noticias
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchNewsData();
    };
    
    fetchData(); // Llamada a la función que obtiene ambos datos
  }, []);

  // Mostrar indicador de carga mientras se cargan los datos
  if (loadingUser || loadingNews) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView>
        {userData && (
          <Text style={styles.welcome}>Bienvenido, {userData.nombres} {userData.apellidos}</Text>
        )}

<View style={styles.circleButtons}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.circleButton} />
          ))}
        </View>

        <View style={styles.chart}>
          {['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#43AA8B'].map((color, i) => (
            <View key={i} style={[styles.bar, { height: 20 + i * 15, backgroundColor: color }]} />
          ))}
        </View>

<Text style={styles.sectionTitle}>Noticias:</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.newsContainer}>
  {newsData.map((article, index) => (
    <View key={index} style={styles.newsItem}>
      {article.urlToImage ? (
        <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
          <Image source={{ uri: article.urlToImage }} style={styles.newsImage} />
        </TouchableOpacity>
      ) : (
        <Text>(No hay imagen disponible)</Text>
      )}
      <Text style={styles.newsText}>{article.title}</Text>
    </View>
  ))}
</ScrollView>
<Text style={styles.sectionTitle}>Marcas aliadas:</Text>
        <View style={styles.brandsContainer}>
          <Image source={{ uri: 'https://acortar.link/lOB6wS' }} style={styles.brandLogo} />
          <Image source={{ uri: 'https://acortar.link/HMaSB7' }} style={styles.brandLogo} />
          <Image source={{ uri: 'https://acortar.link/pA0JA6' }} style={styles.brandLogo} />
        </View>

      </ScrollView>
      


    </SafeAreaView>

    
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
  },

  circleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
  },

  chart: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },

  bar: {
    width: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  newsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  newsItem: {
    marginRight: 10,
    width: 150,
    
  },
  newsImage: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  newsText: {
    marginTop: 5,
  },
  brandsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  brandLogo: {
    width: 110,
    height: 60,
   
  },
});

export default InicioScreen;
