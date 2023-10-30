import React, { useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedTextInput } from "../components/OutlinedInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "../components/Dropdown";
import { moneyFormat, moneyToNumber, moneyRound } from "../utils";
import { paymentPeriods } from "../stores/initial";

export default function EnquityPage() {
    const [propertyValue, setPropertyValue] = useState(400000);
    const [currentMortgateBalance, setCurrentMortgateBalanceValue] = useState(255000);
    const [minCurrentMortgateValue, setMinCurrentMortgateValue] = useState(100000);
    const [maxCurrentMortgateValue, setMaxCurrentMortgateValue] = useState(300000);
    const [currentMortgateValue, setCurrentMortgateValue] = useState(120000);

    const [paymentPeriod, setPaymentPeriod] = useState({ label: "", value: "" });

    const onSetCurrentMortgateBalanceValue = (value: number) => {
        setCurrentMortgateValue(value);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Property Value"
                    value={moneyFormat(propertyValue)}
                    onTextChange={(text) => setPropertyValue(moneyToNumber(text))}
                />
                <OutlinedTextInput
                    label="Current Mortgage Balance"
                    value={moneyFormat(currentMortgateBalance)}
                    onTextChange={(text) => setCurrentMortgateBalanceValue(moneyToNumber(text))}
                />

                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: "30%",
                        alignItems: 'stretch',
                        alignContent: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            width: "100%", backgroundColor: "yellow",
                            height: 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}></View>
                    </View>

                    <View style={{
                        width: "40%",
                        alignItems: 'stretch',
                    }}>
                        <Slider
                            thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                            trackStyle={{ height: 4, backgroundColor: 'transparent', borderRadius: 0 }}
                            minimumTrackTintColor="#57D9A3"
                            maximumTrackTintColor="#57D9A3"
                            value={currentMortgateValue}
                            onValueChange={(value) => onSetCurrentMortgateBalanceValue(value)}
                            minimumValue={minCurrentMortgateValue}
                            maximumValue={maxCurrentMortgateValue}
                            step={maxCurrentMortgateValue / 1000}
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
                    <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minCurrentMortgateValue, true, true)}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxCurrentMortgateValue, true, true)}</Text></View>
                </View>

                <View style={AppStyle.StyleMain.row}>
                    <View style={AppStyle.TextStyle.Label}>
                        <Text style={{ lineHeight: 30 }}>Borrow:</Text></View>
                    <View style={[AppStyle.TextStyle.Label, { marginLeft: 12 }]}>
                        <Text style={AppStyle.TextStyle.text7}>{moneyFormat(currentMortgateValue)}</Text>
                    </View>
                </View>

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Biweekly Payment" value={paymentPeriod} items={paymentPeriods} onSelect={(item) => setPaymentPeriod(item)} />
                            <Text style={AppStyle.TextStyle.text6}>$3,291.88*</Text>
                        </View>
                        <View style={AppStyle.StyleMain.footerRightColumn}>
                            <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                                title="Secure Your Loan"
                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </View>
        </ SafeAreaView>
    )
}
