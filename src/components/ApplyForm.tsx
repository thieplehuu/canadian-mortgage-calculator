import React, { FC, useEffect, useState } from "react";
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
import { AUTHENTICATE_KEY, COUNTRY_CODE } from "../constants/consts";
import LoadingModal from "./LoadingModal";
import Icon from 'react-native-vector-icons/AntDesign';
import { getData } from "../stores/store";

interface TextInputProps {
    title: string;
    data: any;
    onConfirm: (message: string) => void;
    onError: (error: any) => void;
}

const ApplyForm: FC<TextInputProps> = ({ title, data, onConfirm, onError, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [uuid, setUUID] = useState("");
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [message, setMessage] = useState("");
    const [datePickerVisible, showDatePicker] = useState(false);
    const [error, setError] = useState("");

    const getAuthenticate = async () => {
        let user = await getData(AUTHENTICATE_KEY, null);
        if (user != null) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPhoneNumber(user.phoneNumber);
            setEmail(user.email);
            setUUID(user.uuid);
        }
    }

    useEffect(() => {
        getAuthenticate();
    })

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
        setLoading(true)
        if (phoneNumber == "") {
            setError("Please enter your phone number");
            return;
        }
        try {
            let formData = {
                uuid: uuid,
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
                body: JSON.stringify({ ...formData, ...data }),
            });
            const json = await response.json();
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
        <View style={AppStyle.StyleMain.container}>
            <Text style={AppStyle.StyleMain.error}>{error}</Text>
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
                    keyboardType="numeric"
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
            <View style={AppStyle.StyleMain.multilineInput}>
                <Input
                    inputStyle={[AppStyle.StyleMain.TextInput, { height: 90, justifyContent: "flex-start", textAlignVertical: "top" }]}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Enter your message'
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                />
            </View>
            <LoadingModal modalVisible={loading} color={"#816CEC"} modalStyle={undefined} />
            <Button
                containerStyle={AppStyle.StyleMain.DialogSubmitButtonContainer}
                buttonStyle={AppStyle.StyleMain.DialogSubmitButton}
                titleStyle={{ color: 'white' }}
                title="Submit Message"
                onPress={onSubmit}
            />
        </View>
    )

}

export { ApplyForm };