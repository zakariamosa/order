import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {actionsstoreproducts} from '../../features/storeproducts';
import {Input, Button} from 'react-native-elements';


const OrderDetails = ({navigation, route}) => {
  const [storeList, setStoreList] = useState([]);
  const [userid, setUserId] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const getSavedStoreProducts = useSelector(state => state.storeproducts);
  const dispatch = useDispatch();
  const [storeid, setStoreId] = useState(0);
  const [orderid, setOrderId] = useState(0);
  const [orderdetails, setOrderDetails] = useState([]);

  useEffect(() => {
    getOrderDetails();
  }, []);
  useEffect(() => {
    if (route.params) {
      if (route.params.orderid) {
        setOrderId(route.params.orderid);
        
        getOrderDetails();
        
        
      }
    }
  }, [route.params]);

  const getOrderDetails = async () => {
    AsyncStorage.getItem('currentUserCredentials')
      .then(value => {
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
          setUserId(stringify.id);
          console.log('zzzzzz', `${constants.api}Tblorders/`+'GetOrderDetailsRelatedToLeverantor/'+stringify.id+'?orderid='+route.params.orderid);
          axios
            .get(
              `${constants.api}Tblorders/`+'GetOrderDetailsRelatedToLeverantor/'+stringify.id+'?orderid='+route.params.orderid
            )
            .then(response => {
              console.log('response.data', response.data);

              setOrderDetails(response.data);
            })
            .catch(error => {
              console.log('here', error.response.request._response);
              //console.log(error.message);
            });
        }
      })
      .then(res => {
        //do something else
      });
  };

  const fillTheStoreProducts = storeid => {
    axios
      .get(
        `${constants.api}Bestallareitems/GetBestallareStoreItemsWithType/` +
          storeid,
      )
      .then(response => {
        console.log('response.data', response.data);

        dispatch(actionsstoreproducts.getstoreproducts(response.data));

        setProduct(response.data);
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };

  return (
    <View>
      <ScrollView>
        <View>
          {orderdetails.map(product => {
            return (
              <View
                style={[
                  {
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    marginVertical: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    flexDirection: 'row',
                  },
                  styles.shadow,
                ]}>
                <Text>{product.itemname} ------</Text>
                <Text>{product.amount}------</Text>
                <Text>{product.typename}</Text>

                
               
               
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

export default OrderDetails;
