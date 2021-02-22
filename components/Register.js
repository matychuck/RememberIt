import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import React, { Component } from "react";
import {ActivityIndicator, View, Text, StyleSheet, Alert} from "react-native";
import {Input} from "../elements/Input.js";
import {Button} from "../elements/Button.js";
import {SignUpButton} from "../elements/SignUpButton.js";
import firebase from '../Firebase';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
    }

  }
  
signUp(){

    const { email, password, confirmPassword } = this.state;

    if(confirmPassword === password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
		this.setState({
        		user,
        		error: '',
        	});
		Alert.alert(
                	'Success!',
                	'Your account has been created!',
                	[
                	  {text: 'OK', onPress:() => Actions.pop()},
                	],
              	)
	})
        .catch((error) => this.setState({
        user: null,
        error: error.message,
        }));

            
    }
    else{
        this.setState({
            error: 'Confirmed password is different'
        })
    }
}

  render() {
    return (
      <>
        <View style={styles.titleContainer}> 
            <Text style={styles.title}>RememberIt</Text>  
        </View>

        <View style={styles.container}>
            <View style={styles.form}>    
                <Input
                  placeholder='Enter your email'
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />

                <Input
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />

                <Input
                  placeholder='Confirm password'
                  secureTextEntry
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                  value={this.state.confirmPassword}
                />

                <View style={styles.centerContainer}>
                  <SignUpButton onPress = {() => this.signUp()}>Sign up</SignUpButton>
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
  }
});

export default Register;