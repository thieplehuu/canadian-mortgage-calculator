import React, { useCallback, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
} from "react-native";
import { Button, Slider } from "@rneui/themed";
import { OutlinedTextInput } from "../components/OutlinedInput";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { moneyFormat, rateToString } from "../utils";
export default function MortgageCalculatorPage() {
    const [amount, setAmount] = useState(1000000);
    const [rate, setRate] = useState("1,75");
    const [amortization, setAmotization] = useState("");
    const [value, setValue] = useState(0);
    const [selected, setSelected] = useState({ label: "", value: "" });
    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Mortgage Amount"
                    value={moneyFormat(amount)}
                    onTextChange={(text) => setAmount(text)} />
                <Slider
                    value={value}
                    onValueChange={(value) => setValue(value)}
                    thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                    minimumTrackTintColor="#816CEC"
                    maximumTrackTintColor="#816CEC"
                    thumbProps={{
                        children: (
                            <View style={AppStyle.Base.sliderThumbContainer}>
                                <View style={AppStyle.Base.sliderThumb} />
                            </View>
                        ),
                    }}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text>{"$0"}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{"$2M"}</Text></View>
                </View>
                <OutlinedTextInput
                    label="Rates"
                    value={rateToString(rate)}
                    onTextChange={(text) => setRate(text)} />
                <OutlinedTextInput
                    label="Amortization"
                    value={amortization}
                    onTextChange={(text) => setAmotization(text)} />

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Biweekly Payment" data={data} onSelect={(item) => setSelected(item)} />
                            <Text style={AppStyle.TextStyle.text6}>$3,291.88*</Text>
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
