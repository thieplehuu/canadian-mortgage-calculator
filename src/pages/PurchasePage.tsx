import React, { Component, useCallback, useState } from "react";
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
import { moneyFormat, moneyToNumber, rateToString, moneyRound } from "../utils";
import { amortizations, maxQuota, minQuota, paymentPeriods } from "../stores/initial";

export default function PurchasePage() {
    const [rate, setRate] = useState("1,75");
    const [mortgateAmount, setMortgateAmount] = useState(0);
    const [amortization, setAmotization] = useState(amortizations[0]);
    const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);

    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];

    const currentDownPayment = { percent: '20', value: '200000' };

    const downPayments = [
        { percent: '20', value: '200000' },
        { percent: '25', value: '250000' },
        { percent: '30', value: '300000' },
        { percent: '35', value: '350000' },
        { percent: '40', value: '400000' },
        { percent: '45', value: '450000' },
        { percent: '50', value: '500000' },
        { percent: '55', value: '550000' },
        { percent: '60', value: '600000' },
        { percent: '65', value: '650000' },
        { percent: '70', value: '700000' },
        { percent: '75', value: '750000' },
        { percent: '80', value: '800000' },
        { percent: '85', value: '850000' },
        { percent: '90', value: '900000' },
        { percent: '95', value: '950000' },
        { percent: '100', value: '1000000' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <ScrollView>
                <View style={AppStyle.StyleMain.container}>
                    <OutlinedTextInput
                        label="Purchase Price"
                        value={moneyFormat(mortgateAmount)}
                        onTextChange={(text) => setMortgateAmount(moneyToNumber(text))} />
                    <Slider
                        value={mortgateAmount}
                        onValueChange={(value) => setMortgateAmount(value)}
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
                        <Text style={AppStyle.TextStyle.h1}>Down Payment</Text>
                    </View>
                    <View style={styles.DownPaymentSection}>
                        <ScrollView horizontal={true}>
                            {
                                downPayments.map((item: any) => {
                                    if (item.value == currentDownPayment.value) {
                                        return (
                                            <View key={item.percent} style={styles.DownPaymentPanelActive}>
                                                <Text style={styles.LabelPercentPanelActive}>{item.percent}{"%"}</Text>
                                                <View style={styles.HrPanelActive}></View>
                                                <Text style={styles.LabelPanelActive}>{"$"}{item.value}</Text>
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <View key={item.percent} style={styles.DownPaymentPanel}>
                                                <Text style={styles.LabelPercentPanel}>{item.percent}{"%"}</Text>
                                                <View style={styles.HrPanel}></View>
                                                <Text style={styles.LabelPanel}>{"$"}{item.value}</Text>
                                            </View>
                                        )
                                    }
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