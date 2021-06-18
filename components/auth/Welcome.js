import React, { Component } from 'react'
import { View, Text, SafeAreaView,TextInput, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

export default class Welcome extends Component {
    render(){
        return(
            <ScrollView>
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <Text style={{ alignItems:'center', fontSize: 28, marginTop: 250, color:'#252525' }} >socketed Welcomes,</Text>
                <Text style={{ alignItems:'center', fontSize: 28, marginTop: 0, color:'#571dde' }} >Username</Text>
                <Text style={{color:'#858585', marginTop: 10}} >Here, Find engineers to follow and share</Text>
                <Text style={{color:'#858585'}} >your posts. have a great day!</Text>
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('Login')}
                    style={{backgroundColor:'#571dde',width: WIDTH - 265, borderRadius: 35, height:45, marginTop: 35, alignItems:'center'}} >
                    <Text style={{fontSize: 24, color: '#fff',paddingTop: 5}} >Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
        )
    }
}