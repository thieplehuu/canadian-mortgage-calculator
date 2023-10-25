import React, { Component, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { ButtonGroup, Input } from "@rneui/themed";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function OTPVerifyPage() {
    const [otp, setOTP] = useState("");

    return (

        <View style={AppStyle.StyleMain.container}>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    secureTextEntry={true}
                    onChangeText={(otp) => setOTP(otp)}
                />
            </View>
        </View>)
}
