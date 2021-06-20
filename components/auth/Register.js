import React, { Component } from 'react'

import { Text, View, Button, TextInput, SafeAreaView, Dimensions, TouchableOpacity,ScrollView, Alert, } from 'react-native'

import firebase from 'firebase/app'

import Feather from 'react-native-vector-icons/Feather';

import AwesomeAlert from 'react-native-awesome-alerts';

const { width: WIDTH } = Dimensions.get('window')
export class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            confpass:'',

            name: '',
            username:'',
            profilepicture:'',

            secureTextEntry: true,
            confSecureTextEntry: true,

            isValidEmail: true,
            isValidPass: true,
            isValidConfPass: true,

            showEmailExtAlert: false,
            showDefaultAlert: false,
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    async onSignUp(){

        //const emformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //if( emformat.test(this.state.email) === true ){
            //console.log('email passed')
            //if( this.state.password.trim().length >= 8 ){
                //console.log('password passed')
                //if( this.state.confpass === this.state.password ){
                    //console.log('conf password passed')
                    

                    const { email, confpass, name, username, profilepicture } = this.state;
                    firebase.auth().createUserWithEmailAndPassword(email, confpass)
                    .then(
                        (result) => {
                            firebase.firestore().collection("users")
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                email,
                                name,
                                username,
                                profilepicture,
                            })
                            console.log(result)
                        },
                        this.props.navigation.navigate("SignupName")
                    )
                    .catch((error) => {
                        console.log(error.code)
                        //switch(error.code){
                            //case 'auth/email-already-in-use':
                                //console.log('email address is exists')
                                //this.showEmailExtAlert()
                                //break;
                            //default:
                                //console.log('default case')
                                //this.showDefaultAlert()
                                //break;
                        //}
                    })

                //}else{ this.setState({ isValidConfPass: false }) }
            //}else{ this.setState({ isValidPass: false }) }
        //}else{ this.setState({ isValidEmail: false }) }        
    }

    handleUserEmail(){
        const emformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emformat.test(this.state.email) === true){
            this.setState({ isValidEmail: true })
        }else{
            this.setState({ isValidEmail: false })
        }
    }

    handleUserPass(){
        if( this.state.password.trim().length >= 8 ){
            this.setState({ isValidPass: true })
        }else{
            this.setState({ isValidPass: false })
        }
    }

    handleUserConfPass(){
        if(this.state.confpass === this.state.password){
            this.setState({ isValidConfPass: true })
        }else{
            this.setState({ isValidConfPass: false })
        }
    }

    
    showEmailExtAlert(){
        this.setState({ showEmailExtAlert: true })
    }
    hideEmailExtAlert(){
        this.setState({ showEmailExtAlert: false })
    }

    showDefaultAlert(){
        this.setState({ showDefaultAlert: true })
    }
    hideDefaultAlert(){
        this.setState({ showDefaultAlert: false })
    }


    render() {

        const {showEmailExtAlert} = this.state;
        const {showDefaultAlert} = this.state;

        return (

            <ScrollView>

            <SafeAreaView style={{ flex:1, alignItems:'center', justifyContent:'center', }} >
            <Text style={{alignItems:'center', fontSize:65, fontWeight:'bold', color:'#571dde', marginTop: 85}} >Socketed</Text>
                
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60, borderRadius:35, paddingLeft:45, marginTop: 50, fontSize: 18, }}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    placeholderTextColor = '#858585'
                    onChangeText = {(email) => this.setState({ email })}
                    onEndEditing = {(e) => this.handleUserEmail(e.nativeEvent.text)}
                />

                { this.state.isValidEmail ? null : <Text style={{marginTop: 5, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Email is empty or badly formatted.</Text> }

                <View style={{ backgroundColor: '#e5e5e5', height: 60, borderRadius:35, flexDirection: 'row', marginTop: 10, paddingBottom: 5, width: WIDTH -100, }} >
                <TextInput
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : -12, paddingLeft: 45, fontSize: 18, marginTop:6, }}
                    placeholder = 'Password'
                    secureTextEntry = {this.state.secureTextEntry ? true : false}
                    placeholderTextColor = '#858585'
                    onChangeText = {(password) => this.setState({ password })}
                    onEndEditing = {(e) => this.handleUserPass(e.nativeEvent.text)}
                />
                <TouchableOpacity style={{ right: 15, marginTop:20 }} onPress = {()=> this.setState({secureTextEntry: !this.state.secureTextEntry})} >
                    {this.state.secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20} /> : 
                        <Feather name="eye" color="grey" size={20} /> }
                </TouchableOpacity>
                </View>

                {this.state.isValidPass ? null : <Text style={{ marginTop: 5, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center' }} >Password must be atleast 8 characters.</Text>}

                <View style={{ backgroundColor: '#e5e5e5', height: 60, borderRadius:35, flexDirection: 'row', marginTop: 10, paddingBottom: 5, width: WIDTH -100, }} >
                <TextInput
                    style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : -12, paddingLeft: 45, fontSize: 18, marginTop:6, }}
                    placeholder = 'Confirm Password'
                    secureTextEntry = {this.state.confSecureTextEntry ? true : false}
                    placeholderTextColor = '#858585'
                    onChangeText ={(confpass) => this.setState({confpass})}
                    onEndEditing = {(e) => this.handleUserConfPass(e.nativeEvent.text)}
                />
                <TouchableOpacity style={{ right: 15, marginTop:20, }} onPress = {()=> this.setState({confSecureTextEntry: !this.state.confSecureTextEntry})} >
                    {this.state.confSecureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20} /> : 
                        <Feather name="eye" color="grey" size={20} /> }
                </TouchableOpacity>
                </View>

                { this.state.isValidConfPass ? null : <Text style={{marginTop: 5, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Passwords are not same.</Text> }

                <Text style={{ textAlign: 'center' ,color:'#858585', marginTop: 20 }} >By signingUp you are accepting our</Text>
                <Text style={{ textAlign: 'center' ,color:'#858585', marginTop: 0 }} >terms of service and Privacy policy.</Text>
                <TouchableOpacity 
                    style = {{ marginTop: 5 }}
                    onPress = {() => this.onSignUp()}
                    >
                <Text style={{textAlign:'center', color:'#571dee', fontSize:24, paddingTop:25 }} >SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{marginTop: 20 }}
                onPress = {() => this.props.navigation.navigate("Login")}
                >
                <Text style={{alignItems: 'center', textAlign:'center', color:'#5c5c5c', fontSize: 18 }} >Already have an account? Login</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showEmailExtAlert}
                showProgress={false}
                title='Exist'
                message='Email address already exist.'
                messageStyle={{ color:'#ff1100' }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok buddy"
                confirmButtonColor="#571dde"
                onConfirmPressed={()=>this.hideEmailExtAlert()}
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

export default Register
