import React, {useEffect, useState, useContext} from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView  } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button } from "react-native-elements";
import constants from '../../configs/constants';
import axios from 'axios';
import {actionproduct} from '../../features/product'
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';


const ProductList = ({ navigation }) => {
  const [product, setProduct]=useState([{}])
  const dispatch = useDispatch();
  const getSavedProduct = useSelector(state => state.product);
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
    
    axios.get(`${constants.api}Tblitems/GetLeverantorsItemList/`+userInfo.id)
            .then(response => {
              
              console.log('this is the productlist: ', response);
              dispatch(actionproduct.getproduct(response.data.tariffs))
              setProduct(response.data.tariffs);
            })
            .catch(error => {
              console.log(error.response.request._response)
              //console.log(error.message);


            });
  }, []);
  useEffect(() => {
    
    /* axios.get(`${constants.api}MainHubs/1`)
            .then(response => {
              
              console.log('this is the tarifffffff: ', response.data.tariffs);
              dispatch(actionproduct.gettariff(response.data.tariffs))
              setProduct(response.data.tariffs);
            })
            .catch(error => {
              console.log(error.response.request._response)
              //console.log(error.message);


            }); */
            if (getSavedProduct !== null) {
              console.log('getSavedProduct: ', getSavedProduct);
            }
  }, [getSavedProduct]);
  return (
    <View>
      <Button
                title="Add time period"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={() => {
                  navigation.navigate('ProductTimePeriod')
                }}
                />
      <Text>This is the ProductList Screen</Text>
      
      <ScrollView>
        <View>
          {getSavedProduct.map((tariff) => {
            return (
              <View style={[{
                width: "90%", height: 70, alignSelf: "center",
                marginVertical: 5, backgroundColor: "white", borderRadius: 10, padding: 10,
                flexDirection: "row"
              },
              styles.shadow]}>
                <Text>{tariff.startTime}</Text>
                <Text style={styles.dash}>-----</Text>
                <Text>{tariff.endTime}</Text>
                <Text style={styles.dash}>-----</Text>
                <Text>{tariff.tariffValue} kw/h</Text>
                <Text style={styles.dash}>-----</Text>
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
                  console.log('this tariff id: ', tariff.id)
                  dispatch(actionproduct.deletetariff({"id": tariff.id}));
                }}/>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {/* <View style={styles.period}>
          <TextInput>00:00:00</TextInput>
          <Text style={styles.dash}>-----</Text>
          <TextInput>06:59:59</TextInput>
          <TextInput>15 kw/h</TextInput>
      </View>
      <View style={styles.period}>
          <TextInput>07:00:00</TextInput>
          <Text style={styles.dash}>-----</Text>
          <TextInput>18:59:59</TextInput>
          <TextInput>125 kw/h</TextInput>
      </View>
      <View style={styles.period}>
          <TextInput>19:00:00</TextInput>
          <Text style={styles.dash}>-----</Text>
          <TextInput>23:59:59</TextInput>
          <TextInput>93 kw/h</TextInput>
      </View> */}
      <Button
                title="Add Product"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{
                  height: 40,
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={() => {
                  //get the redux array save it in a new array called mychangesarray
                  //delete the old tariff saved in the api
                  //add my changesarray to api
                  console.log("Context: ", userInfo)
                  console.log('response1: ', getSavedProduct);
                  axios.post(`${constants.api}MainHubs/UpdateTariffs?id=`+userInfo.mainhubId, getSavedProduct)
                  .then(response => {
                    console.log('response2: ', response);
                    
                    //console.log('this is the tarifffffff: ', response.data.tariffs);
                    dispatch(actionproduct.gettariff(response.data.tariffs))
                    setProduct(response.data.tariffs);
                  })
                  .catch(error => {
                    console.log(error.response.request._response)
                    //console.log(error.message);
      
      
                  });





                  navigation.goBack();
                }}
                />
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
