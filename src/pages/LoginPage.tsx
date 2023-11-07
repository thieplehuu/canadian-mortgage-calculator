import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Image,
    BackHandler,
    Text,
} from "react-native";
import RegisterForm from "../components/RegisterForm";
import { useNavigation } from "@react-navigation/native";
import SwitchSelector from "react-native-switch-selector";
import LoginForm from "../components/LoginForm";
export default function LoginPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [loginResult, setLoginResult] = useState(null);


    const navigation = useNavigation<any>();

    function handleBackButtonClick() {
        if (step == 'VERIFY_OTP') {
            setStep('INPUT_PHONE_NUMBER');
            return true;
        }
        return false;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    return (

        <View style={[AppStyle.StyleLogin.container, {
            alignItems: "center",
            justifyContent: "center",
        }]}>
            {(step === 'INPUT_PHONE_NUMBER' || step === 'VERIFY_SUCCESS') &&
                <>
                    <Image style={AppStyle.StyleLogin.logo} source={require("../../assets/images/logo.png")} />
                    <SwitchSelector
                        initial={0}
                        value={selectedIndex}
                        onPress={(value: any) => setSelectedIndex(value)}
                        textColor={"#000000"} //'#7a44cf'
                        selectedColor={"#000000"}
                        buttonColor={"#ffffff"}
                        borderColor={"#EEEEEF"}
                        borderRadius={8}
                        hasPadding
                        valuePadding={2}
                        height={48}
                        backgroundColor={"#EEEEEF"}
                        options={[
                            { label: "Sign In", value: 0 },
                            { label: "Sign up", value: 1 }
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />

                    {selectedIndex == 0 ?
                        <LoginForm requestSuccess={() => {
                            navigation.navigate("OTPVerifyPage", { action: 'SIGNIN' });
                        }} onLoginFailed={(result: any) => {
                            setLoginResult(result);
                            setSelectedIndex(1);
                        }} />
                        :
                        <RegisterForm
                            loginResult={loginResult}
                            requestSuccess={() => {
                                navigation.navigate("OTPVerifyPage", {
                                    action: 'REGISTER'
                                });
                            }} />
                    }
                </>
            }
        </View>)
}
