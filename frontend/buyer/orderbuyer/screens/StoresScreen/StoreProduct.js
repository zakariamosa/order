import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {actionsstoreproducts} from '../../features/storeproducts';
import {Input, Button} from 'react-native-elements';
import styles from './styles';

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
  const [productcustomizedname, setproductcustomizedname] = useState('');
  const [selectedproducttype, setselectedproducttype] = useState(0);
  const [producttypes, setproducttypes] = useState([]);
  const [increasingrate, setincreasingrate] = useState(1);
  const [defaultvalueproduct, setdefaultvalueproduct] = useState(1);

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
        <Picker.Item
          label={leverantorProduct.itemname}
          value={leverantorProduct.id}
        />
      );
    });
  };
  const renderProducttypes = () => {
    return producttypes.map(ptype => {
      return <Picker.Item label={ptype.typename} value={ptype.id} />;
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
  const fillProductTypesList = () => {
    axios
      .get(`${constants.api}Tblitemtypes`)
      .then(response => {
        console.log('response.data', response.data);

        setproducttypes(response.data);
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };
  const addThisProductToDB = () => {
    axios
      .post(`${constants.api}Bestallareitems`,{
        
        "storeid": storeid,
        "itemid": selectedProduct,
        "amount": defaultvalueproduct,
        "itemtypeid": selectedproducttype,
        "itemeditedname": productcustomizedname,
        "increasingrate": increasingrate 
      })
      .then(response => {
        console.log('response.data', response.data);
        navigation.goBack();
        
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };

  return (
    <View>
      
      <Text>Leverantor</Text>
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
      <Text>Product name from Leverantor</Text>
      <View style={styless.container}>
        <Picker
          selectedValue={selectedProduct}
          style={{height: 40, width: 350}}
          onValueChange={(productValue, productIndex) => {
            setSelectedProduct(productValue);

            setproductcustomizedname(
              leverantorProductList[productIndex].itemname,
            );
            fillProductTypesList();
          }}>
          {renderLeverantorProductList()}
        </Picker>
      </View>
      <Text>Product customized name from bestallare</Text>
      <TextInput
        style={styles.input}
        placeholder="Product customized name"
        onChangeText={text => setproductcustomizedname(text)}>
        {productcustomizedname}
      </TextInput>
      <Text>Measure</Text>
      <View style={styless.container}>
        <Picker
          selectedValue={selectedproducttype}
          style={{height: 40, width: 350}}
          onValueChange={(itemValue, itemIndex) => {
            setselectedproducttype(itemValue);
          }}>
          {renderProducttypes()}
        </Picker>
      </View>
      <Text>Default Value</Text>
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
        <Button
          title="-"
          buttonStyle={{backgroundColor: 'rgb(18, 193, 224)'}}
          containerStyle={{
            height: 40,
            width: 60,
            left: 10,
            position: 'absolute',
            borderRadius: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => {
            setdefaultvalueproduct(defaultvalueproduct - 1);
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{defaultvalueproduct}</Text>
        </View>
        <Button
          title="+"
          buttonStyle={{backgroundColor: 'rgb(70, 28, 148)'}}
          containerStyle={{
            height: 40,
            width: 60,
            right: 10,
            position: 'absolute',
            borderRadius: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => {
            setdefaultvalueproduct(defaultvalueproduct + 1);
          }}
        />
      </View>
      <Text>Increasing rate</Text>
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
        <Button
          title="-"
          buttonStyle={{backgroundColor: 'rgb(18, 193, 224)'}}
          containerStyle={{
            height: 40,
            width: 60,
            left: 10,
            position: 'absolute',
            borderRadius: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => {
            setincreasingrate(increasingrate - 1);
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{increasingrate}</Text>
        </View>
        <Button
          title="+"
          buttonStyle={{backgroundColor: 'rgb(70, 28, 148)'}}
          containerStyle={{
            height: 40,
            width: 60,
            right: 10,
            position: 'absolute',
            borderRadius: 10,
          }}
          titleStyle={{color: 'white', marginHorizontal: 20}}
          onPress={() => {
            setincreasingrate(increasingrate + 1);
          }}
        />
      </View>
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
        onPress={() => {
          console.log('storeid',storeid);
          console.log('itemid',selectedProduct);
          console.log('amount', defaultvalueproduct);
          console.log('itemtypeid',selectedproducttype);
          console.log('itemeditedname', productcustomizedname);
          console.log('increasingrate',increasingrate);
          addThisProductToDB();
        }}
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
