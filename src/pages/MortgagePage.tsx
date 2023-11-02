import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
} from "react-native";
import { Button, Slider } from "@rneui/themed";
import { OutlinedCurrencyInput, OutlinedSelectInput, OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { moneyFormat, moneyToNumber, rateToString, moneyRound, calculateMortgage } from "../utils";
import { amortizations, inititalQuota, maxQuota, minQuota, paymentPeriods } from "../stores/initial";
import { API_URL } from "../constants/urls";
import { ApplyDialog } from "../components/ApplyModal";
import { useToast } from "react-native-toast-notifications";

export default function MortgagePage() {

    const [rate, setRate] = useState(5.59);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [amount, setAmount] = useState(inititalQuota);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
    const [result, setResult] = useState(0);
    const [applyDialogVisible, showApplyDialog] = useState(false);
    const toast = useToast();
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
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadRates();
        setResult(
            calculateMortgage(inititalQuota, rate, amortization.value, paymentPeriod.value)
        );
    }, [rate]);

    const onChangeMortgate = (value: any) => {
        setAmount(value)
        setResult(
            calculateMortgage(value, rate, amortization.value, paymentPeriod.value)
        );
    }
    const onChangeRate = (value: any) => {
        setRate(value)
        setResult(
            calculateMortgage(amount, value, amortization.value, paymentPeriod.value)
        );
    }

    const onChangeAmortization = (item: any) => {
        setAmotization(item);
        setResult(
            calculateMortgage(amount, rate, item.value, paymentPeriod.value)
        );
    }

    const onChangePaymentPeriod = (item: any) => {
        setPaymentPeriod(item);
        setResult(
            calculateMortgage(amount, rate, amortization.value, item.value)
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedCurrencyInput
                    label="Mortgage Amount"
                    value={amount}
                    minimumValue={minQuota}
                    maximumValue={maxQuota}
                    precision={0}
                    onTextChange={(text) => onChangeMortgate(text)} />
                <Slider
                    thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    minimumTrackTintColor="#816CEC"
                    maximumTrackTintColor="#816CEC"
                    value={amount}
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
                    minimumValue={0}
                    maximumValue={100}
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
                                onPress={() => { showApplyDialog(true) }} />
                        </View>
                    </View>
                </View>
                <ApplyDialog title={""} data={{
                    screen: "mortgage",
                    amount: amount,
                    amortization: amortization.value,
                    period: paymentPeriod.value,
                    rate: rate,
                    result: result
                }}
                    visible={applyDialogVisible}
                    onConfirm={() => {
                        showApplyDialog(false);
                    }}
                    onCancel={() => {
                        showApplyDialog(false);
                    }}
                    onError={(error: any) => {
                        showApplyDialog(false);
                        toast.show(error, {
                            type: "danger",
                            placement: "top",
                            duration: 2000,
                            animationType: "zoom-in",
                        });
                    }} />
            </View>
        </ SafeAreaView>
    )
}
