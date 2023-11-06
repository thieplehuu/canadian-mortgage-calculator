import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Image,
    BackHandler,
} from "react-native";
import { ButtonGroup } from "@rneui/themed";
import RegisterForm from "../components/RegisterForm";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SwitchSelector from "react-native-switch-selector";
import LoginForm from "../components/LoginForm";
export default function LoginPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [action, setAction] = useState('SIGNIN');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [confirm, setConfirm] = useState("");

    const navigation = useNavigation();
    const user = useSelector((state) => state.user);

    function handleBackButtonClick() {
        if(step=='VERIFY_OTP'){
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
                        onPress={(value: any) => setSelectedIndex(value)}
                        textColor={"#000000"} //'#7a44cf'
                        selectedColor={"#000000"}
                        buttonColor={"#ffffff"}
                        borderColor={"#EEEEEF"}
                        borderRadius={8}
                        hasPadding
                        valuePadding = {2}
                        height = {48}
                        backgroundColor={"#EEEEEF"}
                        options={[
                            { label: "Sign In", value: 0 }, //images.feminino = require('./path_to/assets/img/feminino.png')
                            { label: "Sign up", value: 1 } //images.masculino = require('./path_to/assets/img/masculino.png')
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        />                    
                    {selectedIndex == 0 ?
                        <LoginForm requestSuccess={() => {
                            navigation.navigate("OTPVerifyPage" as never,{
                                action: 'SIGNIN'
                              });
                        }} />
                        :
                        <RegisterForm requestSuccess={() => {
                            navigation.navigate("OTPVerifyPage" as never,{
                                action: 'REGISTER'
                              });
                        }} />
                    }
                </>
            }            
        </View>)
}
