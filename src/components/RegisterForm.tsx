import React, { Component, FC, useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { setUser } from "../actions/index";


interface Props {
    requestSuccess: ({ }) => void;
}

const RegisterForm: FC<Props> = ({ requestSuccess }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const countryCode = "+84";

    const dispatch = useDispatch();
    const requestOTP = async () => {
        try {
            //const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
            //requestSuccess(confirmation);
            dispatch(setUser({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            }))
            requestSuccess('confirmation');
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
                    onChangeText={(firstName) => setFirstName(firstName)}
                />
            </View>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    style={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(lastName) => setLastName(lastName)}
                />
            </View>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Phone Number'
                    value={phoneNumber}
                    leftIcon={
                        <View><Text style={AppStyle.Base.label}>{countryCode} |</Text></View>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <View style={AppStyle.StyleMain.stretch}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={requestOTP} title={"Get OTP"} /></View>
        </View>)
}

export default RegisterForm;