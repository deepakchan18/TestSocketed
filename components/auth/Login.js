import React, { Component } from 'react'

import { Text, View, SafeAreaView, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native'

import Feather from 'react-native-vector-icons/Feather';

import AwesomeAlert from 'react-native-awesome-alerts';



import firebase from 'firebase'

const { width: WIDTH } = Dimensions.get('window')
export class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',

            secureTextEntry: true,

            isValidEmail: true,
            isValidPass: true,

            showUserNotFoundAlert: false,
            showWrongPasswordAlert: false,
            showInvalidEmailAlert: false,
            showDefaultAlert: false,
        }

        this.onSignIn = this.onSignIn.bind(this)
    }


    onSignIn(){
        const emformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emformat.test(this.state.email) === true){
            console.log('email passed')
            if(this.state.password.trim() != ''){
                console.log('password passed')

                const { email, password, name } = this.state;
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error.code)
                    switch(error.code){
                        case 'auth/user-not-found':
                            this.showUserNotFoundAlert()
                            break;
                        case 'auth/wrong-password':
                            this.showWrongPasswordAlert()
                            break;
                        case 'auth/invalid-email':
                            this.showInvalidEmailAlert()
                            break;
                        default:
                            this.showDefaultAlert()
                            break;
                    }
                })

            }else{this.setState({ isValidPass: false })}
        }else{this.setState({ isValidEmail: false })}

    }

    handleEmail(){
        const emformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emformat.test(this.state.email) === true){
            this.setState({ isValidEmail: true })
        }else{
            this.setState({ isValidEmail: false })
        }
    }

    handlePass(){
        if( this.state.password.trim() != '' ){
            this.setState({ isValidPass: true })
        }else{
            this.setState({ isValidPass: false })
        }
    }

    showUserNotFoundAlert(){
        this.setState({ showUserNotFoundAlert: true })
    }
    hideUserNotFoundAlert(){
        this.setState({ showUserNotFoundAlert: false })
    }

    showWrongPasswordAlert(){
        this.setState({ showWrongPasswordAlert: true })
    }
    hideWrongPasswordAlert(){
        this.setState({ showWrongPasswordAlert: false })
    }

    showInvalidEmailAlert(){
        this.setState({ showInvalidEmailAlert: true })
    }
    hideInvalidEmailAlert(){
        this.setState({ showInvalidEmailAlert: false })
    }

    showDefaultAlert(){
        this.setState({ showDefaultAlert: true })
    }
    hideDefaultAlert(){
        this.setState({ showDefaultAlert: false })
    }

    render() {

        const {showUserNotFoundAlert} = this.state;
        const {showWrongPasswordAlert} = this.state;
        const {showInvalidEmailAlert} = this.state;
        const {showDefaultAlert} = this.state;

        return (
            <ScrollView>
                <SafeAreaView style={{ flex:1, alignItems:'center', justifyContent:'center', }} >
                <Text style={{alignItems:'center', fontSize:65, fontWeight:'bold', color:'#571dde', marginTop: 125}} >Socketed</Text>
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:35, marginTop: 75, fontSize: 18, }}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    placeholderTextColor = '#858585'
                    onChangeText = {(email) => this.setState({ email })}
                    onEndEditing = {(e) => this.handleEmail(e.nativeEvent.text)}
                />
                
                {this.state.isValidEmail ? null : <Text style={{marginTop: 0, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Email field is empty or badly formatted.</Text> }
                
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:35, marginTop: 10, fontSize: 18, }}
                    placeholder = 'Password'
                    secureTextEntry = {this.state.secureTextEntry ? true : false}
                    placeholderTextColor = '#858585'
                    onChangeText = {(password) => this.setState({ password })}
                    onEndEditing = {(e) => this.handlePass(e.nativeEvent.text)}
                />
                <TouchableOpacity style={{ top: -40, right: -125 }} onPress = {()=> this.setState({secureTextEntry: !this.state.secureTextEntry})} >
                    {this.state.secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20} /> : 
                        <Feather name="eye" color="grey" size={20} /> }
                </TouchableOpacity>
                
                {this.state.isValidPass ? null : <Text style={{marginTop: -20, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Password field should not empty.</Text> }
                
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("ForgotPass")}
                    style={{ top: 0, left: 75}}
                    >
                    <Text style={{textAlign: 'center', color: '#5c5c5c'}} >forgot password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {{ top: -10 }}
                    onPress = {() => this.onSignIn()}
                    >
                <Text style={{textAlign:'center', color:'#571dee', fontSize:24, paddingTop:25 }} >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{  }}
                    onPress = {() => this.props.navigation.navigate("Register")}
                    >
                    <Text style={{alignItems: 'center', textAlign:'center', color:'#5c5c5c', fontSize: 18 }} >Don't have an account ? SignUp</Text>
                </TouchableOpacity>

                <AwesomeAlert
                    show={showUserNotFoundAlert}
                    showProgress={false}
                    title='Invalid'
                    message='Invalid user credentails.'
                    messageStyle={{ color:'#ff1100' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideUserNotFoundAlert()}
                />

                <AwesomeAlert
                    show={showWrongPasswordAlert}
                    showProgress={false}
                    title='Incorrect password'
                    message='Password you have entered is wrong.'
                    messageStyle={{ color:'#ff1100' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideWrongPasswordAlert()}
                />

                <AwesomeAlert
                    show={showInvalidEmailAlert}
                    showProgress={false}
                    title='Invali email'
                    message='You have entered invalid email address.'
                    messageStyle={{ color:'#ff1100' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideInvalidEmailAlert()}
                />

                <AwesomeAlert
                    show={showDefaultAlert}
                    showProgress={false}
                    title='Oops'
                    message='Something went wrong, try again later.'
                    messageStyle={{ color:'#ff1100' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideDefaultAlert()}
                />

                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default Login

