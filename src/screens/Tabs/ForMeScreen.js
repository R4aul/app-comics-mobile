import { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function ForMeScreen({ navigation }){

  useEffect(()=>{
    navigation.setOptions({
      //aqui se definen todos los atributos adicionales de la pantalla como el header o estilos similar a que lo realisaras con el atributo options del desde el archivo App
    });
  },[]);

  return (
    <View>
      <Text> textInComponent </Text>
    </View>
  )
}
