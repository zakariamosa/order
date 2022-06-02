import React, {useEffect, useState, useContext} from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView  } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from "react-native-elements";
import constants from '../../configs/constants';
import axios from 'axios';
import {actionsproduct} from '../../features/product'
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ProductList = ({ navigation }) => {
  const [products, setProducts]=useState([{}])
  const dispatch = useDispatch();
  const getSavedProduct = useSelector(state => state.product);
  const { userInfo, setUserInfo } = useContext(UserContext)
  
  const deleteProductFromAPI=(productid)=>{
    console.log('this is the product id we want to delete from api', productid);
    axios.delete(`${constants.api}Tblitems/`+productid)
            .then(response => {
              
              
            })
            .catch(error => {
              console.log('here',error.response.request._response)
              //console.log(error.message);
            });
  }
 /*  useEffect(() => {
    console.log('userInfo id: ', userInfo.id);
    AsyncStorage.getItem('currentUserCredentials').then((value) => {
      console.log(value);
      var stringify = JSON.parse(value);
      console.log('stringify', stringify);
      if (stringify !== null && stringify !== '') {
        console.log('stringified id', stringify.id);
        console.log('endpoint', `${constants.api}Tblitems/GetLeverantorsItemList/`+stringify.id);
        
        axios.get(`${constants.api}Tblitems/GetLeverantorsItemList/`+stringify.id)
            .then(response => {
              
              console.log('this is the productlist: ', response.data);
              dispatch(actionsproduct.getproduct(response.data))
              setProducts(response.data);
            })
            .catch(error => {
              console.log('here',error.response.request._response)
              //console.log(error.message);
            });
      }
    }).then(res => {
      //do something else
      
    });
    
  }, []); */
  useFocusEffect(
    React.useCallback(() => {
      console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM'); 
      AsyncStorage.getItem('currentUserCredentials').then((value) => {
        
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
         
          
          axios.get(`${constants.api}Tblitems/GetLeverantorsItemList/`+stringify.id)
              .then(response => {
                
                
                
                setProducts(response.data);
              })
              .catch(error => {
                console.log('here',error.response.request._response)
                //console.log(error.message);
              });
        }
      }).then(res => {
        //do something else
        
      });
    }, [getSavedProduct])
  );
  useEffect(() => {
    
   
            if (getSavedProduct !== null) {
              console.log('getSavedProduct: ', getSavedProduct);
            }
  }, [getSavedProduct]);
  return (
    <View>
      <Button
                title="Add a product"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={() => {
                  navigation.navigate('Product')
                }}
                />
      
      <View style={{height: 580}}>
      <ScrollView>
        <View>
          {products.map((product) => {
            return (
              <View style={[{
                width: "90%", height: 40, alignSelf: "center",
                marginVertical: 5, backgroundColor: "white", borderRadius: 10, padding: 10,
                flexDirection: "row"
              },
              styles.shadow]}>
                <Text>{product.itemname}</Text>
                {/* <Text style={styles.dash}>-----</Text>
                <Text>{tariff.endTime}</Text>
                <Text style={styles.dash}>-----</Text>
                <Text>{tariff.tariffValue} kw/h</Text>
                <Text style={styles.dash}>-----</Text> */}
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
                  console.log('this product id: ', product.id)
                  deleteProductFromAPI(product.id);
                  dispatch(actionsproduct.deleteproduct({"id": product.id}));
                }}/>
              </View>
            );
          })}
        </View>
      </ScrollView>
      </View>
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

export default ProductList;
