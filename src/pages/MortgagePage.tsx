import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
} from "react-native";
import { Button, Slider } from "@rneui/themed";
import { OutlinedSelectInput, OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { moneyFormat, moneyToNumber, rateToString, moneyRound, calculateMortgage } from "../utils";
import { amortizations, inititalQuota, maxQuota, minQuota, paymentPeriods } from "../stores/initial";
import { API_URL } from "../constants/urls";
export default function MortgagePage() {

    const [rate, setRate] = useState(5.59);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [mortgateAmount, setMortgateAmount] = useState(inititalQuota);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
    const [result, setResult] = useState(0);
    const user = useSelector((state: any) => state.user);
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
            setResult(
                calculateMortgage(inititalQuota, json.rate.fixedrate5years, amortization.value, paymentPeriod.value)
            );
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        //loadRates();
    }, []);

    const onChangeMortgate = (value: any) => {
        console.log(amortization)
        setMortgateAmount(value)
        setResult(
            calculateMortgage(value, rate, amortization.value, paymentPeriod.value)
        );
    }

    const onChangeRate = (value: any) => {
        setRate(value)
        setResult(
            calculateMortgage(mortgateAmount, value, amortization.value, paymentPeriod.value)
        );
    }

    const onChangeAmortization = (item: any) => {
        setAmotization(item);
        setResult(
            calculateMortgage(mortgateAmount, rate, item.value, paymentPeriod.value)
        );
    }

    const onChangePaymentPeriod = (item: any) => {
        setPaymentPeriod(item);
        setResult(
            calculateMortgage(mortgateAmount, rate, amortization.value, item.value)
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Mortgage Amount"
                    value={moneyFormat(mortgateAmount)}
                    type="money"
                    onTextChange={(text) => setMortgateAmount(moneyToNumber(text))} />
                <Slider
                    thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    minimumTrackTintColor="#816CEC"
                    maximumTrackTintColor="#816CEC"
                    value={mortgateAmount}
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
                    onValueChange={(value) => onChangeMortgate(value)}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text style={AppStyle.Base.label}>{moneyRound(minQuota, true, true)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text style={AppStyle.Base.label}>{moneyRound(maxQuota, true, true)}</Text></View>
                </View>
                <OutlinedTextInput
                    label="Rates"
                    type="rate"
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
                                title="Apply Now"
                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </View>
        </ SafeAreaView>
    )
}
