import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {actionsstoreproducts} from '../../features/storeproducts';
import {Input, Button} from 'react-native-elements';
import styles from "./styles";

const StoreProduct = ({navigation, route}) => {
  const [selectedLeverantorValue, setSelectedLeverantorValue] = useState('');
  const [leverantorList, setLeverantorList] = useState([]);
  const [leverantorProductList, setLeverantorProductList] = useState([]);
  const [userid, setUserId] = useState(0);
  const [storeid, setStoreId] = useState(0);
  const [product, setProduct] = useState([]);
  const getSavedStoreProducts = useSelector(state => state.storeproducts);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [productcustomizedname, setproductcustomizedname] = useState("");

  useEffect(() => {
    getLeverantorList();
  }, []);

  useEffect(() => {
    if (route.params) {
      if (route.params.storeid) {
        setStoreId(route.params.storeid);
      }
    }
  }, [route.params]);

  const getLeverantorList = async () => {
    axios
      .get(`${constants.api}leverantors`)
      .then(response => {
        console.log('response.data', response.data);

        setLeverantorList(response.data);
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };

  const renderLeverantorList = () => {
    return leverantorList.map(leverantor => {
      return (
        <Picker.Item label={leverantor.leverantorname} value={leverantor.id} />
      );
    });
  };
  const renderLeverantorProductList = () => {
    return leverantorProductList.map(leverantorProduct => {
      return (
        <Picker.Item label={leverantorProduct.itemname} value={leverantorProduct.id} />
      );
    });
  };
  const fillLeverantorProductList = leverantorid => {
    axios
      .get(
        `${constants.api}Tblitems/GetAllItemsRelatedToSpecificLeverantor/` +
          leverantorid,
      )
      .then(response => {
        console.log('response.data', response.data);

        setLeverantorProductList(response.data);
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };

  return (
    <View>
      <Text>store id: {storeid}</Text>
      <View style={styless.container}>
        <Picker
          selectedValue={selectedLeverantorValue}
          style={{height: 40, width: 350}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLeverantorValue(itemValue);
            fillLeverantorProductList(itemValue);
          }}>
          {renderLeverantorList()}
        </Picker>
      </View>
      <View style={styless.container}>
        <Picker
          selectedValue={selectedProduct}
          style={{height: 40, width: 350}}
          onValueChange={(productValue, productIndex) => {
            setSelectedProduct(productValue);
            console.log('zzzzzzzzzzz',leverantorProductList[productIndex].label);
            setproductcustomizedname(leverantorProductList[productIndex].label);
          }}>
              {renderLeverantorProductList()}
          </Picker>
      </View>
      <TextInput style={styles.input} placeholder="Product customized name" onChangeText={(text)=>setproductcustomizedname(text)}>{productcustomizedname}</TextInput>
      <Button
        title="Add"
        buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
        containerStyle={{
          height: 40,
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{color: 'white', marginHorizontal: 20}}
        onPress={() => {}}
      />
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 1,
  },
});

export default StoreProduct;
