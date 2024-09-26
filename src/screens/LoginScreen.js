import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function LoginScreen({ navigation }) {
  useEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  },[]);
  return (
    <View>
        <Text>LoginScreen</Text>
    </View>
  )
}
