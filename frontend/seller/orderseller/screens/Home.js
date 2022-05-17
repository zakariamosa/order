

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


import { useDispatch } from "react-redux";


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

  useEffect(() => {
    //data arrays
    let consumedE = []
    let producedE = []
    let evE = []
    let toGridE = []
    //progress bar lets
    let cons = 0
    let prod = 0
    axios({
      method: "get",
      url: `${constants.api}MainHubs/Statistics`
    }).then((resp) => {
      let data = resp.data
      data.consumed.forEach((i) => {
        consumedE.push(i)
      })
      data.produced.forEach((i) => {
        producedE.push(i)
      })
      data.ev.forEach((i) => {
        evE.push(i)
      })
      data.toGrid.forEach((i) => {
        toGridE.push(i)
      })
      waitChart(consumedE, evE, producedE, toGridE)
    }).then(() => {
      for (let a = 0; a < consumedE.length; a++) {
        cons += consumedE[a].kw
        if (a == consumedE.length - 1) {
          console.log("Total consumed: ", cons)
        }
      }
      for (let b = 0; b < producedE.length; b++) {
        prod += producedE[b].kw
        if (b == producedE.length - 1) {
          console.log("Total produced:", prod);
        }
      }
      let parseValue = prod / cons
      console.log("Produced of consumed:", parseValue);
      /* setConsumedProgress(parseValue.toFixed(2) * 100) */
      setConsumedProgress(parseValue)
    })
  }, [])

  function waitChart(c, e, p, g) {
    setElecArray({
      consumed: c,
      ev: e,
      produced: p,
      toGrid: g
    })
  }
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

  const data = {
    labels: ["00:00", "02:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    datasets: [
      { // Consumed red
        data: elecData ?
          [elecArray.consumed[0].kw, elecArray.consumed[2].kw, elecArray.consumed[4].kw, elecArray.consumed[6].kw, elecArray.consumed[8].kw, elecArray.consumed[10].kw,
          elecArray.consumed[12].kw, elecArray.consumed[14].kw, elecArray.consumed[16].kw, elecArray.consumed[18].kw, elecArray.consumed[20].kw, elecArray.consumed[22].kw]
          :
          [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
      },
      { // Produced green
        data: elecData ?
          [elecArray.produced[0].kw, elecArray.produced[2].kw, elecArray.produced[4].kw, elecArray.produced[6].kw, elecArray.produced[8].kw, elecArray.produced[10].kw,
          elecArray.produced[12].kw, elecArray.produced[14].kw, elecArray.produced[16].kw, elecArray.produced[18].kw, elecArray.produced[20].kw, elecArray.produced[22].kw,]
          :
          [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(0, 255, 8, ${opacity})`
      },

      { // EV blue
        data: elecData ?
          [elecArray.ev[0].kw, elecArray.ev[2].kw, elecArray.ev[4].kw, elecArray.ev[6].kw, elecArray.ev[8].kw, elecArray.ev[10].kw, elecArray.ev[12].kw,
          elecArray.ev[14].kw, elecArray.ev[16].kw, elecArray.ev[18].kw, elecArray.ev[20].kw, elecArray.ev[22].kw]
          :
          [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(0, 170, 255, ${opacity})`
      },
      { // To grid orange
        data: elecData ?
          [elecArray.toGrid[0].kw, elecArray.toGrid[2].kw, elecArray.toGrid[4].kw, elecArray.toGrid[6].kw, elecArray.toGrid[8].kw, elecArray.toGrid[10].kw,
          elecArray.toGrid[12].kw, elecArray.toGrid[14].kw, elecArray.toGrid[16].kw, elecArray.toGrid[18].kw, elecArray.toGrid[20].kw, elecArray.toGrid[22].kw]
          :
          [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(255, 153, 0, ${opacity})`
      }
    ],
    legend: ["Consumed", "Produced", "EV", "To grid"]
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ /* borderWidth: 1, */ height: 200, width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Text style={{
          fontSize: 20,
          marginBottom: 20,
          color: "black",
          textAlign: "center"
        }}>Self-produced Electricity of {"\n"}Consumption</Text>
        <Text style={{
          fontSize: 25,
          color: theme.blueColor
        }}>{parseInt(consumedProgress * 100)}%</Text>
        
      </View>

      <View style={{ borderWidth: 1, margin: 10, borderRadius: 10, borderColor: "lightgray", height: 280 }}>
        
      </View>
    </ScrollView>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>

    </View>
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
