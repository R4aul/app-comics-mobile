import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FormTextField from '../components/FormTextField';
import AuthContext from '../contexts/AuthContext'
import { login, loaduser } from '../services/AuthServices'

export default function LoginScreen({ navigation }) {

  const { setUser } =  useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

 const [client, setClient] = useState({
    email:'',
    password:''
 });

 const [errors, setErrors] = useState({});
  
 const handelChange = (name, value ) => setClient({...client, [name]:value});
  
 const handelSubmit = async () => {
    try {
      await login(client); 
      const user = loaduser();
      console.log(user);
      
      setUser(user);
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
 }

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de sesión</Text>
        <View style={styles.inputContainer}>
          <FormTextField
            placeholder='Correo'
            placeholderTextColor='#aaa'
            onChangeText={(text)=>handelChange('email',text)}
            errors={errors.email}
          />
          <FormTextField
            placeholder='Contraseña'
            placeholderTextColor='#aaa'
            onChangeText={(text)=>handelChange('password', text)}
            secureTextEntry
            errors={errors.password}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handelSubmit}>
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
