import React, {useEffect, useState, useContext} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-elements';

import {actionsstore} from '../../features/store'
import { useDispatch } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from "./styles";

const Store = ({navigation}) => {
  
  
  const [storeName, setStoreName] = useState("");
  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [userid,setUserId]=useState(0);

  useEffect(() => {
    
    AsyncStorage.getItem('currentUserCredentials').then((value) => {
      console.log(value);
      var stringify = JSON.parse(value);
     
      if (stringify !== null && stringify !== '') {
        setUserId(stringify.id);
        
      }
    }).then(res => {
      //do something else
      
    });
    
  }, []);

  
  return (
    <View>
      
      <View style={styless.beside}>
      <Text>Store Name</Text>
        
        <TextInput style={styles.input} placeholder="Store Name" onChangeText={(text)=>setStoreName(text)}>{storeName}</TextInput>
        
      </View>
      <Button
          title='Add'
          onPress={() => {
              //add this to the db
              axios.post(`${constants.api}Tblstores?`+'userid='+userid,{"storename":storeName,"bestallareid":0})
            .then(response => {
              dispatch(actionsstore.addstore({"id": 0,storename:storeName }));
              
            })
            .catch(error => {
              console.log('here',error.response.request._response)
              //console.log(error.message);
            });
              
            navigation.goBack();
          }}
        />
    </View>
  );
};

const styless = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  beside: {
    flexDirection: 'row',
    padding: 5,
  },
});

export default Store;
