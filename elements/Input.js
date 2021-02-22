import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    marginBottom:5,
    color: '#333333',
    fontSize: 16,
    width: '100%',
  }
});

export { Input };