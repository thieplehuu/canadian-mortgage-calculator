import React, { useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    View,
} from "react-native";
import { Input, Button, Text, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
export default function ContactForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    const countryCode = "+84";

    const navigation = useNavigation();
    const sendMessage = async () => {
        navigation.navigate("MortgageCalculatorPage" as never)
    }
    return (
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
                    value={phoneNumber}
                    leftIcon={
                        <Text>{countryCode}</Text>
                    }
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
            </View>
            <View style={AppStyle.StyleMain.input}>
                <Input
                    inputStyle={AppStyle.StyleMain.TextInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Enter your message'
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                />
            </View>
            <View style={AppStyle.StyleMain.stretch}><Button
                containerStyle={AppStyle.StyleMain.buttonContainer}
                buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
                title={"Submit Message"}
                onPress={sendMessage} /></View>

        </View>)

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
