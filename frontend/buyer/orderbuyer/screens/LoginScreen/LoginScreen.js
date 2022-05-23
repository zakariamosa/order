import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { actionsuser } from "../../features/user"
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import axios from 'axios';
import { UserContext } from "../../configs/ProjectContext";
import theme from "../../assets/theme";
import constants from "../../configs/constants"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('sellercoop')
  const [password, setPassword] = useState('123456')
  const { userInfo, setUserInfo } = useContext(UserContext)

  const dispatch = useDispatch();

    const login = async () => {
    
    
    axios
    
      .get(`${constants.api}Tbluserleverantors/`+'LoginLeverantor?email='+email+'&password='+password)
      
      
      .then(response => {
        console.log('response', response);
        id = response.data.id;
        dispatch(actionsuser.addUser({ email, password, id }))
      })
      .then(() => {
        AsyncStorage.getItem('currentUserCredentials').then((value) => {
          console.log(value);
          var stringify = JSON.parse(value);
          console.log('stringify', stringify);
          if (stringify !== null && stringify !== '') {
            console.log("Time to navigate to home page")
            goToHomeScreen();
          }
        })
      })
      
      .catch(error => {
        console.log('error',error.response)
        //console.log('error',error.message);
      });
  }  
  
 /*  const login = () => {
    
    const options = {
      method: 'GET',
      url: 'https://192.168.0.206:45456/api/Tbluserleverantors/LoginLeverantor',
      params: {email: 'sellercoop', password: '123456'},
      headers: {'Content-Type': 'application/json'}
      
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  } */

  useEffect(() => {
    retrieveDataFromLocalStorage()
    AsyncStorage.getItem('currentUserCredentials').then((value) => {
      console.log(value);
      var stringify = JSON.parse(value);
      console.log('stringify', stringify);
      if (stringify !== null && stringify !== '') {
        console.log('stringified email', stringify.email);
        console.log("Time to navigate to home page")
        goToHomeScreen();
      }
    }).then(res => {
      //do something else
    });
  }, [])

  const retrieveDataFromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('currentUserCredentials');
      if (value !== null) {
        // We have data!!
        console.log(value);
        console.log("Time to navigate to home page")

      }
      else {
        console.log("The Storage is Empty")
      }
    } catch (error) {
      // Error retrieving data
      console.log("The Storage gives an error", error)
    }
  };

  const goToHomeScreen = () => {
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>

      <View style={{
        height: 220,
        width: "100%",
        borderWidth: 1,
        justifyContent: "center",
        //backgroundColor: "#0c7307"
      }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ height: 200, width: "65%", alignSelf: "center" }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={[styles.inputContainers, styles.shadow]}>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Image
              source={require("../../assets/images/userIconBlack.png")}
              style={{ height: 30, width: 30, alignSelf: "center" }}
            />
          </View>
          <View style={styles.textSeparator} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            style={{ flex: 1, fontSize: 16, paddingLeft: 10, }}
          />
        </View>
        <View style={[styles.inputContainers, styles.shadow]}>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Image
              source={require("../../assets/images/passwordImage.png")}
              style={{ height: 25, width: 25, alignSelf: "center" }}
            />
          </View>
          <View style={styles.textSeparator} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            secureTextEntry={true}
            style={{ flex: 1, fontSize: 16, paddingLeft: 10, }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => login()}
        style={styles.shadow}
      >
        <View style={[{
          padding: 10,
          borderRadius: 10,
          backgroundColor: theme.blueColor,
          width: 150,
          alignItems: "center"
        }]}>
          <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: theme.blueColor }}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
        //navigate to forgot password screen
      }}>
        <Text style={{ color: theme.blueColor }}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

