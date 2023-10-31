import React, { Component, useCallback, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedSelectInput, OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { moneyFormat, moneyToNumber, rateToString, moneyRound } from "../utils";
import { amortizations, maxQuota, minQuota, paymentPeriods } from "../stores/initial";

export default function RefinancePage() {

    const [rate, setRate] = useState("1,75");
    const [homeValue, setHomeValue] = useState(400000);
    const [minMortgateValue, setMinMortgateValue] = useState(100000);
    const [maxMortgateValue, setMaxMortgateValue] = useState(400000);
    const [mortgateValue, setMortgateValue] = useState(240000);

    const [amortization, setAmotization] = useState(amortizations[0]);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);

    const onSetHomeValue = (value: number) => {
        setHomeValue(value);
        setMaxMortgateValue(value * 3 / 4);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Home Value"
                    type="money"
                    value={moneyFormat(homeValue)}
                    onTextChange={(text) => setHomeValue(moneyToNumber(text))} />
                <Slider
                    value={homeValue}
                    onValueChange={(value) => onSetHomeValue(value)}
                    thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    minimumTrackTintColor="#816CEC"
                    maximumTrackTintColor="#816CEC"
                    step={maxQuota / 1000}
                    minimumValue={minQuota}
                    maximumValue={maxQuota}
                    thumbProps={{
                        children: (
                            <View style={AppStyle.Base.sliderThumbContainer}>
                                <View style={AppStyle.Base.sliderThumb} />
                            </View>
                        ),
                    }}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minQuota, true, true)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxQuota, true, true)}</Text></View>
                </View>
                <View style={AppStyle.TextStyle.Label}>
                    <Text style={AppStyle.TextStyle.h1}>Maximum Mortgage</Text>
                </View>
                <View style={AppStyle.TextStyle.Label}>
                    <Text style={AppStyle.TextStyle.text7}>{moneyFormat(mortgateValue)}*</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: "70%",
                        alignItems: 'stretch',
                    }}>
                        <Slider
                            thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                            trackStyle={{ height: 4, backgroundColor: 'transparent', borderRadius: 0 }}
                            minimumTrackTintColor="#57D9A3"
                            maximumTrackTintColor="#57D9A3"
                            value={mortgateValue}
                            onValueChange={(value) => setMortgateValue(value)}
                            minimumValue={minMortgateValue}
                            maximumValue={maxMortgateValue}
                            step={maxQuota / 1000}
                            thumbProps={{
                                children: (
                                    <View style={AppStyle.Base.sliderThumbContainer}>
                                        <View style={AppStyle.Base.sliderThumb} />
                                    </View>
                                ),
                            }}
                        />
                    </View>
                    <View style={{
                        width: "30%",
                        alignItems: 'stretch',
                        alignContent: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            width: "100%", backgroundColor: "red",
                            height: 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}></View>
                    </View>

                </View>
                <View style={{
                    width: "75%",
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minMortgateValue, true, true)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxMortgateValue, true, true)}</Text></View>
                </View>
                <View style={AppStyle.TextStyle.Label}>
                    <Text style={AppStyle.TextStyle.h1}>Total Mortgage (Insurance $0)</Text>
                </View>
                <OutlinedTextInput
                    label="Rates"
                    type="rate"
                    value={rateToString(rate)}
                    onTextChange={(text) => setRate(text)} />

                <OutlinedSelectInput
                    label="Amortization"
                    value={amortization}
                    items={amortizations}
                    onSelect={(item) => setAmotization(item)} />

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Biweekly Payment" value={paymentPeriod} items={paymentPeriods} onSelect={(item) => setPaymentPeriod(item)} />
                            <Text style={AppStyle.TextStyle.text6}>$3,291.88*</Text>
                        </View>
                        <View style={AppStyle.StyleMain.footerRightColumn}>
                            <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                                title="Take the Next Step"
                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </View>
        </ SafeAreaView>
    )
}
