import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    View,
} from "react-native";
import { Button, Slider, Text } from "@rneui/themed";
import { OutlinedCurrencyInput, OutlinedSelectInput, OutlinedTextInput, PercentTextInput } from "../components/OutlinedInput";
import { moneyFormat, rateToString, moneyRound, calculateMortgage } from "../utils";
import { amortizations, maxQuota, minQuota, paymentPeriods } from "../stores/initial";
import { API_URL } from "../constants/urls";
import { useToast } from "react-native-toast-notifications";
import { ApplyDialog } from "../components/ApplyDialog";
import PaymentDropdown from "../components/PaymentDropdown";
import DropShadow from "react-native-drop-shadow";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RefinancePage() {

    const [homeValue, setHomeValue] = useState(400000);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
    const [rate, setRate] = useState(5.59);
    const [maxAmount, setMaxAmount] = useState(homeValue * 0.8);
    const [result, setResult] = useState(0);
    const [loan, setLoan] = useState(homeValue * 0.25);
    const [bottomSheetVisible, showBottomSheet] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState('KEYBOARD_HIDE');
    const minAmount = 5000;
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
            setResult(calculateMortgage(maxAmount, rate, amortization.value, paymentPeriod.value));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadRates();
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
        setLoan(value);
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
        setResult(calculateMortgage(maxAmount, rate, amortization.value, item.value));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <KeyboardAwareScrollView
                onKeyboardWillShow={(frames: Object) => {
                    setKeyboardStatus('KEYBOARD_SHOW');
                }} onKeyboardWillHide={(frames: Object) => {
                    setKeyboardStatus('KEYBOARD_HIDE');
                }} onKeyboardDidShow={(frames: Object) => {
                    setKeyboardStatus('KEYBOARD_SHOW');
                }} onKeyboardDidHide={(frames: Object) => {
                    setKeyboardStatus('KEYBOARD_HIDE');
                }}>
                <View style={AppStyle.StyleMain.container}>
                    <OutlinedCurrencyInput
                        label="Home Value"
                        value={homeValue}
                        precision={0}
                        onTextChange={(text) => onChangeHomeValue(text)}
                        onLostFocus={(value) => {
                            if (value < minQuota) {
                                setHomeValue(minQuota);
                                setResult(
                                    calculateMortgage(minQuota * 0.8, rate, amortization.value, paymentPeriod.value)
                                );
                                setMaxAmount(minQuota * 0.8);
                            }
                            if (value > maxQuota) {
                                setHomeValue(maxQuota);
                                setResult(
                                    calculateMortgage(maxQuota * 0.8, rate, amortization.value, paymentPeriod.value)
                                );
                                setMaxAmount(maxQuota * 0.8);
                            }
                        }} />
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
                    <PercentTextInput
                        label="Rates"
                        minimumValue={0}
                        maximumValue={100}
                        value={rateToString(rate)}
                        onTextChange={(text) => onChangeRate(text)} />

                    <OutlinedSelectInput
                        label="Amortization"
                        value={amortization}
                        items={amortizations}
                        onSelect={(item) => onChangeAmortization(item)} />


                </View>
            </KeyboardAwareScrollView>
            {(keyboardStatus == "KEYBOARD_HIDE") ? (<View style={AppStyle.StyleMain.bottomContainer}>
                <DropShadow style={{
                    width: "100%",
                    top: 0,
                    shadowColor: "gray",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                }}><View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <PaymentDropdown label="Biweekly Payment" value={paymentPeriod} items={paymentPeriods} onSelect={(item: any) => onChangePaymentPeriod(item)} carretAnimated={true} />
                            <Text style={AppStyle.TextStyle.text6}>{moneyFormat(result)}*</Text>
                        </View>
                        <View style={AppStyle.StyleMain.footerRightColumn}>
                            <Button containerStyle={[AppStyle.StyleMain.buttonContainer, { flex: 1 }]} buttonStyle={AppStyle.StyleMain.buttonStyle}
                                title="Take the Next Step"
                                onPress={() => { showBottomSheet(true) }} />
                        </View>
                    </View></DropShadow>
            </View>) : (<View></View>)}
            <ApplyDialog
                visible={bottomSheetVisible}
                data={{
                    screen: "refinance",
                    amount: homeValue,
                    amortization: amortization.value,
                    period: paymentPeriod.value,
                    rate: rate,
                    result: result,
                    loan: loan
                }}
                onConfirm={(message: string) => {
                    showBottomSheet(false);
                    toast.show(message, {
                        type: "success",
                        placement: "center",
                        duration: 2000,
                        animationType: "zoom-in",
                    });
                }}
                onClose={() => {
                    showBottomSheet(false);
                }}
                onError={(error: any) => {
                    showBottomSheet(false);
                    toast.show(error, {
                        type: "danger",
                        placement: "top",
                        duration: 2000,
                        animationType: "zoom-in",
                    });
                }} />
        </ SafeAreaView>
    )
}
