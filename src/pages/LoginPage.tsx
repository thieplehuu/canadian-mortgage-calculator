import React, { Component, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { ButtonGroup } from "@rneui/themed";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (

        <View style={AppStyle.StyleMain.container}>

            <Image style={AppStyle.StyleLogin.logo} source={require("../assets/logo.png")} />
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
                <LoginForm />
                :
                <RegisterForm />
            }
        </View>)
}
