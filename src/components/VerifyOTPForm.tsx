import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Input, Button, Text } from "@rneui/themed";

interface Props {
    confirm: ({});
    verifySuccess: ({}) => void;
}

const VerifyOTPForm: FC<Props> = ({ confirm, verifySuccess }) => {
    const [otpCode, setOtp] = useState("");

    const verifyOtp = async () => {
        try {
            //await confirm.confirm(otpCode);
            verifySuccess('confirmation');
        } catch (error) {
            console.log('error');
            console.log(error)
        }
    }

    return (
        <View style={AppStyle.StyleLogin.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                        style={styles.input}
                        value={otpCode}
                        onChangeText={(otpCode) => setOtp(otpCode)}
                    />
                </View>
            </View>
            <View style={[AppStyle.StyleMain.stretch, {marginTop: 32}]}><Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle} onPress={verifyOtp} title={"Verify Code"} /></View>
        </View>)
}

const styles = StyleSheet.create({
    column: {
        alignItems: 'flex-start',
        width: 50,
        marginLeft: 4,
        marginRight: 4,
    },
    row: {
        flexDirection: 'row',
        marginTop: 12
    },
    input:{
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        padding: 4,
        width: "100%"
    }
});
export default VerifyOTPForm;