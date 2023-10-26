import React, { Component, useCallback, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedTextInput } from "../components/OutlinedInput";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PreQualifierPage() {

    const [value, setValue] = useState(0);

    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Household Income" />
                <Slider
                    value={value}
                    onValueChange={(value) => setValue(value)}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text>{"$0"}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{"$2M"}</Text></View>
                </View>
                <OutlinedTextInput
                    label="Property Tax" />
                <OutlinedTextInput
                    label="Code Fee" />
                <OutlinedTextInput
                    label="Hydro Fee" />
                <OutlinedTextInput
                    label="Loan Payments" />

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Text style={AppStyle.TextStyle.text5}>Maximum Mortgage</Text>
                            <Text style={AppStyle.TextStyle.text6}>$958,744*</Text>
                        </View>
                        <View style={AppStyle.StyleMain.footerRightColumn}>
                            <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                                title="Get Pre-Qualified"
                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </View>
        </ SafeAreaView>
    )
}
