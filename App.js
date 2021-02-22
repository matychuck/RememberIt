import React from 'react';
import { Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  TextInput
} from 'react-native';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import Login from "./components/Login.js"
import Register from './components/Register.js';
import Memories from './components/Memories.js';
import ResetPassword from './components/ResetPasssword.js';
import Creation from './components/Creation.js';
import Details from './components/Details.js';

export default class App extends React.Component
{
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <>
          <Router>
              <Stack key="root">
                  <Scene key="login" component={Login} title="Login" hideNavBar={true} initial />
                  <Scene key="register" component={Register} title="Register" hideNavBar={true} />
                  <Scene key="resetPassword" component={ResetPassword} title="ResetPassword" hideNavBar={true} />
                  <Scene key="memories" component={Memories} title="Memories" hideNavBar={true}/>
                  <Scene key="creation" component={Creation} title="Creation" hideNavBar={true} />
                  <Scene key="details" component={Details} title="Details" hideNavBar={true} />
              </Stack>
            </Router>
        </>
        );
    }
}