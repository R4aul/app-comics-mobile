import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importación de los íconos
import { getComic } from '../../../services/ComicServices'; // Servicio para obtener detalles del cómic
import { createReview } from '../../../services/ReviewServices'; // Servicio para crear reseñas
import { logout } from '../../../services/AuthServices'; // Servicio para cerrar sesión
import FormTextField from '../../../components/FormTextField'; // Componente personalizado para campos de texto
import CardReview from '../../../components/CardReview'; // Componente para renderizar reseñas
import { checkBookingStatus, checkComicFavoriteStatus } from '../../../services/UserServices'
import { storeOrChoiseComicFavorite } from '../../../services/FavoriteService'
import { store } from '../../../services/BookingService'

export default function ComicScreen({ navigation, route }) {
  const { id } = route.params || {};
  const [comic, setComic] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isBooking, setIsBooking] = useState(false)
  const [isComicFavorite, setIsComicFavorite] = useState(false)

  const handelLogoOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

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
      setLoading(false);
    }
  };

  const fetchCheckBookingStatus = async () =>{
    try {
      const {data} = await checkBookingStatus(id); 
      setIsBooking(data.isBooking);
    } catch (error) {
      console.log("Error al verificar el estado de reserva")
    }
  }

  const fetchCheckComicFavoriteStatus = async () =>{
    try {
      const { data } = await checkComicFavoriteStatus(id);
      console.log(data);
      setIsComicFavorite(data.isComicFavorite)
    } catch (error) {
      console.log("Error al verificar el stadi de comic favorito") 
    }
  }

  const toggleBooking = async () => {
    try {
      let request = {
        comic_id:id,
      };
      const { data } = await store(request);
      console.log(data)
      setIsBooking(!isBooking);
    } catch (error) {
      console.log(error); 
    }
  }
  const toggleComicFavorite = async () => {
    try {
      let request = {
        comic_id: id
      }
      const { data } = await storeOrChoiseComicFavorite(request)
      console.log(data);
      setIsComicFavorite(!isComicFavorite);
    } catch (error) {
      console.log("Error al guardar en favoritos")
    }
  }


  const handleSubmitReview = async () => {
    try {
      let data = {
        review_text: reviewText,
        rating: rating,
        comic_id: comic.id,
      };
      await createReview(data);
      setRating('');
      setReviewText('');
      fetchGetComic();
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data.errors);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Comic',
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={handelLogoOut}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      ),
    });
    fetchGetComic();
    fetchCheckBookingStatus();
    fetchCheckComicFavoriteStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando cómic...</Text>
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

  const cardReview = ({ item }) => <CardReview item={item} />;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        contentContainerStyle={styles.container}
        data={comic ? [comic] : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.comicImage} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Author: {item.author.name}</Text>
            <Text style={styles.category}>Categoria: {item.category.name}</Text>

            {/* Botones con íconos */}
            <View style={styles.iconButtonsContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleBooking}>
                <Icon name={isBooking ? "book-sharp" : "book-outline"} size={24} color="#4CAF50" />
                <Text style={styles.iconButtonText}>Reservar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={toggleComicFavorite}>
                <Icon name={isComicFavorite ? "heart-sharp" :"heart-outline"} size={24} color="#FF6347" />
                <Text style={styles.iconButtonText}>Favorito</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Escribe una reseña</Text>
              <FormTextField
                placeholder="Rating (1-5)"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
                errors={errors.rating}
              />
              <FormTextField
                placeholder="Escribe tu reseña"
                placeholderTextColor="#aaa"
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                errors={errors.review_text}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                <Text style={styles.submitButtonText}>Enviar Review</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Reseñas:</Text>
            <FlatList
              data={item.reviews}
              keyExtractor={(review) => review.id.toString()}
              renderItem={cardReview}
            />
          </>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  comicImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});