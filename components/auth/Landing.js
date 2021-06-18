import React from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';

const { width: WIDTH } = Dimensions.get('window')

export default function Landing({ navigation }) {
    return (
        
        <SafeAreaView style = {{ flex:1, justifyContent:'center', alignItems: 'center', backgroundColor:'#571dde', }} >
            
            <Image
                style={{width:WIDTH - 240, top:-65,}}
                source={require('../../assets/whitehat.png')}
                resizeMode='contain'
            />
            <Text style={{alignItems:'center', fontSize:65, fontWeight:'bold', color:'#fff', top:-100}} >Socketed</Text>
            <TouchableOpacity 
                onPress = {() => navigation.navigate("Register")}
                style={{backgroundColor:'#fff', 
                        padding:15,
                        width: WIDTH - 125, 
                        borderRadius:30,
                        height:60,
                        marginHorizontal:2,
                        top:-45}} >
                <Text style={{textAlign:'center',color:'#571dde', fontSize:24}} >Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress = {() => navigation.navigate("Login")}
                style={{ top: -45 }} >
                <Text style={{textAlign:'center', color:'#fff', fontSize:24, paddingTop:25 }} >Login</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
