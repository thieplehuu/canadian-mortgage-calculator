import React, { FC, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Input, Text, Image, Dialog, Button } from "@rneui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from "../constants/urls";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";

interface TextInputProps {
    title: string;
    data: any;
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onError: (error: any) => void;
}

const ApplyDialog: FC<TextInputProps> = ({ title, data, visible, onConfirm, onCancel, onError, ...props }) => {
    const user = useSelector((state: any) => state.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [message, setMessage] = useState("");
    const [datePickerVisible, showDatePicker] = useState(false);
    const countryCode = "+84";
    const onShowDatePicker = () => {
        showDatePicker(true);
    }

    const onSelectDate = (event: any, selectedDate: any) => {
        showDatePicker(false);
        const currentDate = selectedDate;
        setDate(currentDate);
        setDateString(formatDate(currentDate));
    };

    const onSubmit = async () => {
        try {
            let formData = {
                first_name: firstName,
                last_name: lastName,
                mobile: phoneNumber,
                email: email,
                message: message,
            };
            const response = await fetch(API_URL + '/contact', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, ...data }),
            });
            const json = await response.json();
            if (json.status == "success") {
                onConfirm();
            } else {
                onError(json.message);
            }
        } catch (error: any) {
            onError(error);
        }

    }

    return (
        <Dialog
            isVisible={visible}
            style={{ backgroundColor: "#000000" }}
        >
            <Dialog.Title title={title} />
            <View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='First Name'
                        value={firstName}
                        onChangeText={(firstName) => setFirstName(firstName)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Last Name'
                        value={lastName}
                        onChangeText={(lastName) => setLastName(lastName)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Email'
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
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
                    <TouchableOpacity onPress={() => { onShowDatePicker() }} style={{ flex: 1, alignSelf: "stretch", alignContent: "center", justifyContent: "center" }}>
                        <Text style={[AppStyle.StyleLogin.TextInput, { alignSelf: "flex-start" }]}>{dateString == "" ? "Date" : dateString}</Text>
                    </TouchableOpacity>
                    {datePickerVisible && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onSelectDate}
                        />
                    )}
                </View>
                <View style={AppStyle.StyleMain.input}>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Enter your message'
                        value={message}
                        onChangeText={(message) => setMessage(message)}
                    />
                </View>

            </View>
            <Dialog.Actions>
                <Dialog.Button
                    title="Submit"
                    onPress={onSubmit}
                />
                <Dialog.Button title="Cancel" onPress={onCancel} />
            </Dialog.Actions>
        </Dialog>)

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

export { ApplyDialog };