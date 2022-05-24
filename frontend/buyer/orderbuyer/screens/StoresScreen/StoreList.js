import React, {useEffect, useState, useContext} from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView  } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from "react-native-elements";
import constants from '../../configs/constants';
import axios from 'axios';
import {actionsstore} from '../../features/store'
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const StoreList = ({ navigation }) => {
  const [store, setStore]=useState([{}])
 
  const dispatch = useDispatch();
  const getSavedStore = useSelector(state => state.store);
  const { userInfo, setUserInfo } = useContext(UserContext)
  
  const deleteStoreFromAPI=(Storeid)=>{
    console.log('this is the store id we want to delete from api', Storeid);
    axios.delete(`${constants.api}Tblstores/`+Storeid)
            .then(response => {
              
              
            })
            .catch(error => {
              console.log('here',error.response.request._response)
              //console.log(error.message);
            });
  }
 
  useFocusEffect(
    React.useCallback(() => {
      console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM'); 
      AsyncStorage.getItem('currentUserCredentials').then((value) => {
        
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
         
          
          axios.get(`${constants.api}Tblstores/GetBestallareStores/`+stringify.id)
              .then(response => {
                
                console.log('response.data',response.data)
                console.log('getSavedStore',getSavedStore)
                  if(!getSavedStore.length){
                  console.log('first load'); 
                  dispatch(actionsstore.getstore(response.data))
                } 
                
                setStore(response.data);
                
              })
              .catch(error => {
                console.log('here',error.response.request._response)
                //console.log(error.message);
              });
        }
      }).then(res => {
        //do something else
        
      });
    }, [getSavedStore])
  );
  useEffect(() => {
    
   
            if (getSavedStore !== null) {
              console.log('getSavedStore: ', getSavedStore);
            }
  }, [getSavedStore]);
  return (
    <View>
      <Button
                title="Add a store"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={() => {
                  
                  navigation.navigate('Store')
                }}
                />
      
      
      <ScrollView>
        <View>
          {getSavedStore.map((store) => {
            return (
              <View style={[{
                width: "90%", height: 40, alignSelf: "center",
                marginVertical: 5, backgroundColor: "white", borderRadius: 10, padding: 10,
                flexDirection: "row"
              },
              styles.shadow]}>
                <Text>{store.storename}</Text>
               
                <Button 
                title="X"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 60,
                  right: 10,
                  position: 'absolute',
                  borderRadius: 10
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={()=>{
                  console.log('this store id: ', store.id)
                  deleteStoreFromAPI(store.id);
                  dispatch(actionsstore.deletestore({"id": store.id}));
                }}/>
              </View>
            );
          })}
        </View>
      </ScrollView>
      
    </View>
  );
 

};

const styles = StyleSheet.create({
    period: {
        flexDirection: 'row'
    },
    dash: {
      marginTop:15
    },
  });

export default StoreList;
