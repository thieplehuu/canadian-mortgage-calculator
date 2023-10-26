import React, { Component, FC, useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

interface Props {
    requestSuccess: ({}) => void;
}

const RegisterForm: FC<Props> = ({ requestSuccess }) => {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const countryCode = "+84";
    const requestOTP = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
            requestSuccess(confirmation);
            //setConfirm(confirmation);
        } catch (error) {
            console.log('error');
            console.log(error)
        }
    }
    return (

        <View style={AppStyle.StyleLogin.container}>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    style={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="First Name"
                    value={firstName}
                    secureTextEntry={true}
                    onChangeText={(firstName) => setFirstName(firstName)}
                />
            </View>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    style={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="Last Name"
                    value={lastName}
                    secureTextEntry={true}
                    onChangeText={(lastName) => setLastName(lastName)}
                />
            </View>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Phone Number'
                    secureTextEntry={true}
                    value={phoneNumber}
                    leftIcon={
                        <View><Text>{countryCode} |</Text></View>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <View style={AppStyle.StyleMain.stretch}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={requestOTP} title={"Get OTP"} /></View>
        </View>)
}

export default RegisterForm;