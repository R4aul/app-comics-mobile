import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getAllCategories } from "../../services/ComicServices";
import CategoriesCardList from "../../components/CategoriesCardList";

export default function CategoriesComics() {
  const [error, setError] = useState(""); // Cambiado a cadena vacía
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      let { data, error } = await getAllCategories();
      //console.log(data);

      if (error) {
        setError("Error al obtener las categorias");
      } else {
        setCategories(data);
      }
    } catch (error) {
      setError("Error al hacer la solicitud");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando categorias...</Text>
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

  const renderCategoriesCardList = ({ item }) => (
    <CategoriesCardList item={item} />
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategoriesCardList}
        keyExtractor={(item) => item.id}
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
