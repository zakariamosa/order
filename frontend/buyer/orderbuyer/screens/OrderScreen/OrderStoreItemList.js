import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {actionsstoreproducts} from '../../features/storeproducts'
import { Input, Button } from "react-native-elements";


const OrderStoreItemList = ({ navigation , route }) => {
  
  const [storeList , setStoreList] = useState([]);
  const [userid , setUserId] = useState(0);
  const [product , setProduct] = useState([]);
  const getSavedStoreProducts = useSelector(state => state.storeproducts);
  const dispatch = useDispatch();
  const [storeid, setStoreId] = useState(0);

  useEffect(() => {
    getStoreList();
  }, []);
  useEffect(() => {
    if (route.params) {
      if (route.params.storeid) {
        setStoreId(route.params.storeid);
        fillTheStoreProducts(route.params.storeid);
      }
    }
  }, [route.params]);

  const getStoreList = async () => {
    AsyncStorage.getItem('currentUserCredentials').then((value) => {
        
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
         
          setUserId(stringify.id);
          axios.get(`${constants.api}Tblstores/GetBestallareStores/`+stringify.id)
              .then(response => {
                
                console.log('response.data',response.data)
                
                  
                
                setStoreList(response.data);
                
              })
              .catch(error => {
                console.log('here',error.response.request._response)
                //console.log(error.message);
              });
        }
      }).then(res => {
        //do something else
        
      });

  };



  
  const fillTheStoreProducts = (storeid) => {
    axios.get(`${constants.api}Bestallareitems/GetBestallareStoreItems/`+storeid)
              .then(response => {
                
                console.log('response.data',response.data)
                
                dispatch(actionsstoreproducts.getstoreproducts(response.data))
                
                setProduct(response.data);
                
              })
              .catch(error => {
                console.log('here',error.response.request._response)
                //console.log(error.message);
              });
        }
  

  return (
    <View>
    
    
    <ScrollView>
        <View>
          {getSavedStoreProducts.map((product) => {
            return (
              <View style={[{
                width: "90%", height: 40, alignSelf: "center",
                marginVertical: 5, backgroundColor: "white", borderRadius: 10, padding: 10,
                flexDirection: "row"
              },
              styles.shadow]}>
                <Text>{product.itemeditedname}</Text>
               
                <Button 
                title="-"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 60,
                  right: 150,
                  position: 'absolute',
                  borderRadius: 10
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={()=>{
                  console.log('this product id: ', product.id)
                  
                  //dispatch(actionsstoreproducts.deletestoreproduct({"id": product.id}));
                }}/>
                <Text style={{position: 'absolute', right: 110, color:'blue'}}>{product.amount}</Text>
                <Button 
                title="+"
                buttonStyle={{ backgroundColor: 'rgba(0,128,0,0.9)' }}
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
                  product.amount=product.amount+product.increasingrate;
                  //dispatch(actionsstoreproducts.deletestoreproduct({"id": product.id}));
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
  container: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 1,
  },
});



export default OrderStoreItemList;