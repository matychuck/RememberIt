import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SignUpButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 15,
    width: '70%',
    backgroundColor: '#AD73DA',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  }
});

export { SignUpButton };