import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FormTextField from '../components/FormTextField'

export default function RegisterScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <View style={styles.inputContainer}>
        <FormTextField
          placeholder='Nombre'
          placeholderTextColor="#aaa" 
        />
        
        <FormTextField
          placeholder='Correo' 
          placeholderTextColor="#aaa" 
        />
        <FormTextField
          placeholder='Contraseña' 
          placeholderTextColor="#aaa" 
          secureTextEntry 
        />
        <FormTextField
          placeholder='Confirmar contraseña'
          placeholderTextColor="#aaa" 
          secureTextEntry 
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.noAccountText}>¿Ya tienes una cuenta?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginButtonText}>iniciar sesion</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
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

  noAccountText:{
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },

  loginButton:{
    marginTop:3
  },

  loginButtonText:{
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  }

});