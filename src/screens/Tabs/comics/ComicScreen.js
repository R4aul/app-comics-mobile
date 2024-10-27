import { View, Text, ActivityIndicator, StyleSheet, Image, FlatList, Button, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getComic } from '../../../services/ComicServices';
import { createReview } from '../../../services/ReviewServices';
import FormTextField from '../../../components/FormTextField';
import CardReview from '../../../components/CardReview'

export default function ComicScreen({ navigation, route }) {
  const { id } = route.params || {};
  const [comic, setComic] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

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

  const cardReview = ({item}) => <CardReview item={item}/>

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
              <Button title="Enviar Review" onPress={handleSubmitReview} />
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
});