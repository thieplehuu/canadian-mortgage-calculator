import React, { useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

export default function LoginForm() {
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigation = useNavigation();
    const onGetOTP = () => {
        navigation.navigate("OTPVerifyPage" as never)
    };
    return (
        <View style={AppStyle.StyleLogin.container}>
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
