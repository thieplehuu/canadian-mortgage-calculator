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
import { setUser } from "../actions/user";
import LoadingModal from "./loadingModal";
import { setConfirm } from "../actions/firebase";
import { COUNTRY_CODE } from "../constants/const";


interface Props {
    loginResult: any,
    requestSuccess: () => void;
}

const RegisterForm: FC<Props> = ({ loginResult, requestSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(loginResult != null && loginResult.status == "error" ? loginResult.phoneNumber : "");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const requestOTP = async () => {
        try {
            if (phoneNumber == "") {
                setError("Please enter your phone number");
                return;
            }
            setLoading(true)
            const confirmation = await auth().signInWithPhoneNumber(COUNTRY_CODE + phoneNumber);
            console.log(confirmation)
            dispatch(setUser({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            }))
            dispatch(setConfirm(confirmation))
            requestSuccess();
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (

        <View style={AppStyle.StyleLogin.form}>
            {loginResult != null && loginResult.status == "error" ? <Text style={AppStyle.StyleMain.error}>{loginResult.message}</Text> : <View></View>}
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
                    keyboardType="numeric"
                    leftIcon={
                        <View style={{ width: 40, alignContent: "flex-start", alignItems: "center", justifyContent: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={AppStyle.StyleMain.phoneInputPrefixLabel}>{COUNTRY_CODE}</Text>
                                <View style={AppStyle.StyleMain.InputSeparate} />
                            </View>
                        </View>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <Text style={AppStyle.StyleMain.error}>{error}</Text>
            <View style={AppStyle.StyleMain.stretch}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={requestOTP} title={"Get OTP"} /></View>
            <LoadingModal modalVisible={loading} color={""} modalStyle={undefined} />
        </View>)
}

export default RegisterForm;