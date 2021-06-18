import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import firebase from 'firebase'

export default function Profile() {
    return (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center', }} >
            <TouchableOpacity
                onPress = {() => firebase.auth().signOut()}
                style={{ top: -45 }} >
                <Text style={{textAlign:'center', color:'#000', fontSize:24, paddingTop:25 }} >Signout</Text>
            </TouchableOpacity>
        </View>
    )
}
