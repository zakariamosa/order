import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {actionstariff} from '../../features/tariff'
import { useDispatch } from "react-redux";
import { UserContext } from '../../configs/ProjectContext';

const TarifferTimePeriod = ({navigation}) => {
  const [fromtime, setFromTime] = useState('07:00');
  const [totime, setToTime] = useState('11:00');
  const [tariffvalue, setTariffValue] = useState(15);
  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useContext(UserContext)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn(
      'A date has been picked: ',
      date.toLocaleString('sv').replace(' ', 'T'),
    );
    let requireddateformatasstring = date
      .toLocaleString('sv')
      .replace(' ', 'T');
    let requiredtime = requireddateformatasstring
      .substring(requireddateformatasstring.length - 8)
      .substring(0, 5);
    console.warn('A time has been picked: ', requiredtime);
    setFromTime(requiredtime);
    hideDatePicker();
  };

  const [isDatePickerVisibleto, setDatePickerVisibilityto] = useState(false);

  const showDatePickerto = () => {
    setDatePickerVisibilityto(true);
  };

  const hideDatePickerto = () => {
    setDatePickerVisibilityto(false);
  };

  const handleConfirmto = date => {
    console.warn(
      'A date has been picked: ',
      date.toLocaleString('sv').replace(' ', 'T'),
    );
    let requireddateformatasstring = date
      .toLocaleString('sv')
      .replace(' ', 'T');
    let requiredtime = requireddateformatasstring
      .substring(requireddateformatasstring.length - 8)
      .substring(0, 5);
    console.warn('A time has been picked: ', requiredtime);
    setToTime(requiredtime);
    hideDatePickerto();
  };

  return (
    <View>
      <View style={styles.beside}>
        <Text>From         </Text>

        <Text>To       </Text>
        <Text>tariff Value</Text>
      </View>
      <View style={styles.beside}>
        <Button
          title={fromtime}
          onPress={() => {
            showDatePicker();
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Button
          title={totime}
          onPress={() => {
            showDatePickerto();
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisibleto}
          mode="time"
          onConfirm={handleConfirmto}
          onCancel={hideDatePickerto}
        />
        <TextInput onChangeText={(text)=>setTariffValue(text)}>{tariffvalue}</TextInput>
        <Text>kw/h</Text>
      </View>
      <Button
          title='Add'
          onPress={() => {
              //add this to the db
              dispatch(actionstariff.addtariff({"id": 0,
              "startTime": fromtime,
              "endTime": totime,
              "tariffValue": tariffvalue,
              "mainHubId": +userInfo.mainhubId}))
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
