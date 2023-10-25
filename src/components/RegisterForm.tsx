import React, { Component, useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const onGetOTP = () => { navigation.navigate("OTPVerifyPage" as never) };
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
                        <Text
                        >+1</Text>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <Button containerStyle={AppStyle.StyleLogin.buttonContainer} buttonStyle={AppStyle.StyleLogin.buttonStyle} onPress={onGetOTP} title={"Get OTP"} />
        </View>)
}