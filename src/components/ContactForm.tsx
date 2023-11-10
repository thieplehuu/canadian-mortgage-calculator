import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Input, Button, Text, Image } from "@rneui/themed";
import { useSelector } from "react-redux";
import { API_URL } from "../constants/urls";
import { COUNTRY_CODE } from "../constants/const";
import LoadingModal from "./LoadingModal";
import DropShadow from "react-native-drop-shadow";

interface FormProps {
    onConfirm: (message: string) => void;
    onError: (error: any) => void;
}

const ContactForm: FC<FormProps> = ({ onConfirm, onError, ...props }) => {
    const user = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const onSubmit = async () => {
        setLoading(true)
        if (phoneNumber == "") {
            setError("Please enter your phone number");
            return;
        }
        try {
            let formData = {
                uuid: user.uuid,
                first_name: firstName,
                last_name: lastName,
                mobile: COUNTRY_CODE + phoneNumber,
                email: email,
                message: message,
            };
            const response = await fetch(API_URL + '/contact', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const json = await response.json();
            console.log(json)
            if (json.status == "success") {
                onConfirm("Send message success");
            } else {
                onError(json.message);
            }
        } catch (error: any) {
            onError(error);
        }
        setLoading(false)
    }
    return (
        <ScrollView>
            <View style={AppStyle.StyleMain.container}>
                <View style={styles.userSection}>
                    <Image style={styles.avatar} source={require("../../assets/images/person.png")} />
                    <View style={styles.userInfo}>
                        <Text style={textStyle.text3}>Suganthan Thavarajasingam</Text>
                        <Text style={textStyle.text4}>Mortgage Broker</Text>
                    </View>
                </View>
                <View style={styles.addressSection}>
                    <View>
                        <Text style={textStyle.text4}>Mortgage Architects</Text>
                        <Text style={textStyle.text4}>​FSRA 1272​8</Text>
                        <Text style={textStyle.text4}>11 Progress Av, Unit 5 Toronto ON M1P 4S7</Text>
                    </View>
                </View>
                <Text style={AppStyle.StyleMain.error}>{error}</Text>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputStyle={AppStyle.StyleMain.TextInput}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='First Name'
                        value={firstName}
                        onChangeText={(firstName) => setFirstName(firstName)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputStyle={AppStyle.StyleMain.TextInput}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Last Name'
                        value={lastName}
                        onChangeText={(lastName) => setLastName(lastName)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputStyle={AppStyle.StyleMain.TextInput}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Email'
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputStyle={AppStyle.StyleLogin.TextInput}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Phone Number'
                        keyboardType="numeric"
                        value={phoneNumber}
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
                <View style={AppStyle.StyleMain.multilineInput}>
                    <Input
                        inputStyle={[AppStyle.StyleMain.TextInput, { height: 90, justifyContent: "flex-start", textAlignVertical: "top" }]}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Enter your message'
                        value={message}
                        multiline={true}
                        onChangeText={(message) => setMessage(message)}
                    />
                </View>
                <View style={AppStyle.StyleMain.stretch}><Button
                    containerStyle={AppStyle.StyleMain.buttonContainer}
                    buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
                    title={"Submit Message"}
                    onPress={onSubmit} /></View>
                <LoadingModal modalVisible={loading} color={"#816CEC"} modalStyle={undefined} />

            </View>
        </ScrollView>)

}

const styles = StyleSheet.create({
    userSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    userInfo: {
        flex: 1
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 12,
        borderRadius: 35,
        overflow: "hidden",
    },
    addressSection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        textAlign: "left",
        alignSelf: "flex-start",
        marginBottom: 12
    },
})


const textStyle = StyleSheet.create({
    text3: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000000"
    },
    text4: {
        marginTop: 5,
        fontSize: 14,
        color: "#000000"
    },
})

export { ContactForm };