import React, {useEffect, useState} from 'react';
import AppStyle from '../theme';
import {View} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {OutlinedText} from '../components/OutlinedInput';
import {getData, storeData} from '../stores/store';
import {AUTHENTICATE_KEY, COUNTRY_CODE} from '../constants/consts';
import {API_URL} from '../constants/urls';
import {useToast} from 'react-native-toast-notifications';
import LoadingModal from '../components/LoadingModal';

export default function ProfilePage() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [uuid, setUUID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const toast = useToast();

  const getAuthenticate = async () => {
    let user = await getData(AUTHENTICATE_KEY, null);
    if (user != null) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(COUNTRY_CODE + ' ' + user.phoneNumber);
      setEmail(user.email);
      setUUID(user.uuid);
    }
  };

  useEffect(() => {
    getAuthenticate();
  });

  const logout = async () => {
    setLoading(true);
    storeData(AUTHENTICATE_KEY, null);
    setLoading(false);
    navigation.dispatch(StackActions.replace('LoginPage'));
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      let formData = {
        uuid: uuid,
      };
      const response = await fetch(API_URL + '/user/delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (json.status == 'success') {
        toast.show('Delete account success', {
          type: 'success',
          placement: 'center',
          duration: 2000,
          animationType: 'zoom-in',
        });
        navigation.dispatch(StackActions.replace('LoginPage'));
      }
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <View
      style={[
        AppStyle.StyleMain.container,
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      ]}>
      <View>
        <View style={[AppStyle.StyleMain.row]}>
          <OutlinedText label={'First Name'} value={firstName} />
        </View>
        <View style={[AppStyle.StyleMain.row]}>
          <OutlinedText label={'Last Name'} value={lastName} />
        </View>
        <View style={[AppStyle.StyleMain.row]}>
          <OutlinedText label={'Phone Number'} value={phoneNumber} />
        </View>
        <View style={[AppStyle.StyleMain.row]}>
          <OutlinedText label={'Email'} value={email} />
        </View>
      </View>
      <View>
        <Button
          containerStyle={[AppStyle.StyleMain.buttonContainer, {marginTop: 12}]}
          buttonStyle={AppStyle.StyleMain.buttonFullwidthOutlined}
          titleStyle={{
            color: '#816CEC',
            fontSize: 20,
          }}
          title={'Delete Account'}
          onPress={() => {
            deleteAccount();
          }}
        />
        <Button
          containerStyle={[AppStyle.StyleMain.buttonContainer, {marginTop: 12}]}
          buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
          titleStyle={{
            color: 'white',
            fontSize: 20,
          }}
          title={'Logout'}
          onPress={() => {
            logout();
          }}
        />
      </View>
      <LoadingModal
        modalVisible={loading}
        color={'#816CEC'}
        modalStyle={undefined}
      />
    </View>
  );
}
