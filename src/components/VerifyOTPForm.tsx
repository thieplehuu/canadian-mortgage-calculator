import React, { useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Input, Button } from "@rneui/themed";
export default function VerifyOTPForm({ confirm, verifySuccess }) {
    const [otpCode, setOtp] = useState("");

    const verifyOtp = async () => {
        try {
            //await confirm.confirm(otpCode);
            verifySuccess('confirmation');
        } catch (error) {
            console.log('error');
            console.log(error)
        }
    }

    return (
        <View style={AppStyle.StyleLogin.container}>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='SMS code'
                    value={otpCode}
                    onChangeText={(otpCode) => setOtp(otpCode)}
                />
            </View>
            <View style={AppStyle.StyleMain.stretch}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={verifyOtp} title={"Verify Code"} /></View>
        </View>)

}
