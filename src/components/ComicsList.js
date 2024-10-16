import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'

export default function ComicsList({ navigation, item }) {
  const renderRecommendation = ({ item }) => {
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ComicScreen', { id: item.id })} // Accion al tocar la card
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.author.name}</Text>
      </View>
    </TouchableOpacity>
  }
  return (
    <View>
      <FlatList

      />

    </View>
  )
}
