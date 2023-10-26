import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    Alert
} from "react-native";
import { Input, Button } from "@rneui/themed";
interface Props {
    requestSuccess: ({}) => void;
}

const RequestOTPForm: FC<Props> = ({ requestSuccess }) => {

    const [phoneNumber, setPhoneNumber] = useState("");

    const countryCode = "+84";

    const requestOTP = async () => {
        try {
            //const confirmation = await auth().signInWithPhoneNumber(countryCode + phoneNumber);
            requestSuccess('confirmation')
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
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Phone Number'
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

export default RequestOTPForm;