import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import HomeScreen from './main/Home'
import ChatScreen from './main/Chat'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack'

import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu, } from 'react-navigation-header-buttons';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

const BarShow = createStackNavigator();

const HomeBarShowScreen = ({ navigation }) =>(
    <BarShow.Navigator screenOptions={{
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{fontWeight:'bold', }
    }}>
        <BarShow.Screen name="Home" 
                        component={HomeScreen} 
                        options={{  title:'Socketed', 
                                    headerTitleAlign:'center',
                                    headerTitleStyle:{color:'#571dde', fontSize:32},
                                    headerRight: () =>(<TouchableOpacity style={{paddingRight:15,}} 
                                    onPress = {() => navigation.navigate('Notify')}
                                    >
                                                            <Icon name="notifications" size={28} color='#571dde'></Icon>
                                                        </TouchableOpacity>)
                                    }}
                                    />
        </BarShow.Navigator>
);

const ProfileBarShowScreen = ({ navigation }) =>(
    <BarShow.Navigator screenOptions={{
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{fontWeight:'bold', }
    }}>
        <BarShow.Screen name="Profile" 
                        component={ProfileScreen} 
                        options={{  title:'Profile', 
                                    headerTitleAlign:'left',
                                    headerTitleStyle:{color:'#571dde', fontSize:28},
                                    headerRight: ()=>(<TouchableOpacity style={{paddingRight:15,}}
                                      
                                      >
                                      <Icon name="menu" size={28} color='#571dde'></Icon>
                                    </TouchableOpacity>
                                    )}}
                                    />
    </BarShow.Navigator>
);

export class Main extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return (
            <Tab.Navigator initialRouteName="home" labeled={false} barStyle={{backgroundColor:'#fff' }} >
                <Tab.Screen name="home" component={HomeBarShowScreen} options={{ tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="home" color='#571dde' size={26} />) }} />
                <Tab.Screen name="Feed" component={FeedScreen} options={{ tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="magnify" color='#571dde' size={26} />) }} />
                <Tab.Screen name="AddC" component={EmptyScreen}
                    listeners={({navigation}) => ({
                        tabPress: event =>{
                        event.preventDefault();
                        navigation.navigate("Add")
                    }})}
                    options={{ tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="plus-circle" color='#571dde' size={26} />) }} />
                <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="chat" color='#571dde' size={26} />) }} />
                <Tab.Screen name="Profile" component={ProfileBarShowScreen} options={{ tabBarIcon: ({color, size}) =>(<MaterialCommunityIcons name="account-circle" color='#571dde' size={26} />) }} />
            </Tab.Navigator>
        )
    }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

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
