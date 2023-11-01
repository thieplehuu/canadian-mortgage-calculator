import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC, useState } from "react";
import { Separator, round2TwoDecimals } from "../utils";


interface InputProps {
    amount: number;
    value: { percent: number; rate: number };
    items: Array<{ percent: number; rate: number }>;
    onSelect: (index: number) => void;
}

const DownPaymentRadio: FC<InputProps> = ({ value, items, amount, onSelect, ...props }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ScrollView horizontal={true}>
            {
                items.map((item: any, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setSelectedIndex(index);
                            onSelect(index);
                        }} key={item.percent} style={index == selectedIndex ? styles.DownPaymentPanelActive : styles.DownPaymentPanel} >

                            <Text style={index == selectedIndex ? styles.LabelPercentPanelActive : styles.LabelPercentPanel}>{round2TwoDecimals(item.percent)}%</Text>
                            <View style={index == selectedIndex ? styles.HrPanelActive : styles.HrPanel}></View>
                            <Text style={index == selectedIndex ? styles.LabelPanelActive : styles.LabelPanel}>${Separator(amount * (item.percent / 100), true)}</Text>

                        </TouchableOpacity>
                    );
                })
            }
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    DownPaymentPanelActive: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: "#816CEC",
        marginRight: 8,
        borderRadius: 8
    },
    DownPaymentPanel: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        marginRight: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#cccccc"
    },
    HrPanelActive: {
        height: 0.5,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ffffff"
    },
    HrPanel: {
        height: 0.5,
        alignSelf: "stretch",
        width: "100%",
        backgroundColor: "#000000"
    },
    LabelPanelActive: {
        fontSize: 13,
        padding: 4,
        color: "#ffffff",
    },
    LabelPanel: {
        fontSize: 13,
        padding: 4,
        color: "#000000"
    },
    LabelPercentPanelActive: {
        fontSize: 18,
        padding: 4,
        color: "#ffffff"
    },
    LabelPercentPanel: {
        fontSize: 18,
        padding: 4,
        color: "#000000"
    }
});

export default DownPaymentRadio;

