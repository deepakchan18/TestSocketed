import React, { Component } from 'react'
import { View, Text, SafeAreaView,TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

export default class SignupSetupName extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: "",
            username: "",
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
                    onChangeText = {(name) => this.setState({name})}
                />
                <TextInput
                    style={{ backgroundColor: '#e5e5e5', width: WIDTH - 100, height: 60,borderRadius:35,paddingLeft:45, marginTop: 15, fontSize: 18, }}
                    placeholder = 'Username'
                    placeholderTextColor = '#858585'
                    onChangeText = {(username) => this.setState({username})}
                />
                <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate("SignupPic") }
                    style={{backgroundColor:'#571dde',width: WIDTH - 275, borderRadius: 35,height:45, marginTop: 25, alignItems:'center'}} 
                    >
                    <Text style={{fontSize: 24, color: '#fff',paddingTop: 5}} >Next</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
        )
    }
}
