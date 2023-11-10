import { StyleSheet, Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC, useRef, useState } from "react";
import { moneyToNumber, rateToNumber, rateToString } from "../utils";
import CurrencyInput from "react-native-currency-input";
import { Dropdown } from "react-native-element-dropdown";
import Icon from 'react-native-vector-icons/AntDesign';

interface TextInputProps {
    label: string;
    value: string;
    type: string;
    minimumValue: number;
    maximumValue: number;
    onTextChange: (text: string) => void;
}

const OutlinedTextInput: FC<TextInputProps> = ({ label, value, type, minimumValue = 0, maximumValue = Number.POSITIVE_INFINITY, onTextChange, ...props }) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const refInput = useRef();
    const onSetEditing = (edit: boolean) => {
        if (type == "money") {
            setEditing(edit);
            setEditValue(moneyToNumber(value).toString());
        }
        if (type == "rate") {
            setEditing(edit);
            setEditValue(rateToNumber(value).toString());
        }
        setTimeout(() => {
            refInput.current.focus();
        }, 0)
    }

    const onBlur = () => {
        setEditing(false)
    }

    return (
        <View style={AppStyle.Base.outlinedInputContainer}>
            <View style={AppStyle.Base.outlinedLabelContainer}>
                <Text style={AppStyle.Base.label}>{label}</Text>
            </View>
            <View style={AppStyle.Base.outlinedTextInput}>
                {editing ? (<TextInput style={AppStyle.Base.label} ref={refInput} keyboardType='numeric' value={editValue} onChangeText={(text) => {
                    if (parseInt(text) < minimumValue) {
                        text = minimumValue.toString();
                    }
                    if (parseInt(text) > maximumValue) {
                        text = maximumValue.toString();
                    }
                    setEditValue(text)
                    onTextChange(text)

                }} onBlur={() => onBlur()} />) : (<Text style={AppStyle.Base.label} onPress={() => onSetEditing(true)}>{value}</Text>)}
            </View>
        </View>
    )
};


interface CurrencyInputProps {
    label: string;
    value: number;
    precision: number;
    onTextChange: (text: string) => void;
    onLostFocus: (value: number) => void;
}

const OutlinedCurrencyInput: FC<CurrencyInputProps> = ({ label, value, precision, onTextChange, onLostFocus, ...props }) => {
    const [editValue, setEditValue] = useState(value);
    const onBlur = () => {
        onLostFocus(editValue);
    }
    return (
        <View style={AppStyle.Base.outlinedInputContainer}>
            <View style={AppStyle.Base.outlinedLabelContainer}>
                <Text style={AppStyle.Base.label}>{label}</Text>
            </View>
            <View style={AppStyle.Base.outlinedTextInput}>
                <CurrencyInput
                    style={AppStyle.Base.label}
                    prefix="$"
                    delimiter=","
                    separator="."
                    precision={precision}
                    //minValue={minimumValue}
                    //maxValue={maximumValue}
                    value={value}
                    onChangeValue={(value: any) => {
                        //setValue(value);
                        setEditValue(value)
                        onTextChange(value);
                    }}
                    onBlur={() => onBlur()} />
            </View>
        </View>
    )
};

interface SelectInputProps {
    label: string;
    value: { label: string; value: any };
    items: Array<{ label: string; value: any }>;
    onSelect: (item: { label: string; value: any }) => void;
}

const OutlinedSelectInput: FC<SelectInputProps> = ({ value, label, items, onSelect, ...props }) => {
    return (
        <View style={AppStyle.Base.outlinedInputContainer}>
            <View style={AppStyle.Base.outlinedLabelContainer}>
                <Text style={AppStyle.Base.label}>{label}</Text>
            </View>
            <View style={AppStyle.Base.outlinedTextInput}>
                <Dropdown
                    iconStyle={{
                        width: 20,
                        height: 20,
                    }}
                    selectedTextStyle={AppStyle.Base.label}
                    itemTextStyle={AppStyle.Base.label}
                    data={items}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    renderRightIcon={() => (
                        <Icon
                            size={16} color="#4F4A45"
                            name="caretdown"
                        />
                    )}
                    onChange={item => {
                        onSelect(item)
                    }}
                />
            </View>
        </View>
    )
};

export { OutlinedTextInput, OutlinedSelectInput, OutlinedCurrencyInput };
