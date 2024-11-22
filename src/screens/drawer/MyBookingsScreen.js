import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { index } from '../../services/BookingService'
import ComicsList from '../../components/ComicsList'

export default function MyBookingsScreen() {
 
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  
  const fetchFavorites = async () => {
    try {
      let { data, error } = await index();
      if (error) {
        setError("Error al obtener mis recervas")
      } else {
        setBookings(data)
      }
    } catch (error) {
      setError("Error al hacer la solicitud")
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchFavorites()
  },[]);

  console.log(bookings);
  

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
        data={bookings}
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