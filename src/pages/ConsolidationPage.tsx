import React, { Component, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Input } from "@rneui/themed";

export default function ConsolidationPage() {
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
