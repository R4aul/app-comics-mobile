import React from 'react'
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormTextField({ errors = [], ...res }) {
  return (
   <View>
      <TextInput style={styles.textInput}  autoCapitalize="none" {...res}/>
      {errors.map((err) => {
        return (
          <Text key={err} style={styles.error} >
            {err}
          </Text>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: 16,
  },

  error: {
    color: "red",
    marginLeft:8
  },
});
