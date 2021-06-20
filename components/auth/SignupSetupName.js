import React, { Component } from 'react'
import { View, Text, SafeAreaView,TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'

import firebase from 'firebase/app'

const { width: WIDTH } = Dimensions.get('window')

export default class SignupSetupName extends Component {

    constructor(props){
        super(props);

        this.state = {
            nameVal: "",
            usernameVal: "",

            isValidName: true,
            isValidUsername: true,
        }

        this.pressNext = this.pressNext.bind(this)

    }

    pressNext(){
        //firebase.firestore().collection("users")
        //.doc(firebase.auth().currentUser.uid)
        this.props.navigation.navigate("SignupPic")

        const nameformat = /^[a-zA-Z]+$/ ;
        if(nameformat.test(this.state.nameVal) === true){
            if(this.state.isValidUsername >= 4){
                // hello
            }else{ this.setState({ isValidUsername: false }) }
        }else{ this.setState({ isValidName: false }) }

    }

    handleName(){
        const nameformat = /^[a-zA-Z]+$/ ;
        if(nameformat.test(this.state.nameVal) === true){
            this.setState({ isValidName: true })
        }else{
            this.setState({ isValidName: false })
        }
    }

    handleUsername(){
        if(this.state.isValidUsername >= 4){
            this.setState({ isValidUsername: true })
        }else{
            this.setState({ isValidUsername: false })
        }
    }

    render(){
        return (
            <ScrollView>
            <SafeAreaView style={{flex: 1, justifyContent:'center', alignItems:'center'}} >
                <Text style={{ alignItems:'center', fontSize: 28, marginTop: 215, color:'#571dde' }} >Add Name & Username</Text>
                <Text style={{ alignItems:'center', marginTop: 10,color: '#858585' }} >This will be displyed in your public profile</Text>
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:45, marginTop: 35, fontSize: 18, }}
                    placeholder = 'Name'
                    placeholderTextColor = '#858585'
                    onChangeText = {(nameVal) => this.setState({nameVal})}
                    onEndEditing = {(e) => this.handleName(e.nativeEvent.text)}
                />

                { this.state.isValidName ? null : <Text style={{marginTop: 0, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Name is empty or badly formatted.</Text> }

                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:45, marginTop: 15, fontSize: 18, }}
                    placeholder = 'Username'
                    placeholderTextColor = '#858585'
                    onChangeText = {(usernameVal) => this.setState({usernameVal})}
                    onEndEditing = {(e) => this.handleUsername(e.nativeEvent.text)}
                />

                { this.state.isValidUsername ? null : <Text style={{marginTop: 0, fontSize: 14, color: '#ff1100', alignItems:'center', justifyContent:'center'}} >Username is empty or already exists.</Text> }

                <TouchableOpacity 
                    onPress={() => this.pressNext() }
                    style={{backgroundColor:'#571dde',width: WIDTH - 275, borderRadius: 35,height:45, marginTop: 25, alignItems:'center'}} 
                    >
                    <Text style={{fontSize: 24, color: '#fff',paddingTop: 5}} >Next</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
        )
    }
}
