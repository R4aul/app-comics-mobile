import { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AuthContext from '../../contexts/AuthContext'
import { logout } from '../../services/AuthServices'
import { getComics } from '../../services/ComicServices'
import FormTextField from '../../components/FormTextField'
import ComicsList from '../../components/ComicsList'

export default function ForMeScreen({ navigation }){
  const {user, setUser} = useContext(AuthContext) 
  const [comics, setComics] = useState([]); 
  const [filterComics, setFilterComics] = useState([])
  
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
      setFilterComics(data)
    }
    runEffect();
  },[]);

  const renderRecommendation = ({ item }) => <ComicsList item={item}/>;

  const searchFilterComics = (text) => {
    if (text) {
      const newComic = comics.filter(item=>{
        const itemComic = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textComic = text.toUpperCase();
        return itemComic.indexOf(textComic) > -1;
      });
      setFilterComics(newComic)
    } else {
      setFilterComics(comics)
    }
  }

  return (
    <View style={styles.container}>
      <FormTextField
        placeholder='Buscar Comic...'
        placeholderTextColor='#aaa'
        onChangeText={searchFilterComics}
      />
      <FlatList
        data={filterComics}
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
});
