import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getAllFavorites } from "../../services/UserServices";
import CategoriesCardList from "../../components/CategoriesCardList";
import { useFocusEffect } from "@react-navigation/native";

export default function MyFavoritesScreen() {
  const [error, setError] = useState("");
  const [favorites, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true); // Establece loading a true al iniciar la carga
    try {
      let { data, error } = await getAllFavorites();
      if (error) {
        setError("Error al obtener las categorías favoritas");
      } else {
        setFavorite(data);
      }
    } catch (error) {
      setError("Error al hacer la solicitud");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites(); // Llama a fetchFavorites cada vez que la pantalla se enfoca
    }, [])
  );

  const renderCategoriesCardList = ({ item }) => (
    <CategoriesCardList item={item} />
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

  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderCategoriesCardList}
        keyExtractor={(item) => item.id.toString()}
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
