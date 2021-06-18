import React, { Component } from 'react'
import { View, Text, SafeAreaView,TextInput, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

export default class SignupSetupPic extends Component {
    render(){
        return(
            <ScrollView>
            <SafeAreaView style={{flex:1, alignItems: 'center', justifyContent:'center',}} >
                <Text style={{ alignItems:'center', fontSize: 28, marginTop: 175, color:'#571dde' }} >Add your profile picture</Text>
                <Text style={{ alignItems:'center', marginTop: 10,color: '#858585' }} >This will be displyed in your public profile</Text>
                <TouchableOpacity 
                    style={{ backgroundColor: '#858585',width: WIDTH - 265, height: 125,borderRadius: 100, marginTop: 45 }} 
                    >
                    <Image 
                        
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{backgroundColor:'#571dde',width: WIDTH - 275, borderRadius: 35,height:45, marginTop: 35, alignItems:'center'}} >
                    <Text style={{fontSize: 24, color: '#fff',paddingTop: 5}} >Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {() => this.props.navigation.navigate('Welcome')} 
                    style={{ marginTop: 35 }}
                    >
                    <Text style={{ fontSize:20, color:'#571dde' }} >Skip</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
        )
    }
}