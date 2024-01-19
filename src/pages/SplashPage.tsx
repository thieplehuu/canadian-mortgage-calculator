import React, {useEffect} from 'react';
import AppStyle from '../theme';
import {View, Image} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {getData} from '../stores/store';
import {AUTHENTICATE_KEY} from '../constants/consts';
import ScaleImage from '../components/ScaleImage';

export default function SplashPage() {
  const navigation = useNavigation<any>();

  const getAuthenticate = async () => {
    let user = await getData(AUTHENTICATE_KEY, null);
    if (user != null) {
      navigation.dispatch(StackActions.replace('HomePage'));
    } else {
      navigation.dispatch(StackActions.replace('LoginPage'));
    }
  };

  useEffect(() => {
    getAuthenticate();
  });

  return (
    <View
      style={[
        AppStyle.StyleLogin.container,
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <ScaleImage
        style={AppStyle.StyleLogin.logo}
        source={require('../../assets/images/logo.png')}
      />
    </View>
  );
}
