import React, { Component, useCallback, useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedCurrencyInput, OutlinedSelectInput, OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { moneyFormat, moneyToNumber, rateToString, moneyRound, calculateMortgage } from "../utils";
import { amortizations, maxQuota, minQuota, paymentPeriods } from "../stores/initial";
import { API_URL } from "../constants/urls";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";

export default function RefinancePage() {

    const [homeValue, setHomeValue] = useState(400000);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
    const [rate, setRate] = useState(5.59);
    const [maxAmount, setMaxAmount] = useState(homeValue * 0.8);
    const [result, setResult] = useState(0);
    const [loan, setLoan] = useState(homeValue * 0.25);
    const [loaded, setLoaded] = useState(false);
    const minAmount = 5000;
    const loadRates = async () => {
        try {
            const response = await fetch(API_URL + '/rate', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setRate(json.rate.fixedrate5years);
            setResult(calculateMortgage(maxAmount, rate, amortization.value, paymentPeriod.value));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //loadRates();
        setResult(calculateMortgage(maxAmount, rate, amortization.value, paymentPeriod.value));
    }, [rate]);

    const onChangeHomeValue = (value: any) => {
        setHomeValue(value);
        setResult(
            calculateMortgage(value * 0.8, rate, amortization.value, paymentPeriod.value)
        );
        setMaxAmount(value * 0.8);
    }

    const onUpdateLoanRange = (value: any) => {
        setResult(calculateMortgage(value, rate, amortization.value, paymentPeriod.value));
    };

    const onChangeRate = (value: any) => {
        setRate(value)
    }

    const onChangeAmortization = (item: any) => {
        setAmotization(item);
        setResult(
            calculateMortgage(
                maxAmount,
                rate,
                item.value,
                paymentPeriod.value
            )
        );
    };

    const onChangePaymentPeriod = (item: any) => {
        setPaymentPeriod(item);
        setResult(calculateMortgage(maxAmount, rate, paymentPeriod.value, item.value));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedCurrencyInput
                    label="Home Value"
                    type="money"
                    minimumValue={minQuota}
                    maximumValue={maxQuota}
                    value={homeValue}
                    precision={0}
                    onTextChange={(text) => onChangeHomeValue(text)} />
                <Slider
                    value={homeValue}
                    onValueChange={(value) => onChangeHomeValue(value)}
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
                    <Text style={AppStyle.TextStyle.text7}>{moneyFormat(loan)}*</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: "80%",
                        alignItems: 'stretch',
                    }}>
                        <Slider
                            thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                            trackStyle={{ height: 4, backgroundColor: 'transparent', borderRadius: 0 }}
                            minimumTrackTintColor="#57D9A3"
                            maximumTrackTintColor="#57D9A3"
                            value={loan}
                            onValueChange={(value) => onUpdateLoanRange(value)}
                            step={5000}
                            minimumValue={minAmount}
                            maximumValue={homeValue * 0.8}
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
                        width: "20%",
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
                    width: "85%",
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minAmount, true, true)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(homeValue * 0.8, true, true)}</Text></View>
                </View>
                <View style={AppStyle.TextStyle.Label}>
                    <Text style={AppStyle.TextStyle.h1}>Total Mortgage (Insurance $0)</Text>
                </View>
                <OutlinedTextInput
                    label="Rates"
                    type="rate"
                    minimumValue={0}
                    maximumValue={100}
                    value={rateToString(rate)}
                    onTextChange={(text) => onChangeRate(text)} />

                <OutlinedSelectInput
                    label="Amortization"
                    value={amortization}
                    items={amortizations}
                    onSelect={(item) => onChangeAmortization(item)} />

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Biweekly Payment" value={paymentPeriod} items={paymentPeriods} onSelect={(item) => onChangePaymentPeriod(item)} />
                            <Text style={AppStyle.TextStyle.text6}>{moneyFormat(result)}*</Text>
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
