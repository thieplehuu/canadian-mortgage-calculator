import React, {FC, useEffect, useState} from 'react';
import AppStyle from '../theme';
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input, Text, Button} from '@rneui/themed';
import {API_URL} from '../constants/urls';
import {AUTHENTICATE_KEY, COUNTRY_CODE} from '../constants/consts';
import LoadingModal from './LoadingModal';
import {getData} from '../stores/store';

interface TextInputProps {
  title: string;
  data: any;
  onConfirm: (message: string) => void;
  onError: (error: any) => void;
}

const ApplyForm: FC<TextInputProps> = ({
  title,
  data,
  onConfirm,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uuid, setUUID] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const lastNameRef = React.createRef();
  const emailRef = React.createRef();
  const phoneNumberRef = React.createRef();
  const messageRef = React.createRef();

  const getAuthenticate = async () => {
    let user = await getData(AUTHENTICATE_KEY, null);
    if (user != null) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
      setUUID(user.uuid);
    }
  };

  useEffect(() => {
    getAuthenticate();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    if (phoneNumber == '') {
      setError('Please enter your phone number');
      return;
    }
    try {
      let formData = {
        uuid: uuid,
        first_name: firstName,
        last_name: lastName,
        mobile: COUNTRY_CODE + phoneNumber,
        email: email,
        message: message,
      };
      const response = await fetch(API_URL + '/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, ...data}),
      });
      const json = await response.json();
      if (json.status == 'success') {
        onConfirm(json.message);
      } else {
        onError(json.message);
      }
    } catch (error: any) {
      onError(error);
    }

    setLoading(false);
  };
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AppStyle.StyleMain.container}>
          <Text style={AppStyle.StyleMain.error}>{error}</Text>
          {Platform.OS === 'ios' && <View style={{height: 50}}></View>}

          <View style={AppStyle.StyleMain.input}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="First Name"
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameRef.current?.focus();
              }}
              value={firstName}
              onChangeText={firstName => setFirstName(firstName)}
            />
          </View>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Last Name"
              ref={lastNameRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Email"
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => {
                phoneNumberRef.current?.focus();
              }}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Phone Number"
              keyboardType="numeric"
              returnKeyType="done"
              ref={phoneNumberRef}
              onSubmitEditing={() => {
                messageRef.current?.focus();
              }}
              value={phoneNumber}
              leftIcon={
                <View
                  style={{
                    width: 40,
                    alignContent: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={AppStyle.StyleMain.phoneInputPrefixLabel}>
                      {COUNTRY_CODE}
                    </Text>
                    <View style={AppStyle.StyleMain.InputSeparate} />
                  </View>
                </View>
              }
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
          </View>
          <View style={AppStyle.StyleMain.multilineInput}>
            <Input
              inputStyle={[
                AppStyle.StyleMain.TextInput,
                {
                  height: 90,
                  justifyContent: 'flex-start',
                  textAlignVertical: 'top',
                },
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Enter your message"
              multiline={true}
              returnKeyType="done"
              ref={messageRef}
              blurOnSubmit={true}
              value={message}
              onChangeText={message => setMessage(message)}
            />
          </View>
          <LoadingModal
            modalVisible={loading}
            color={'#816CEC'}
            modalStyle={undefined}
          />

          <Button
            containerStyle={AppStyle.StyleMain.buttonContainer}
            buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
            titleStyle={AppStyle.StyleMain.buttonTitleStyle}
            title="Submit Message"
            onPress={onSubmit}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export {ApplyForm};
