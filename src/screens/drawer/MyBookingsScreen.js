import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAllFavorites } from '../../services/UserServices'

export default function MyBookingsScreen() {
 
  const [favorites, setFavorite] = useState([]);
  
  const fetchFavorites = async () => {
    let { data } = await getAllFavorites();
    console.log(data);
    
    setFavorite(data)
  }
  
  useEffect(()=>{
    fetchFavorites()
    console.log(favorites);
  },[]);

  return (
    <View>
      <Text>Mis reservas</Text>
    </View>
  );
}
