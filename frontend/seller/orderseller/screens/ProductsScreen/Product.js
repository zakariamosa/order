import React, {useEffect, useState, useContext} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-elements';

import {actionsproduct} from '../../features/product'
import { useDispatch } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TarifferTimePeriod = ({navigation}) => {
  
  
  const [productName, setProductName] = useState("Product Name");
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
      
      <View style={styles.beside}>
      <Text>Product Name</Text>
        
        <TextInput onChangeText={(text)=>setProductName(text)}>{productName}</TextInput>
        
      </View>
      <Button
          title='Add'
          onPress={() => {
              //add this to the db
              axios.post(`${constants.api}Tblitems`+'/AddProduct?productName='+productName+'&userid='+userid)
            .then(response => {
              dispatch(actionsproduct.addproduct({"id": 0,itemname:productName }));
              
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

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  beside: {
    flexDirection: 'row',
    padding: 5,
  },
});

export default TarifferTimePeriod;
