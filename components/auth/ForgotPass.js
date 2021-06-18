import React, { Component } from 'react'
import { View, Text, SafeAreaView,TextInput, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native'

import firebase from 'firebase'

import AwesomeAlert from 'react-native-awesome-alerts';

const { width: WIDTH } = Dimensions.get('window')

export default class ForgotPass extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',

            showSendLinkAlert: false,
            showNoUserEmailAlert: false,
        }

        this.sendResetLink = this.sendResetLink.bind(this)
    }

    sendResetLink(){
        const {email} = this.state;

        firebase.auth().sendPasswordResetEmail(email)
        .then((result) => {
            this.showSendLinkAlert()
            this.props.navigation.navigate('Login')
            console.log(result)
        }).catch((error) => {
            this.showNoUserEmailAlert()
            console.log(error)
        })

    }

    showSendLinkAlert(){
        this.setState({ showSendLinkAlert: true })
    }
    hideSendLinkAlert(){
        this.setState({ showNoUserEmailAlert: false })
    }

    showNoUserEmailAlert(){
        this.setState({ showNoUserEmailAlert: true })
    }
    hideNoUserEmailAlert(){
        this.setState({ showNoUserEmailAlert: false })
    }

    render(){

        const {showSendLinkAlert} = this.state;
        const {showNoUserEmailAlert} = this.state;
        
        return(
            <ScrollView>
            <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{alignItems:'center', fontSize:65, fontWeight:'bold', color:'#571dde', marginTop: 200}} >Socketed</Text>
                <Text style={{marginTop: 10, fontSize: 28, color:'#474747' }} >Reset Password ?</Text>
                <Text style={{marginTop: 5, color:'#858585' }} >The recovery link is send to the</Text>
                <Text style={{marginTop: 0, color:'#858585' }} >corresponding email address.</Text>
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:45, marginTop: 20, fontSize: 18, }}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    placeholderTextColor = '#858585'
                    onChangeText = {(email) => this.setState({ email })}
                />
                <TouchableOpacity 
                    onPress = {() => this.sendResetLink()}
                    style={{backgroundColor:'#571dde',width: WIDTH - 275, borderRadius: 35,height:45, marginTop: 30, alignItems:'center'}} >
                    <Text style={{fontSize: 24, color: '#fff',paddingTop: 5}} >Send</Text>
                </TouchableOpacity>

                <AwesomeAlert
                    show={showSendLinkAlert}
                    showProgress={false}
                    title='Send'
                    message='Reset password link send to your mail.'
                    messageStyle={{ color:'#571dde' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideSendLinkAlert()}
                />

                <AwesomeAlert
                    show={showNoUserEmailAlert}
                    showProgress={false}
                    title='Oops'
                    message='No user email found!'
                    messageStyle={{ color:'#ff1100' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Ok buddy"
                    confirmButtonColor="#571dde"
                    onConfirmPressed={()=>this.hideNoUserEmailAlert()}
                />

            </SafeAreaView>
            </ScrollView>
        )
    }
}