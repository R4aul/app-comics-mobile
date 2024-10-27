import { View, StyleSheet } from 'react-native'

export default function Layout({chldrem}) {
  return (
    <View style={style.container}>
        {chldrem}
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        padding:10,
    }
})