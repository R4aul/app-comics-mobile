import { View, Text, StyleSheet } from 'react-native'

export default function CardReview({item}) {
    return (
        <View style={styles.reviewCard}>
            <Text style={styles.reviewUser}>{item.user.name}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
            <Text style={styles.reviewComment}>{item.review_text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    reviewUser: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewRating: {
        fontSize: 14,
        color: '#666',
    },
    reviewComment: {
        fontSize: 14,
        color: '#444',
    },
})