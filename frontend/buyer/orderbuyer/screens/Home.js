

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Profile from './Profile'
import StoreList from './StoresScreen/StoreList'
import StoreProducts from './StoresScreen/StoreProducts'

import { useDispatch } from "react-redux";

import Order from './OrderScreen/Order'


import axios from 'axios';
import { Dimensions } from "react-native";


import theme from '../assets/theme';
import constants from '../configs/constants';
import { UserContext } from '../configs/ProjectContext';

function Home({ navigation }) {

  const [elecArray, setElecArray] = useState(null)
  const [elecData, setElecData] = useState(false)
  const [consumedProgress, setConsumedProgress] = useState(0.00)

  useEffect(() => {
    console.log("Async userInfo:", AsyncStorage.getItem('currentUserCredentials'))
  }, [])

  

 
  if (elecArray != null) {
    if (elecData === false) {
      setElecData(true)
    }
  }

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#f5f6f7",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(102, 151, 204, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "2"
    }
  };

  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      

      <Order/>
    </ScrollView>
  );
}



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
    //drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={Home} options={{
        drawerIcon: ({ focused, size }) => (
          <Image
            source={require('../assets/images/icon/home.png')}
            style={{ height: 35, width: "15%", alignSelf: "center" }}
          />)
      }} />
      <Drawer.Screen name="Profile" component={Profile} options={{
        drawerIcon: ({ focused, size }) => (
          <Image
            source={require('../assets/images/icon/profile.jpg')}
            style={{ height: 35, width: "15%", alignSelf: "center" }}
          />)
      }} />
      <Drawer.Screen name="Stores" component={StoreList} options={{
        drawerIcon: ({ focused, size }) => (
          <Image
            source={require('../assets/images/store.png')}
            style={{ height: 35, width: "15%", alignSelf: "center" }}
          />)
      }} />
      <Drawer.Screen name="Store Products" component={StoreProducts} options={{
        drawerIcon: ({ focused, size }) => (
          <Image
            source={require('../assets/images/food.jpg')}
            style={{ height: 35, width: "15%", alignSelf: "center" }}
          />)
      }} />
      
      

    </Drawer.Navigator>
  );
}


const HomeScreen = ({ navigation }) => {

  const { userInfo, setUserInfo } = useContext(UserContext)

  const reduxdispatch = useDispatch();
  useEffect(() => {

    AsyncStorage.getItem('currentUserCredentials').then((value) => {

      var stringify = JSON.parse(value);

      if (stringify !== null && stringify !== '') {

        const currentuserid = stringify.id + '';

        console.log('userid', currentuserid);
       /*  axios
          .get('http://10.0.2.2:8004/api/MainHubs/GetUser/' + currentuserid)
          .then(response => {
            console.log('This is the mainhub related to this user:', response.data);
            setUserInfo({
              id: response.data.id,
              userName: response.data.userName,
              email: response.data.email,
              mainhubId: response.data.mainHub.id
            })
            reduxdispatch(actionssettings.getMainHubb({ alldata: response.data }))
            axios.get('http://10.0.2.2:8004/api/MainHubs/' + response.data.mainHub.id)
              .then(mainHubresponse => {
                console.log('This is the mainHubresponse response:', mainHubresponse.data);
                reduxdispatch(actionsSolarpanels.getSolarPanels({ alldata: mainHubresponse.data.solarPanels }))
                reduxdispatch(actionsev.getev({ alldata: mainHubresponse.data.electricVehicles }))
              })
          })
          .catch(error => {
            //console.log(error.response.request._response)
            console.log(error.message);
          }); */
      }
    })
  }, [])

  return (

    <MyDrawer />

  );
}
export default HomeScreen;
