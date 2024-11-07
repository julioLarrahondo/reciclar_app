import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import '../services/i18next';
import { useTranslation } from 'react-i18next';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function Component({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '630915708984-ig6cki2m5ta5n58f41hcakjsciqj9eil.apps.googleusercontent.com',
    expoClientId: '630915708984-ig6cki2m5ta5n58f41hcakjsciqj9eil.apps.googleusercontent.com',
    androidClientId: '630915708984-ig6cki2m5ta5n58f41hcakjsciqj9eil.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('User data:', data);
        onLogin();
      })
      .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [response, onLogin]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://apipyton.onrender.com/auth-basic/login', {
        email,
        password
      });
  
      if (response.data.user) {
        const userId = response.data.user.id;
        console.log('Login successful. User ID:', userId);
  
        onLogin(userId); // Pasamos userId al App.js
      } else {
        Alert.alert('Error', 'Credenciales incorrectas o ID de usuario faltante.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Algo salió mal. Por favor, intenta nuevamente.');
    }
  };
  

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoT.png')} style={styles.logo} />
      <Text style={styles.title}>{t('appName')}</Text>
      <Text style={styles.subtitle}>Log in to start recycling</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="#388E3C" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#388E3C" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} disabled={!request}>
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F1F8E9',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#388E3C',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#388E3C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
