import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecommendationCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ComicScreen', { id: item.id })}
    >
      <Image
        source={{
          uri: 'https://media.gettyimages.com/id/1252349524/es/vector/efectos-de-dibujos-animados.jpg?s=612x612&w=gi&k=20&c=YSsVv3x2r4xPS8jVR4RMuuwHUnuszQYLIGLzVm0-GBs=',
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.author.name}</Text>
        {item.pivot ? (
          <>
            <Text style={styles.bookingDate}>
              Día de la reserva: {item.pivot.booking_date}
            </Text>
            <Text style={styles.finalDate}>
              Día de la entrega: {item.pivot.final_date}
            </Text>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#4CAF50', // Verde para destacar las reservas
    fontWeight: 'bold',
  },
  finalDate: {
    fontSize: 14,
    color: '#FF5722', // Naranja para las entregas
    fontWeight: 'bold',
  },
});

export default RecommendationCard;
