import { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AuthContext from '../../contexts/AuthContext'
import { logout } from '../../services/AuthServices'
import { getComics } from '../../services/ComicServices'
import FormTextField from '../../components/FormTextField'

export default function ForMeScreen({ navigation }){
  const {user, setUser} = useContext(AuthContext) 
  const [comics, setComics] = useState(); 
  const [search = setSearch] = useState('')

  const handelLogoOut = async () => {
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: "Inicio",
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={handelLogoOut}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      ),
    });
    async function runEffect() {
      let {data} = await getComics();
      setComics(data);
    }
    runEffect();
  },[]);

  const renderRecommendation = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('ComicScreen', {id:item.id})} // Accion al tocar la card
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.author.name}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <FormTextField
        placeholder="Buscar comic..."
        onChangeText={setComics}
      />
      <FlatList
        data={comics}
        renderItem={renderRecommendation}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10, // Para separarlo del borde del header
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  
});
