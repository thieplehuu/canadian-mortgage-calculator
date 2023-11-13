import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { BottomSheet, Button, Slider, TooltipProps } from "@rneui/themed";
import { OutlinedCurrencyInput } from "../components/OutlinedInput";
import { Separator, moneyRound } from "../utils";
import { API_URL } from "../constants/urls";
import { useToast } from "react-native-toast-notifications";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ApplyDialog } from "../components/ApplyDialog";
import Tooltip from 'rn-tooltip';

export default function PreQualifierPage() {

    const [amount, setAmount] = useState(160000);
    const [year, setYear] = useState(30);
    const [rate, setRate] = useState(9.14);
    const [gdsv, setGdsv] = useState(50.00);
    const [loaded, setLoaded] = useState(false);
    const [minAmount] = useState(35000);
    const [maxAmount] = useState(300000);
    const [request, setRequest] = useState(0);
    const [style, setStyle] = useState();
    const [dp, setDp] = useState(0);
    const [pp, setPp] = useState(0);
    const [isInput, setIsInput] = useState(false);
    const [tax, setTax] = useState(5.55);
    const [heatingCost, setHeatingCost] = useState(120);
    const [otherCost, setOtherCost] = useState(0);
    const [condoFee, setCondoFee] = useState(0);
    const [bottomSheetVisible, showBottomSheet] = useState(false);
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
            setRate(json.lender.rate);
            setYear(json.lender.mortization);
            setGdsv(json.lender.gds);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadRates();
        calculateMortgage(calcMaxMonthlyPayment(amount), rate, year);
    }, [tax, condoFee, heatingCost, otherCost]);

    useEffect(() => {
        let monthlyIncome = amount / 12;
        setTax(parseFloat((monthlyIncome * 0.04).toFixed(2)));
    }, [amount]);

    const calculateMortgage = (mmp: any, r: any, t: any) => {
        let irba = r / 2;
        let irbaCan = Math.pow(1 + irba / 100, 2) - 1;
        let monthlyRate = Math.pow(1 + irbaCan, 1 / 12) - 1;
        let pvFactor = (1 - Math.pow(1 + monthlyRate, -12 * t)) / monthlyRate;
        let maxmort = mmp * pvFactor;
        let dp = (maxmort / 100) * 25;
        setDp(dp);
        setPp(dp + maxmort);
        setRequest(maxmort);
    };

    const onChangeHouseHoldIncome = (value: any) => {
        setAmount(value);
        calculateMortgage(calcMaxMonthlyPayment(value), rate, year);
    }

    const calcMaxMonthlyPayment = (value: any, newgds = -1) => {
        if (newgds == -1) {
            newgds = gdsv;
        }
        let monthlyIncome = value / 12;
        let gds = monthlyIncome * (newgds / 100);
        let newCondoFee = Number(condoFee / 2);
        let newHeatingCost = Number(heatingCost);
        let otherLoan = Number(otherCost);
        let newtax: number;
        if (tax == 0) {
            newtax = parseFloat((monthlyIncome * 0.04).toFixed(2));
        } else {
            newtax = tax;
        }
        return gds - newtax - newHeatingCost - otherLoan - newCondoFee;
    };

    const onSetTax = (text: string) => {
        let tax = 0;
        if (text != null) {
            tax = parseFloat(text);
        }
        setTax(tax)
    }

    const onSetCondoFee = (text: string) => {
        let fee = 0;
        if (text != null) {
            fee = parseFloat(text);
        }
        setCondoFee(fee)
    }

    const onSetHeatingCost = (text: string) => {
        let cost = 0;
        if (text != null) {
            cost = parseFloat(text);
        }
        setHeatingCost(cost)
    }

    const onSetOtherCost = (text: string) => {
        let cost = 0;
        if (text != null) {
            cost = parseFloat(text);
        }
        setOtherCost(cost)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <ScrollView>
                <View style={AppStyle.StyleMain.container}>
                    <OutlinedCurrencyInput
                        label="Household Income"
                        value={amount}
                        precision={0}
                        onTextChange={(text) => onChangeHouseHoldIncome(text)}
                        onLostFocus={(value) => {
                            if (value < minAmount) {
                                setAmount(minAmount);
                                calculateMortgage(calcMaxMonthlyPayment(minAmount), rate, year);
                            }
                            if (value > maxAmount) {
                                setAmount(maxAmount);
                                calculateMortgage(calcMaxMonthlyPayment(maxAmount), rate, year);
                            }
                        }} />

                    <Slider
                        thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                        trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                        minimumTrackTintColor="#816CEC"
                        maximumTrackTintColor="#816CEC"
                        value={amount}
                        onValueChange={(value) => onChangeHouseHoldIncome(value)}
                        step={5000}
                        minimumValue={minAmount}
                        maximumValue={maxAmount}
                    />
                    <View style={AppStyle.Base.sliderLabelContainer}>
                        <View style={{ alignContent: "flex-start" }}><Text>{moneyRound(minAmount, true, false)}</Text></View>
                        <View style={{ alignSelf: "stretch" }}></View>
                        <View style={{ alignContent: "flex-end" }}><Text>{moneyRound(maxAmount, true, true)}</Text></View>
                    </View>
                    <OutlinedCurrencyInput
                        label="Property Tax"
                        value={tax}
                        precision={2}
                        onTextChange={(text) => onSetTax(text)}
                        onLostFocus={(value: number) => { }}
                    />

                    <OutlinedCurrencyInput
                        label="Condo Fee"
                        value={condoFee}
                        precision={2}
                        onTextChange={(text) => onSetCondoFee(text)}
                        onLostFocus={(value: number) => { }}
                    />

                    <OutlinedCurrencyInput
                        label="Hydro Fee"
                        value={heatingCost}
                        precision={2}
                        onTextChange={(text) => onSetHeatingCost(text)}
                        onLostFocus={(value: number) => { }}
                    />

                    <OutlinedCurrencyInput
                        label="Loan Payments"
                        value={otherCost}
                        precision={2}
                        onTextChange={(text) => onSetOtherCost(text)}
                        onLostFocus={(value: number) => { }}
                    />
                </View>
            </ScrollView>
            <View style={AppStyle.StyleMain.bottomContainer}>
                <View style={AppStyle.StyleMain.footerContainer}>
                    <View style={AppStyle.StyleMain.footerLeftColumn}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[AppStyle.TextStyle.text5, { alignSelf: "flex-start" }]}>Maximum Mortgage</Text>
                            <Tooltip
                                width={250} height={60} withOverlay={false}
                                containerStyle={{ left: 50 }}
                                popover={<View><Text style={{ color: "white" }}>+ ${Separator(dp, true)} (20% Minimum Down Payment Required) = ${Separator(pp, true)}</Text></View>}>
                                <View style={{ marginLeft: 8 }}><MaterialIcon name="info-outline" color={"black"} size={18} /></View>
                            </Tooltip>
                        </View>
                        <Text style={AppStyle.TextStyle.text6}>${Separator(request, true)}*</Text>
                    </View>
                    <View style={AppStyle.StyleMain.footerRightColumn}>
                        <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                            title="Get Pre-Qualified"
                            onPress={() => { showBottomSheet(true) }} />
                    </View>
                </View>
            </View>
            <ApplyDialog
                visible={bottomSheetVisible}
                data={{
                    screen: "pq",
                    propertyTax: tax,
                    heatingCost: heatingCost,
                    otherCost: otherCost,
                    condoFee: condoFee,
                    requestAmount: request
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
