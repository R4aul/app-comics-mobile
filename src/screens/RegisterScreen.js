import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { register, loaduser } from '../services/AuthServices'
import FormTextField from '../components/FormTextField'
import AuthContext from '../contexts/AuthContext'

export default function RegisterScreen({ navigation }) {
  
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [client, setClient] = useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  });

  const [errors, setErrors] = useState({});

  const handelChange = (name, value) => setClient({...client, [name]:value})

  const handelRegister = async () => {
    try {
      await register(client);
      const user = loaduser();
      console.log(user)
      setUser(user);
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data.errors)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <View style={styles.inputContainer}>
        <FormTextField
          placeholder='Nombre'
          placeholderTextColor="#aaa" 
          onChangeText={(text)=>handelChange('name',text)}
          errors={errors.name}
        />
        
        <FormTextField
          placeholder='Correo' 
          placeholderTextColor="#aaa" 
          onChangeText={(text)=>handelChange('email',text)}
          errors={errors.email}
        />
        <FormTextField
          placeholder='Contraseña' 
          placeholderTextColor="#aaa"
          onChangeText={(text)=>handelChange('password',text)} 
          errors={errors.password}
          secureTextEntry 
        />
        <FormTextField
          placeholder='Confirmar contraseña'
          placeholderTextColor="#aaa" 
          onChangeText={(text)=>handelChange('password_confirmation',text)} 
          errors={errors.password}
          secureTextEntry 
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handelRegister}>
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