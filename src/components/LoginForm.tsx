import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    Text,
    View,
    Alert
} from "react-native";
import { Input, Button } from "@rneui/themed";
import auth from '@react-native-firebase/auth';
import LoadingModal from "./loadingModal";
import { setConfirm } from "../actions/firebase";
import { useDispatch } from "react-redux";
import { COUNTRY_CODE } from "../constants/const";
import { setUser } from "../actions/user";
import { API_URL } from "../constants/urls";
interface Props {
    requestSuccess: () => void;
}

const LoginForm: FC<Props> = ({ requestSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const requestOTP = async () => {
        try {
            if(phoneNumber==""){
                setError("Please enter your phone number");
                return;
            }
            setLoading(true)
            try {
                const response = await fetch(API_URL + '/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobile: COUNTRY_CODE + phoneNumber
                    })
                });
                const data = await response.json();
                if (data.status == "success") {
                    dispatch(setUser({
                        firstName: data.user.first_name,
                        lastName: data.user.last_name,
                        phoneNumber: data.user.mobile.substring(COUNTRY_CODE.length),
                        uuid: data.user.uuid
                    }));                    
                    const confirmation = await auth().signInWithPhoneNumber(COUNTRY_CODE + phoneNumber);
                    dispatch(setConfirm(confirmation))
                }
                if (data.status == "error") {
                    setError(data.message);
                }
            } catch (error) {
                console.error(error);
            }            
            requestSuccess()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <View style={AppStyle.StyleLogin.form}>
            <View style={AppStyle.StyleLogin.input}>
                <Input
                    inputStyle={AppStyle.StyleLogin.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Phone Number'
                    value={phoneNumber}
                    keyboardType="numeric"
                    leftIcon={
                        <View style={{width:40, alignContent:"flex-start", alignItems:"center", justifyContent:"center"}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={AppStyle.StyleMain.phoneInputPrefixLabel}>{COUNTRY_CODE}</Text>
                                <View style={AppStyle.StyleMain.InputSeparate}/>
                            </View>
                        </View>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <Text style={AppStyle.StyleMain.error}>{error}</Text>
            <View style={AppStyle.StyleMain.stretch}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={requestOTP} title={"Get OTP"} /></View>
            <LoadingModal modalVisible={loading} />
        </View>)
}

export default LoginForm;