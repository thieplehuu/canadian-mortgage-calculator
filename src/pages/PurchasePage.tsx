import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    ScrollView,
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedSelectInput, OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { moneyFormat, moneyToNumber, rateToString, moneyRound, calculateMortgage } from "../utils";
import { amortizations, maxQuota, minQuota, paymentPeriods } from "../stores/initial";
import { API_URL } from "../constants/urls";

export default function PurchasePage() {
    const [amount, setAmount] = useState(800000);
    const [dPayment, setDPayment] = useState([
        { rate: 0, perc: 20 },
        { rate: 0, perc: 25 },
        { rate: 0, perc: 30 },
        { rate: 0, perc: 35 },
    ]);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
    const [paymentPerYear, setPaymentPerYear] = useState("monthly");
    const [year, setYear] = useState(25);
    const [rate, setRate] = useState(5.50);
    const [DminAmount, setDMinAmount] = useState(null);
    const [dPerc, setDPerc] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [result, setResult] = useState(0);
    const [loaded, setLoaded] = useState(false);
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
                calculateMortgage(amount, json.rate.fixedrate5years, amortization.value, paymentPeriod.value)
            );
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadRates();

    }, []);


    const onChangeMortgate = (value: any) => {
        setAmount(value)
        setResult(
            calculateMortgage(value, rate, amortization.value, paymentPeriod.value)
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <ScrollView>
                <View style={AppStyle.StyleMain.container}>
                    <OutlinedTextInput
                        label="Purchase Price"
                        type="money"
                        value={moneyFormat(amount)}
                        onTextChange={(text) => setAmount(moneyToNumber(text))} />
                    <Slider
                        value={amount}
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
                        onValueChange={(value) => onChangeMortgate(value)}
                    />
                    <View style={AppStyle.Base.sliderLabelContainer}>
                        <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minQuota, true, true)}</Text></View>
                        <View style={{ alignSelf: "stretch" }}></View>
                        <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxQuota, true, true)}</Text></View>
                    </View>
                    <View style={AppStyle.TextStyle.Label}>
                        <Text style={AppStyle.TextStyle.h1}>Down Payment</Text>
                    </View>
                    <View style={styles.DownPaymentSection}>
                        <ScrollView horizontal={true}>
                            {
                                dPayment.map((item: any, index) => {
                                    return (
                                        <View key={item.percent} style={index == 0 ? styles.DownPaymentPanelActive : styles.DownPaymentPanel}>
                                            <Text style={styles.LabelPercentPanelActive}>{item.percent}{"%"}</Text>
                                            <View style={styles.HrPanelActive}></View>
                                            <Text style={styles.LabelPanelActive}>{"$"}{item.value}</Text>
                                        </View>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={AppStyle.TextStyle.Label}>
                        <Text style={AppStyle.TextStyle.h1}>Total Mortgage (Insurance $0)</Text>
                    </View>
                    <View style={AppStyle.TextStyle.Label}>
                        <Text style={AppStyle.TextStyle.text6}>$800,000*</Text>
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
                    <View style={{ height: 80, width: "100%" }}></View>
                </View>
            </ScrollView>
            <View style={AppStyle.StyleMain.bottomContainer}>
                <View style={AppStyle.StyleMain.footerContainer}>
                    <View style={AppStyle.StyleMain.footerLeftColumn}>
                        <Dropdown label="Biweekly Payment" value={paymentPeriod} items={paymentPeriods} onSelect={(item) => setPaymentPeriod(item)} />
                        <Text style={AppStyle.TextStyle.text6}>$3,291.88*</Text>
                    </View>
                    <View style={AppStyle.StyleMain.footerRightColumn}>
                        <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                            title="Begin Your Journey"
                            onPress={() => { }} />
                    </View>
                </View>
            </View>
        </ SafeAreaView >
    )
}

const styles = StyleSheet.create({
    DownPaymentSection: {
        height: 80, marginTop: 12
    },
    DownPaymentPanelActive: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: "#816CEC",
        marginRight: 12,
        borderRadius: 8
    },
    DownPaymentPanel: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginRight: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#cccccc"
    },
    HrPanelActive: {
        height: 0.5,
        borderWidth: 0.5,
        width: "100%",
        borderColor: "#ffffff"
    },
    HrPanel: {
        height: 0.5,
        borderWidth: 0.5,
        width: "100%",
        borderColor: "#000000"
    },
    LabelPanelActive: {
        fontSize: 13,
        padding: 8,
        color: "#ffffff"
    },
    LabelPanel: {
        fontSize: 13,
        padding: 8,
        color: "#000000"
    },
    LabelPercentPanelActive: {
        fontSize: 20,
        padding: 8,
        color: "#ffffff"
    },
    LabelPercentPanel: {
        fontSize: 20,
        padding: 8,
        color: "#000000"
    }
});