import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import React, { Component } from "react";
import {ActivityIndicator, View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";
import {Input} from "../elements/Input.js";
import {Button} from "../elements/Button.js";
import {SignUpButton} from "../elements/SignUpButton.js";
import firebase from '../Firebase';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        error: ''
    }

  }
  
resetPassword(){

    const { email } = this.state;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        Alert.alert(
            'Success!',
            'Email with new password has been sent',
            [
              {text: 'OK', onPress:() => Actions.pop()},
            ],
          )
      }).catch((error) => this.setState({
        error: error.message
        })
      );
}

  render() {
    return (
      <>
        <View style={styles.titleContainer}> 
            <Text style={styles.title}>RememberIt</Text>  
        </View>

        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.centerContainer}>
                    <Text style={styles.warning}>If you have forgotten your password you can reset it here</Text>
                </View>
                <Input
                  placeholder='Enter your email'
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
                <View style={styles.centerContainer}>
                  <SignUpButton onPress = {() => this.resetPassword()}>Reset password</SignUpButton>
                </View>
            </View>
        </View>

        <View style={styles.centerContainer}>
            <Text style={styles.error}>{this.state.error}</Text>
        </View>

      </>
    );
  }
  
}
    

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      flexDirection: 'row'
    },
  form: {
      flex: 1
  },
  title: {
    fontSize: 32,
    fontFamily: 'sans-serif-thin',
  },
  titleContainer: {
    padding: 10,
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  centerContainer: {
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  error: {
    color: 'red'
  },
  warning: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row'
  }
});

export default ResetPassword;