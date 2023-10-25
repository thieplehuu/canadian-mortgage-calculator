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

export default function LoginPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [confirm, setConfirm] = useState("");

    const navigation = useNavigation();
    return (

        <View style={AppStyle.StyleMain.container}>
            {step === 'INPUT_PHONE_NUMBER' &&
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
                            setStep('VERIFY_OTP')
                            setConfirm(confirm)
                        }} />
                    }
                </>
            }
            {step === 'VERIFY_OTP' &&
                <><VerifyOTPForm confirm={confirm} verifySuccess={(confirm: any) => {
                    setStep('VERIFY_SUCCESS')
                    navigation.navigate("HomePage" as never)
                }} /></>
            }
        </View>)
}
