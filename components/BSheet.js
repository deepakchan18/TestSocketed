
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  
} from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class BSheet extends Component {
  render() {
    return (
      <View style={styles.container}>
      
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          customStyles={{
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              
            }
          }}
          height={450}
        >
          <SafeAreaView style={styles.listContainer}>
            <View style={styles.icon}> 
            <Icon name='minus' size={40} color='#dddddd' ></Icon>
            </View>
            
            <TouchableOpacity>
            <View style={styles.userInfoSection}>
              <View style={styles.userInfoSection1}>
                <Icon name='cog' size={30} color='#000000'></Icon>
                <View style={{marginLeft: 5}}>
                  <Text style={styles.title}>
                    settings
                  </Text>
                </View>
                </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{bottom:-300}}
            onPress={() => this.RBSheet.close()} >
              <View style={styles.userInfoSection}>
              <View style={styles.userInfoSection1}>
                <Icon name='logout' size={30} color='#000000'></Icon>
                <View style={{marginLeft: 5}}>
                  <Text style={styles.title}>
                    logout
                  </Text>
                </View>
                </View>
              </View>
            </TouchableOpacity>
          
          </SafeAreaView>
        </RBSheet>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 375,
  },
  button: {
    width: 150,
    backgroundColor: "#571dde",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  listContainer: {
    flex: 1,
    padding: 15,
    borderRadius:25,
    marginHorizontal:10,
  },

  userInfoSection: {
    paddingLeft:2,
    marginBottom: 10,
    marginLeft:-10,
    
  },
  userInfoSection1: {
    flexDirection: 'row', marginTop: 10,
  },
  title: {
    fontSize: 20,
    
    marginTop:5,
    lineHeight: 20,
  },
  icon:{
    marginTop:-20,
    alignItems:'center',
  },
});


