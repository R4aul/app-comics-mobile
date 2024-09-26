import { useEffect } from 'react'
import { View, Text, Button } from 'react-native'

export default function ResgisterScreen({navigation}) {
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    });
  },[]);
  
  const handelLogin = () => {
    navigation.navigate('Home')
  }
  return (
    <View>
      <Text>ResgisterScreen</Text>
      <Button title='Home' onPress={handelLogin}/>
    </View>
  )
}