import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FormTextField from '../components/FormTextField';

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/f6/7c/b4/f67cb4c7986817cbca9d51833d21448b.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de sesión</Text>
        <View style={styles.inputContainer}>
          <FormTextField
            placeholder='Correo'
            placeholderTextColor='#aaa'
          />
          <FormTextField
            placeholder='Contraseña'
            placeholderTextColor='#aaa'
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.noAccountText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerButtonText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  noAccountText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
