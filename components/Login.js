import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import React, { Component } from "react";
import {ActivityIndicator, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Input} from "../elements/Input.js";
import {Button} from "../elements/Button.js";
import {SignUpButton} from "../elements/SignUpButton.js";
import firebase from '../Firebase';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
        fetchToggle:true
    }
  }

  clearUser(){
    this.setState({
      user: null
    });
  }

  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch((error) => this.setState({
        authenticating: false,
        user: null,
        error: error.message,
      }));
  }

    renderCurrentState() {
        if (this.state.authenticating) {
          return (
            <View style={styles.form}>
              <ActivityIndicator size='large' />
            </View>
          )
        }

        if (this.state.user !== null) {
          Actions.memories({userId: this.state.user.user.uid});
          this.clearUser();
        }

    return (
    <>
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

                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity onPress={() => Actions.resetPassword()}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <Button onPress={() => this.onPressSignIn()}>Log In</Button>

                <View style={styles.centerContainer}>
                  <Text style={styles.or}>OR</Text>
                </View>
                
                <View style={styles.centerContainer}>
                  <Text style={styles.or}>Don't have an account?</Text>
                </View>

                <View style={styles.centerContainer}>
                  <SignUpButton onPress = {() => Actions.register()}>Sign up</SignUpButton>
                </View>

                <View style={styles.centerContainer}>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
        </View>
    </>
    );
  }
  render() {
      return (
        <>
        <View style={styles.titleContainer}> 
            <Text style={styles.title}>RememberIt</Text>  
        </View>

        <View style={styles.container}>
            {this.renderCurrentState()}
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
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  forgotPassword: {
    color: '#05B7D6'
  },
  centerContainer: {
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  or: {
    color: '#B2B3B4'
  },
  error: {
    color: 'red'
  }
});

export default Login;