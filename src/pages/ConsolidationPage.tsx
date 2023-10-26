import React, { Component, useState } from "react";
import AppStyle from '../theme';
import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Button, Text } from "@rneui/themed";
import Dropdown from "../components/Dropdown";

export default function ConsolidationPage() {
    const datas = [
        { title: 'Mortgage', amount: '$600,000.00', payment: "$3,240.89" },
        { title: 'Credit Cards', amount: '$600,000.00', payment: "$3,240.89" },
        { title: 'Personal Loans', amount: '$600,000.00', payment: "$3,240.89" },
        { title: 'Car Loans', amount: '$600,000.00', payment: "$3,240.89" },
        { title: 'Other Debts', amount: '$600,000.00', payment: "$3,240.89" },
    ];
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
                datas.map((item: any) => {
                    return (<View style={styles.row} key={item.title}>
                        <View style={styles.column}>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.inputContainer}>
                                <Text>{item.amount}</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.inputContainer}>
                                <Text>{item.payment}</Text>
                            </View>
                        </View>
                    </View>)
                })
            }
            <View style={styles.row}>
                <View style={styles.column}>

                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text9}>$650,400.00</Text>
                </View>
                <View style={styles.column}>
                    <Text style={AppStyle.TextStyle.text9}>$4,940.00</Text>
                </View>
            </View>
            <View>
                <View style={styles.totalSavingPanel}>
                    <Text style={styles.totalSavingPanelTextLabel}>Monthly Savings of</Text>
                    <Text style={styles.totalSavingPanelTextValue}>$1,341.78*</Text>
                </View>
            </View>
            <View style={AppStyle.StyleMain.bottomContainer}>
                <View style={AppStyle.StyleMain.footerContainer}>
                    <View style={AppStyle.StyleMain.footerLeftColumn}>
                        <Text style={AppStyle.TextStyle.text5}>New Monthly Payment</Text>
                        <Text style={AppStyle.TextStyle.text6}>$3,291.88*</Text>
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
        padding: 12,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "stretch",
        borderColor: "#cccccc"
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
