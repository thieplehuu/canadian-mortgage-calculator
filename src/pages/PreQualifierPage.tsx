import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedCurrencyInput } from "../components/OutlinedInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, moneyRound, moneyToNumber } from "../utils";
import { maxQuota, minQuota } from "../stores/initial";
import { API_URL } from "../constants/urls";

export default function PreQualifierPage() {

    const [amount, setAmount] = useState(160000);
    const [previewAmount, setPreviewAmount] = useState(0);
    const [year, setYear] = useState(30);
    const [rate, setRate] = useState();
    const [rates, setRates] = useState();
    const [gdsv, setGdsv] = useState();
    const [loaded, setLoaded] = useState(false);
    const [minAmount] = useState(35000);
    const [maxAmount] = useState(300000);
    const [MaxMonthlyPayment, setMaxMonthlyPayment] = useState();
    const [request, setRequest] = useState(0);
    const [style, setStyle] = useState();
    const [dp, setDp] = useState();
    const [pp, setPp] = useState();
    const [isInput, setIsInput] = useState(false);
    const [tax, setTax] = useState(0);
    const [heatingCost, setHeatingCost] = useState(120);
    const [otherCost, setOtherCost] = useState(0);
    const [condoFee, setCondoFee] = useState(0);

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
            setRate(json.rate);
            setYear(json.mortization);
            setGdsv(json.gds);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //loadRates();
        calculateMortgage(calcMaxMonthlyPayment(amount),rate, year);
        updatePosition(amount);
        preview(amount);
    }, [tax, condoFee, heatingCost, otherCost]);

    useEffect(() => {
        let monthlyIncome = amount / 12;
        setTax(parseFloat((monthlyIncome * 0.04).toFixed(2)));
      }, [amount]);
    const updatePosition = (e: number) => {
    let val;
    setAmount(e);
    val = e;
    const min = minAmount ? minAmount : 0;
    const max = maxAmount ? maxAmount : 100;
    setStyle(Number(((val - min) * 100) / (max - min)));
    };

    const calculateMortgage = (mmp, r, t) => {
    let irba = r / 2;
    let irbaCan = Math.pow(1 + irba / 100, 2) - 1;
    let monthlyRate = Math.pow(1 + irbaCan, 1 / 12) - 1;
    let pvFactor = (1 - Math.pow(1 + monthlyRate, -12 * t)) / monthlyRate;
    let maxmort = mmp * pvFactor;
    let dp = (maxmort/100)*25;
    setDp(dp);
    setPp(dp+maxmort);
    setRequest(maxmort);
    };

    const preview = (e:any) => {
    setPreviewAmount(parseFloat(Separator(e, false)));
    };
    const previewFunc = (e) => {
    if (e.toString().length > 6) {
        return e / 1000000 + " M";
    } else {
        return e / 1000 + " K";
    }
    };

    const onChangeHouseHoldIncome = (value : any) => {
    calculateMortgage(calcMaxMonthlyPayment(value), rate, year);
    updatePosition(value);
    setAmount(value);
    preview(value);
    };

    const calcMaxMonthlyPayment = (value, newgds='') => {
    if(newgds==''){
        newgds = gdsv;
    }
    let monthlyIncome = value / 12;
    let gds = monthlyIncome * (newgds / 100);
    let newCondoFee = Number(condoFee / 2);
    let newHeatingCost = Number(heatingCost);
    let otherLoan = Number(otherCost);
    let newtax : number;
    if(typeof tax == "undefined"){
        newtax = parseFloat((monthlyIncome * 0.04).toFixed(2));
    }else{
        newtax = tax;
    }
    return gds - newtax - newHeatingCost - otherLoan - newCondoFee;
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedCurrencyInput
                    label="Household Income"
                    value={amount}
                    minimumValue={minQuota}
                    maximumValue={maxQuota}
                    precision={0}
                    onTextChange={(text) => onChangeHouseHoldIncome(text)} />

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
                    onTextChange={(text) => setTax(moneyToNumber(text))} 
                    minimumValue={null} maximumValue={null} 
                />
                    
                <OutlinedCurrencyInput
                    label="Code Fee"
                    value={condoFee}
                    precision={0}
                    onTextChange={(text) => setCondoFee(moneyToNumber(text))} minimumValue={null} maximumValue={null} />
                
                <OutlinedCurrencyInput
                    label="Hydro Fee"
                    value={heatingCost}
                    precision={0}
                    onTextChange={(text) => setHeatingCost(moneyToNumber(text))} minimumValue={null} maximumValue={null} />

                <OutlinedCurrencyInput
                    label="Loan Payments"
                    value={otherCost}
                    precision={0}
                    onTextChange={(text) => setOtherCost(moneyToNumber(text))} minimumValue={null} maximumValue={null} />

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
