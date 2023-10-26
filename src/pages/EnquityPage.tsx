import React, { useState } from "react";
import AppStyle from '../theme';
import {
    View,
} from "react-native";
import { Button, Input, Slider, Text } from "@rneui/themed";
import { OutlinedTextInput } from "../components/OutlinedInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "../components/Dropdown";

export default function EnquityPage() {

    const [value, setValue] = useState(0);
    const [selected, setSelected] = useState(undefined);

    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
    ];
    const minValue = 100;
    const maxValue = 400;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={AppStyle.StyleMain.container}>
                <OutlinedTextInput
                    label="Property Value"
                    value={maxValue} />
                <OutlinedTextInput
                    label="Current Mortgage Balance"
                    value={maxValue} />

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
                            value={value}
                            onValueChange={(value) => setValue(value)}
                            thumbStyle={{ height: 16, width: 16, backgroundColor: '#816CEC' }}
                            trackStyle={{ height: 4, backgroundColor: 'transparent', borderRadius: 0 }}
                            minimumValue={30}
                            maximumValue={70}
                            minimumTrackTintColor="#57D9A3"
                            maximumTrackTintColor="#57D9A3"
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
                    <View style={{ alignContent: "flex-start" }}><Text>{minValue}{"k"}</Text></View>
                    <View style={{ alignSelf: "stretch" }}></View>
                    <View style={{ alignContent: "flex-end" }}><Text>{maxValue}{"k"}</Text></View>
                </View>
                <View style={AppStyle.TextStyle.Label}>
                    <Text style={AppStyle.TextStyle.text7}>$240,000*</Text>
                </View>

                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.footerContainer}>
                        <View style={AppStyle.StyleMain.footerLeftColumn}>
                            <Dropdown label="Biweekly Payment" data={data} onSelect={setSelected} />
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
