import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { moneyToNumber, rateToNumber, rateToString } from "../utils";
import CurrencyInput from "react-native-currency-input";

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
                {editing ? (<TextInput ref={refInput} keyboardType='numeric' value={editValue} onChangeText={(text) => {
                    if (parseInt(text) < minimumValue) {
                        text = minimumValue.toString();
                    }
                    if (parseInt(text) > maximumValue) {
                        text = maximumValue.toString();
                    }
                    setEditValue(text)
                    onTextChange(text)

                }} onBlur={() => onBlur()} />) : (<Text onPress={() => onSetEditing(true)}>{value}</Text>)}
            </View>
        </View>
    )
};


interface CurrencyInputProps {
    label: string;
    value: number;
    type: string;
    minimumValue: number;
    maximumValue: number;
    precision: number;
    onTextChange: (text: string) => void;
}

const OutlinedCurrencyInput: FC<CurrencyInputProps> = ({ label, value, type, minimumValue = 0, maximumValue = Number.POSITIVE_INFINITY, precision, onTextChange, ...props }) => {
    const [newValue, setValue] = useState(value);
    const onBlur = () => {
        if (newValue < minimumValue) {
            setValue(minimumValue);
        }
        if (newValue > maximumValue) {
            setValue(maximumValue);
        }
    }
    return (
        <View style={AppStyle.Base.outlinedInputContainer}>
            <View style={AppStyle.Base.outlinedLabelContainer}>
                <Text style={AppStyle.Base.label}>{label}</Text>
            </View>
            <View style={AppStyle.Base.outlinedTextInput}>
                <CurrencyInput
                    prefix="$"
                    delimiter="."
                    separator=","
                    precision={precision}
                    value={newValue}
                    onChangeValue={(value) => {
                        setValue(value);
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

const OutlinedSelectInput: FC<SelectInputProps> = ({ value, label, items, onSelect, ...props }) => (
    <View style={AppStyle.Base.outlinedInputContainer}>
        <View style={AppStyle.Base.outlinedLabelContainer}>
            <Text style={AppStyle.Base.label}>{label}</Text>
        </View>
        <View style={AppStyle.Base.outlinedTextInput}>
            <Dropdown
                label={label}
                value={value}
                items={items}
                onSelect={(item) => onSelect(item)} />
        </View>
    </View>
);

export { OutlinedTextInput, OutlinedSelectInput, OutlinedCurrencyInput };