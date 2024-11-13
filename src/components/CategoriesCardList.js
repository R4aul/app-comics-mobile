import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoriesCardList({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=> navigation.navigate('ComicsForCategories',{id:item.id})}>
      <ImageBackground
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSpDO8D0wv6pFOOvckBf3cmGNKEk93DiQRBA&s" }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Crea el efecto de sombra
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
});
