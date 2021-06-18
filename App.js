import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import firebase from 'firebase/app';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyDHsKzhUnyZKpoWLyGjEHkSkHV-gpXJA1M",
  authDomain: "socketed-ex.firebaseapp.com",
  projectId: "socketed-ex",
  storageBucket: "socketed-ex.appspot.com",
  messagingSenderId: "284011830837",
  appId: "1:284011830837:web:d5e03d5809726f05589b7c",
  measurementId: "G-624WLC1Y1T"
};
const  firebaseApp = firebase.initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import ForgotPassScreen from './components/auth/ForgotPass'

import SignupSetupNameScreen from './components/auth/SignupSetupName';
import SignupSetupPicScreen from './components/auth/SignupSetupPic'
import WelcomeScreen from './components/auth/Welcome'

import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import NotifyScreen from './components/main/Notify'
import SettingsScreem from './components/main/Settings'

const Stack = createStackNavigator(); 

export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {

    const { loggedIn, loaded } = this.state;

    if(!loaded){
      return(
        <View style = {{ flex:1, justifyContent:'center', alignItems:'center', }}>
          <Image source = { require('./assets/splash.png') } />
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "Register" component = {RegisterScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "Login" component = {LoginScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "ForgotPass" component = {ForgotPassScreen} options = {{headerShown: false}} />
            
            <Stack.Screen name = "SignupName" component = { SignupSetupNameScreen } options = {{headerShown: false}} />
            <Stack.Screen name = "SignupPic" component = { SignupSetupPicScreen } options = {{headerShown: false}} />
            <Stack.Screen name = "Welcome" component = {WelcomeScreen} options = {{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if (loggedIn){
      return(
        <Provider store={store} >
          <NavigationContainer>
            <Stack.Navigator initialRouteName = "Main" >
              <Stack.Screen name = "Main" component = { MainScreen } options={{headerShown:false}} />
              <Stack.Screen name = "Add" component = { AddScreen } />
              <Stack.Screen name = "Notify" component = { NotifyScreen } />
              <Stack.Screen name = "Settings" component = { SettingsScreem } />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    }

  }
}

export default App