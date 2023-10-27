import React, { Component, useCallback, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedTextInput } from "../components/OutlinedInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { moneyFormat, moneyRound, moneyToNumber } from "../utils";
import { maxQuota, minQuota } from "../stores";

export default function PreQualifierPage() {
    const [incomeValue, setIncomeValue] = useState(100000);
    const [propertyTax, setPropertyTax] = useState(66667);
    const [codeFee, setCodeFee] = useState(0);
    const [hydroFee, setHydroFee] = useState(120);
    const [loanPayment, setLoanPayment] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Household Income"
                    value={moneyFormat(incomeValue)}
                    onTextChange={(text) => setIncomeValue(moneyToNumber(text))} />
                <Slider
                    thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    minimumTrackTintColor="#816CEC"
                    maximumTrackTintColor="#816CEC"
                    value={incomeValue}
                    onValueChange={(value) => setIncomeValue(value)}
                    step={maxQuota / 1000}
                    minimumValue={minQuota}
                    maximumValue={maxQuota}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minQuota, true, false)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxQuota, true, true)}</Text></View>
                </View>
                <OutlinedTextInput
                    label="Property Tax"
                    value={moneyFormat(propertyTax)}
                    onTextChange={(text) => setPropertyTax(moneyToNumber(text))}
                />
                <OutlinedTextInput
                    label="Code Fee"
                    value={moneyFormat(codeFee)}
                    onTextChange={(text) => setCodeFee(moneyToNumber(text))}
                />
                <OutlinedTextInput
                    label="Hydro Fee"
                    value={moneyFormat(hydroFee)}
                    onTextChange={(text) => setHydroFee(moneyToNumber(text))}
                />
                <OutlinedTextInput
                    label="Loan Payments"
                    value={moneyFormat(loanPayment)}
                    onTextChange={(text) => setLoanPayment(moneyToNumber(text))}
                />

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
