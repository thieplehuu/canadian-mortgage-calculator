import React, {FC, useEffect, useRef, useState} from 'react';
import AppStyle from '../theme';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Input, Button, Text, Image} from '@rneui/themed';
import {API_URL} from '../constants/urls';
import {AUTHENTICATE_KEY, COUNTRY_CODE} from '../constants/consts';
import LoadingModal from './LoadingModal';
import {getData} from '../stores/store';
import {Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FormProps {
  onConfirm: (message: string) => void;
  onError: (error: any) => void;
}

const ContactForm: FC<FormProps> = ({onConfirm, onError, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [uuid, setUUID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (json.status == 'success') {
        onConfirm('Send message success');
      } else {
        onError(json.message);
      }
    } catch (error: any) {
      onError(error);
    }
    setLoading(false);
  };
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AppStyle.StyleMain.container}>
          <View style={styles.userSection}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/person.png')}
            />
            <View style={styles.userInfo}>
              <Text style={textStyle.text3}>Suganthan Thavarajasingam</Text>
              <Text style={textStyle.text4}>Mortgage Broker</Text>
            </View>
          </View>
          <View style={styles.addressSection}>
            <View>
              <Text style={textStyle.text4}>Mortgage Architects</Text>
              <Text style={textStyle.text4}>​FSRA 1272​8</Text>
              <Text style={textStyle.text4}>
                11 Progress Av, Unit 5 Toronto ON M1P 4S7
              </Text>
            </View>
          </View>
          <Text style={AppStyle.StyleMain.error}>{error}</Text>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputStyle={AppStyle.StyleMain.TextInput}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="First Name"
              value={firstName}
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameRef.current?.focus();
              }}
              onChangeText={firstName => setFirstName(firstName)}
            />
          </View>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputStyle={AppStyle.StyleMain.TextInput}
              inputContainerStyle={{borderBottomWidth: 0}}
              placeholder="Last Name"
              returnKeyType="next"
              ref={lastNameRef}
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
            />
          </View>
          <View style={AppStyle.StyleMain.input}>
            <Input
              inputStyle={AppStyle.StyleMain.TextInput}
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
              inputStyle={AppStyle.StyleLogin.TextInput}
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
              returnKeyType="go"
              ref={messageRef}
              value={message}
              onChangeText={message => setMessage(message)}
            />
          </View>
          <View style={AppStyle.StyleMain.stretch}>
            <Button
              containerStyle={AppStyle.StyleMain.buttonContainer}
              buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
              titleStyle={AppStyle.StyleMain.buttonTitleStyle}
              title={'Submit Message'}
              onPress={onSubmit}
            />
          </View>
          <LoadingModal
            modalVisible={loading}
            color={'#816CEC'}
            modalStyle={undefined}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 35,
    overflow: 'hidden',
  },
  addressSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});

const textStyle = StyleSheet.create({
  text3: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  text4: {
    marginTop: 5,
    fontSize: 14,
    color: '#000000',
  },
});

export {ContactForm};
