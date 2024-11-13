import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { getComicsForCategory } from "../../services/ComicServices";
import { choisePreferences, checkIfFavoriteStatus } from '../../services/UserServices'; // Asegúrate de tener estas funciones en UserServices
import ComicsList from '../../components/ComicsList';
import { FontAwesome } from '@expo/vector-icons';

export default function ComicsForCategories({ route }) {
  const backgroundImage = 'https://via.placeholder.com/600x400';
  const { id } = route.params;
  
  const [error, setError] = useState("");
  const [comics, setComics] = useState({});
  const [listComics, setListComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para la categoría favorita

  const fetchComics = async () => {
    try {
      const { data, error } = await getComicsForCategory(id);
      if (error) {
        setError("Error al obtener los comics de las categorías");
      } else {
        setComics(data);
        setListComics(data.comics);
      }
    } catch (error) {
      setError("Error al hacer la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const { data } = await checkIfFavoriteStatus(id); // Llama al backend para verificar si es favorito
      console.log(data);
      
      setIsFavorite(data.isFavorite); // Asigna el resultado de la verificación al estado
    } catch (error) {
      console.error("Error al verificar el estado de favorito:", error);
    }
  };

  //function para canviar el status de favorito
  const toggleFavorite = async () => {
    try {
      let {data} = await choisePreferences([id]); // Enviar la categoría como preferida al backend
      console.log(data);
      
      setIsFavorite(!isFavorite); // Cambia el estado de favorito localmente
    } catch (error) {
      console.error("Error al guardar la preferencia:", error);
    }
  };

  useEffect(() => {
    fetchComics();
    checkFavoriteStatus(); // Llama a la función para verificar el estado de favorito al cargar
  }, []);

  const renderComic = ({ item }) => <ComicsList item={item} />;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando categorías...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage} blurRadius={5}>
        <View style={styles.overlay}>
          <Text style={styles.categoryTitle}>{comics.name}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <FontAwesome name={isFavorite ? "star" : "star-o"} size={24} color="yellow" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <FlatList
        data={listComics}
        renderItem={renderComic}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  categoryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
