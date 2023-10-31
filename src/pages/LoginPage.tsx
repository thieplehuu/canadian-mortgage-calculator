import React, { useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Image,
} from "react-native";
import { ButtonGroup } from "@rneui/themed";
import RegisterForm from "../components/RegisterForm";
import RequestOTPForm from "../components/RequestOTPForm";
import VerifyOTPForm from "../components/VerifyOTPForm";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "../constants/urls";

export default function LoginPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [action, setAction] = useState('SIGNIN');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [confirm, setConfirm] = useState("");

    const navigation = useNavigation();
    const user = useSelector((state) => state.user);
    return (

        <View style={[AppStyle.StyleMain.container, {
            alignItems: "center",
            justifyContent: "center",
        }]}>
            {(step === 'INPUT_PHONE_NUMBER' || step === 'VERIFY_SUCCESS') &&
                <>
                    <Image style={AppStyle.StyleLogin.logo} source={require("../../assets/images/logo.png")} />
                    <ButtonGroup
                        buttons={['Sign In', 'Sign up']}
                        selectedIndex={selectedIndex}
                        onPress={(value) => {
                            setSelectedIndex(value);
                        }}
                        containerStyle={{ marginBottom: 20, backgroundColor: "pink" }}
                        buttonStyle={{ backgroundColor: "#F2F2F2" }}
                        selectedButtonStyle={{ backgroundColor: "#ffffff" }}
                        selectedTextStyle={{ color: "#000000" }}
                        textStyle={{ color: "#000000" }}
                    />
                    {selectedIndex == 0 ?
                        <RequestOTPForm requestSuccess={(confirm: any) => {
                            setStep('VERIFY_OTP')
                            setConfirm(confirm)
                        }} />
                        :
                        <RegisterForm requestSuccess={(confirm: any) => {
                            setAction("REGISTER");
                            setStep('VERIFY_OTP')
                            setConfirm(confirm)
                        }} />
                    }
                </>
            }
            {step === 'VERIFY_OTP' &&
                <><VerifyOTPForm confirm={confirm} verifySuccess={async (confirm: any) => {
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
                                    mobile: user.phoneNumber
                                })
                            });
                            const data = await response.json();
                            if (data.status == "success") {
                                navigation.navigate("HomePage" as never);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    } else if (action == "SIGNIN") {
                        navigation.navigate("HomePage" as never);
                    }
                    setStep('VERIFY_SUCCESS');
                }} /></>
            }
        </View>)
}
