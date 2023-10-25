import React, { useCallback, useState } from "react";
import AppStyle from '../theme';
import {
    View,
    Text,
} from "react-native";
import { Button } from "@rneui/themed";
import OutlinedTextInput from "../components/OutlinedTextInput";
import RnRangeSlider from "rn-range-slider";
import Dropdown from "../components/Dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
export default function MortgageCalculatorPage() {
    const [value, setValue] = useState(0);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(100);
    const renderThumb = useCallback(() => <View style={AppStyle.Base.sliderThumb} />, []);
    const renderRail = useCallback(() => <View style={AppStyle.Base.sliderRail} />, []);
    const renderRailSelected = useCallback(() => <View style={AppStyle.Base.sliderRailSelected} />, []);
    const renderLabel = useCallback((value: any) => <View style={AppStyle.Base.sliderLabel}>
        <Text style={{
            fontSize: 16,
            color: '#fff',
        }}>{value}</Text>
    </View>, []);
    const renderNotch = useCallback(() => <View style={AppStyle.Base.sliderNotch} />, []);
    const handleValueChange = useCallback((low: any, high: any) => {
        setLow(low);
        setHigh(high);
    }, []);

    const [selected, setSelected] = useState(undefined);
    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.containerFlexStart}>
                <OutlinedTextInput
                    label="User name" />
                <RnRangeSlider
                    style={{ width: "100%", marginTop: 20 }}
                    min={0}
                    max={100}
                    step={1}
                    floatingLabel
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                    disableRange={true}
                />
                <View style={AppStyle.Base.sliderLabelContainer}>
                    <View style={{ alignContent: "flex-start" }}><Text>{"$0"}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{"$2M"}</Text></View>
                </View>
                <OutlinedTextInput
                    label="Rates" />
                <OutlinedTextInput
                    label="Amortization" />

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Select Item" data={data} onSelect={setSelected} />
                            <Text>$3,291.88*</Text>
                        </View>
                        <View style={AppStyle.StyleMain.footerRightColumn}>
                            <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonStyle}
                                title="Contact"
                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </View>
        </ SafeAreaView>
    )
}
