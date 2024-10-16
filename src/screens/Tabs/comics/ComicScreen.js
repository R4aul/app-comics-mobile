import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getComic } from '../../../services/ComicServices';

export default function ComicScreen({ navigation, route }) {
  const { id } = route.params || {}; // Asegúrate de que route.params esté definido
  const [comic, setComic] = useState();
  const [loading, setLoading] = useState(true); // Estado para saber si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  
  const fetchGetComic = async () => {
    try {
      console.log(`Fetching comic with id: ${id}`);
      let { data, error } = await getComic(id);
      
      if (error) {
        setError('Error al obtener el cómic');
      } else {
        setComic(data);
      }
    } catch (err) {
      setError('Error al hacer la solicitud');
    } finally {
      setLoading(false); // La solicitud ha terminado
    }
  };

  useEffect(() => {
    fetchGetComic();
  }, []);

  // Si está cargando, muestra un indicador de carga centrado
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando cómic...</Text>
      </View>
    );
  }

  // Si hay un error, muestra el mensaje de error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Si ya se cargó el cómic, lo muestra
  return (
    <View style={styles.container}>
      <Text>Comic Screen</Text>
      {comic ? (
        <Text>{comic.title}</Text>
      ) : (
        <Text>No se encontró el cómic.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },
  loadingText: {
    marginTop: 10, // Espacio entre el indicador y el texto
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
