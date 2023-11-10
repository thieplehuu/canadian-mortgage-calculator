import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    View,
} from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { API_URL } from "../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import LoadingModal from "../components/loadingModal";
import { COUNTRY_CODE } from "../constants/const";
import { setUser } from "../actions/user";

interface Props {
    route: any,
    navigation: any
}

const OTPVerifyPage: FC<Props> = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState("");
    const [error, setError] = useState("");
    const user = useSelector((state: any) => state.user);
    const firebase = useSelector((state: any) => state.firebase);
    const { action } = route.params;

    const dispatch = useDispatch();
    const verifyOtp = async () => {
        try {
            setLoading(true)
            var result = await firebase.confirm(otp);
            console.log(action);
            if (action == "REGISTER") {
                try {
                    const response = await fetch(API_URL + '/register', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            first_name: user.firstName,
                            last_name: user.lastName,
                            mobile: COUNTRY_CODE + user.phoneNumber
                        })
                    });
                    const data = await response.json();
                    if (data.status == "success") {
                        console.log(data.uuid);
                        dispatch(setUser({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber,
                            uuid: data.uuid
                        }))
                        navigation.navigate("HomePage" as never);
                    }
                    if (data.status == "error") {
                        setError(data.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else if (action == "SIGNIN") {
                navigation.navigate("HomePage" as never);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("The verification code from SMS/TOTP is invalid");
            console.log(error)
        }
    }
    return (

        <View style={AppStyle.StyleMain.container}>
            <View style={AppStyle.StyleLogin.form}>
                <View style={styles.row}>
                    <OTPInputView
                        style={{ width: '100%', height: 300 }}
                        pinCount={6}
                        code={otp}
                        onCodeChanged={code => { setOTP(code) }}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.input}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        editable={true}
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                </View>
                <Text style={AppStyle.StyleMain.error}>{error}</Text>
                <View style={[AppStyle.StyleMain.stretch, { marginTop: 32 }]}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={verifyOtp} title={"Verify Code"} /></View>
                <LoadingModal modalVisible={loading} color={"#816CEC"} modalStyle={undefined} />
            </View>
        </View>)
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 12
    },
    input: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "#000000",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        borderBottomWidth: 1,
        color: "#4F4A45"
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    underlineStyleHighLighted: {
        borderColor: "red",
        color: "#4F4A45"
    },

});

export { OTPVerifyPage }