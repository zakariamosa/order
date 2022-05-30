import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button} from 'react-native-elements';
import constants from '../../configs/constants';
import axios from 'axios';
import {actionsstore} from '../../features/store';
import {useDispatch, useSelector} from 'react-redux';
import {UserContext} from '../../configs/ProjectContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import OrderStoreItemList from './OrderStoreItemList';
import {useNavigation} from '@react-navigation/native';
import {actionsstoreproducts} from '../../features/storeproducts';

const Order = ({navigation = useNavigation()}) => {
  const [store, setStore] = useState([{}]);

  const dispatch = useDispatch();
  const getSavedStore = useSelector(state => state.store);
  const {userInfo, setUserInfo} = useContext(UserContext);
  const getSavedStoreProducts = useSelector(state => state.storeproducts);
  const [userId, setUserId] = useState(0);
  const [bestallareId, setBestallareId] = useState(0);

  const deleteStoreFromAPI = Storeid => {
    console.log('this is the store id we want to delete from api', Storeid);
    axios
      .delete(`${constants.api}Tblstores/` + Storeid)
      .then(response => {})
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };
  /*
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
                  
                
                setStore(response.data);
                //here i need to fill the redux state with all the products inside each store
                dispatch(actionsstoreproducts.resetstoreproducts());
                response.data.map(userstore=>{
                  console.log('userstore.id',userstore.id)
                  fillTheStoreProducts(userstore.id);
                });
                
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
  );*/
  const fillTheStoreProducts = storeid => {
    axios
      .get(
        `${constants.api}Bestallareitems/GetBestallareStoreItemsWithType/` +
          storeid,
      )
      .then(response => {
        console.log('response.data', response.data);

        dispatch(actionsstoreproducts.addstoreproducts(response.data));
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };
  const addorder = () => {
    axios
      .post(`${constants.api}Tblorders/`, {
        bestallareid: bestallareId,
        bestallareuserid: userId,
      })
      .then(response => {
        console.log('this is the order response after save: ', response.data);
        //response.data.id this is the order id
        //need to get the selected itemid and amount for the selected items in getSavedStoreProducts
        console.log(
          'this is the order details data before save: ',
          getSavedStoreProducts.filter(p => p.selected == true),
        );
        getSavedStoreProducts
          .filter(p => p.selected == true)
          .map(selectedproduct => {
            axios
              .post(`${constants.api}Tblorderdetails/`, {
                orderid: response.data.id,
                itemid: selectedproduct.itemid,
                amount:selectedproduct.amount
              })
              .then(response => {
                //reset redux store
                
              })
              .catch(error => {
                console.log('here', error.response.request._response);
                //console.log(error.message);
              });
          });
      })
      .catch(error => {
        console.log('here', error.response.request._response);
        //console.log(error.message);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('currentUserCredentials')
      .then(value => {
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
          setUserId(stringify.id);

          axios
            .get(
              `${constants.api}Tblstores/GetBestallareStores/` + stringify.id,
            )
            .then(response => {
              console.log('response.data', response.data);
              console.log('getSavedStore', getSavedStore);

              setStore(response.data);
              //here i need to fill the redux state with all the products inside each store
              dispatch(actionsstoreproducts.resetstoreproducts());
              response.data.map(userstore => {
                console.log('userstore.id', userstore.id);
                setBestallareId(userstore.bestallareid);
                fillTheStoreProducts(userstore.id);
              });
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
  }, [getSavedStore]);
  useEffect(() => {
    AsyncStorage.getItem('currentUserCredentials')
      .then(value => {
        var stringify = JSON.parse(value);
        console.log('stringify', stringify);
        if (stringify !== null && stringify !== '') {
          axios
            .get(
              `${constants.api}Tblstores/GetBestallareStores/` + stringify.id,
            )
            .then(response => {
              dispatch(actionsstore.getstore(response.data));

              setStore(response.data);
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
  }, []);
  return (
    <View>
      <Button
        title="Place the order"
        buttonStyle={{backgroundColor: 'rgba(11, 156, 49, 1)'}}
        containerStyle={{
          height: 40,
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{color: 'white', marginHorizontal: 20}}
        onPress={() => {
          addorder();
          //navigation.navigate('Store')
        }}
      />

      <ScrollView>
        <View>
          {getSavedStore.map(store => {
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
                <Text>{store.storename}</Text>

                <Button
                  title="+"
                  buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
                  containerStyle={{
                    height: 40,
                    width: 60,
                    right: 10,
                    position: 'absolute',
                    borderRadius: 10,
                  }}
                  titleStyle={{color: 'white', marginHorizontal: 20}}
                  onPress={() => {
                    console.log('this store id: ', store.id);
                    //deleteStoreFromAPI(store.id);
                    //dispatch(actionsstore.deletestore({"id": store.id}));
                    navigation.navigate('OrderStoreItemList', {
                      storeid: store.id,
                    });
                  }}
                />
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
    flexDirection: 'row',
  },
  dash: {
    marginTop: 15,
  },
});

export default Order;
