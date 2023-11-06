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
import { COUNTRY_CODE } from "../constants/const";
import LoadingModal from "./loadingModal";
import Icon from 'react-native-vector-icons/AntDesign';

interface TextInputProps {
    title: string;
    data: any;
    onConfirm: (message: string) => void;
    onError: (error: any) => void;
}

const ApplyForm: FC<TextInputProps> = ({ title, data, onConfirm, onError, ...props }) => {
    const user = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [message, setMessage] = useState("");
    const [datePickerVisible, showDatePicker] = useState(false);
    const [error, setError] = useState("");
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
        if(phoneNumber==""){
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
            console.log({ ...formData, ...data });
            const response = await fetch(API_URL + '/contact', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, ...data }),
            });
            const json = await response.json();
            console.log({ ...formData, ...data });
            console.log(json);
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
                        <View style={{width:40, alignContent:"flex-start", alignItems:"center", justifyContent:"center"}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={AppStyle.StyleMain.phoneInputPrefixLabel}>{COUNTRY_CODE}</Text>
                                <View style={AppStyle.StyleMain.InputSeparate}/>
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
                    inputStyle={[AppStyle.StyleMain.TextInput, {height: 90, justifyContent:"flex-start", textAlignVertical:"top"}]}
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
                titleStyle={{ color: 'white'}}
                title="Submit Message"
                onPress={onSubmit}
            />
        </View>
    )

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

export { ApplyForm };