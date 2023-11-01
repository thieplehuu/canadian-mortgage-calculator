import React, { useEffect, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Button, Text } from "@rneui/themed";
import { API_URL } from "../constants/urls";
import { Separator, calculateMortgage, moneyFormat } from "../utils";
import CurrencyInput from "react-native-currency-input";

export default function ConsolidationPage() {

    const [items, setValue] = useState([
        { key: "mv", title: 'Mortgage', amount: 500000, payment: 2500 },
        { key: "cv", title: 'Credit Cards', amount: 20000, payment: 600 },
        { key: "carv", title: 'Personal Loans', amount: 25000, payment: 750 },
        { key: "otherv", title: 'Car Loans', amount: 30000, payment: 900 },
    ]);
    const [monthly, setMonthly] = useState({ mm: 2500, cm: 600, carm: 750, otherm: 900 });
    const [totalDebt, setTotalDebt] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [newPayment, setNewPayment] = useState(0);
    const [totalDebtCalc, setTotalDebtCalc] = useState(null);
    const [rate, setRate] = useState(5.59);
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
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //loadRates();
        const totalDebtCalculated = Object.keys(items).reduce((sum, key) => sum + parseFloat(items[key].amount || 0), 0);
        setNewPayment(calculateMortgage(totalDebtCalculated, rate, 30, 'monthly'));
        setTotalDebt(totalDebtCalculated);
        setMonthlyPayment(Object.keys(items).reduce((sum, key) => sum + parseFloat(items[key].payment || 0), 0));
    }, [rate])

    const onChangeAmount = (key: string, value: any) => {

        items.map((item, i) => {
            if (item.key == key) {
                item.amount = value;
                items[i] = item;
            }
        });
        console.log(items);
        const totalDebtCalculated = Object.keys(items).reduce((sum, key) => sum + parseFloat(items[key].amount || 0), 0);
        setTotalDebtCalc(totalDebtCalculated);
        setValue(items);
        setNewPayment(calculateMortgage(totalDebtCalculated, rate, 30, 'monthly'));
        setTotalDebt(totalDebtCalculated);
        /*
        const name = key;
        const inValue = parseInt(Number(value.replace(/[^0-9.-]+/g, "")));
        const temp = { ...items, [name]: inValue };
        const totalDebtCalculated = Object.keys(temp).reduce((sum, key) => sum + parseFloat(temp[key].amount || 0), 0);
        setTotalDebtCalc(totalDebtCalculated)
        setValue(temp);
        setNewPayment(calculateMortgage(totalDebtCalculated, rate, 30, 'monthly'));
        setTotalDebt(totalDebtCalculated);
        */
    }

    const onChangePayment = (key: string, value: string) => {
        const name = key;
        const inValue = parseInt(Number(value.replace(/[^0-9.-]+/g, "")));
        const temp = { ...monthly, [name]: inValue };
        setMonthly(temp);
        setMonthlyPayment(Object.keys(temp).reduce((sum, key) => sum + parseFloat(temp[key].payment || 0), 0));
    }


    return (
        <View style={AppStyle.StyleMain.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text8}>Loans Total</Text>
                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text8}>Amount</Text>
                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text8}>Payment</Text>
                </View>
            </View>
            {
                items.map((item: any) => {
                    return (<View style={styles.row} key={item.key}>
                        <View style={styles.column}>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.inputContainer}>
                                <CurrencyInput
                                    style={styles.input}
                                    value={item.amount}
                                    prefix="$"
                                    delimiter="."
                                    separator=","
                                    precision={2}
                                    onChangeText={(text) => { onChangeAmount(item.key, text) }} />
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.inputContainer}>
                                <CurrencyInput
                                    style={styles.input}
                                    value={item.payment}
                                    prefix="$"
                                    delimiter="."
                                    separator=","
                                    precision={2}
                                    onChangeText={(text) => { onChangePayment(item.key, text) }} />
                            </View>
                        </View>
                    </View>)
                })
            }
            <View style={styles.row}>
                <View style={styles.column}>

                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text9}>{moneyFormat(totalDebt)}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text9}>{moneyFormat(monthlyPayment)}</Text>
                </View>
            </View>
            <View>
                <View style={styles.totalSavingPanel}>
                    <Text style={styles.totalSavingPanelTextLabel}>Monthly Savings of</Text>
                    <Text style={styles.totalSavingPanelTextValue}>{moneyFormat((monthlyPayment - newPayment)?.toFixed(2))}</Text>
                </View>
            </View>
            <View style={AppStyle.StyleMain.bottomContainer}>
                <View style={AppStyle.StyleMain.footerContainer}>
                    <View style={AppStyle.StyleMain.footerLeftColumn}>
                        <Text style={AppStyle.TextStyle.text5}>New Monthly Payment</Text>
                        <Text style={AppStyle.TextStyle.text6}>{moneyFormat(newPayment)}</Text>
                    </View>
                    <View style={AppStyle.StyleMain.footerRightColumn}>
                        <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                            title="Take Control"
                            onPress={() => { }} />
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    column: {
        alignItems: 'flex-start',
        width: "32%",
        marginLeft: "1%",
        marginRight: "1%",
    },
    row: {
        flexDirection: 'row',
        marginTop: 12
    },
    inputContainer: {
        paddingLeft: 8,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "stretch",
        borderColor: "#cccccc"
    },
    input: {
        padding: 4,
    },
    totalSavingPanel: {
        marginTop: 32,
        alignSelf: "center",
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 48,
        paddingRight: 48,
        borderRadius: 8,
        maxWidth: "70%",
        backgroundColor: "#816CEC"
    },
    totalSavingPanelTextLabel: {
        color: "#ffffff",
        fontSize: 15,
    },
    totalSavingPanelTextValue: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "700"
    }
});
