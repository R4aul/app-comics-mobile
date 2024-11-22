import { useState, useCallback } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import { getAllComicsFavorites } from "../../services/FavoriteService";
import ComicsList from '../../components/ComicsList'

export default function MyComicsFavoritesScreen() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const { data, error } = await getAllComicsFavorites();
      if (error) {
        setError("Error al obtener los comics favoritos");
      } else {
        setFavorites(data);
      }
    } catch (error) {
      setError("Error al hacer la solicitud");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(()=>{
        fetchFavorites()
    },[])
  );

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

  const renderComicsList = ({item}) => <ComicsList item={item}/>

  return (
    <View>
        <FlatList
            data={favorites}
            renderItem={renderComicsList}
            keyExtractor={(item)=>item.id}
        />
    </View>
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
});
