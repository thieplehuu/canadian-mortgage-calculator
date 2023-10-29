import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC } from "react";
import Dropdown from "./Dropdown";

interface TextInputProps {
    label: string;
    value: string;
    onTextChange: (text: string) => void;
}

const OutlinedTextInput: FC<TextInputProps> = ({ label, value, onTextChange, ...props }) => (
    <View style={AppStyle.Base.outlinedInputContainer}>
        <View style={AppStyle.Base.outlinedLabelContainer}>
            <Text style={AppStyle.Base.label}>{label}</Text>
        </View>
        <TextInput style={AppStyle.Base.outlinedTextInput} value={String(value)} onChangeText={(text) => onTextChange(text)} />
    </View>
);



interface SelectInputProps {
    label: string;
    value: { label: string; value: string };
    items: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}

const OutlinedSelectInput: FC<SelectInputProps> = ({ value, label, items, onSelect, ...props }) => (
    <View style={AppStyle.Base.outlinedInputContainer}>
        <View style={AppStyle.Base.outlinedLabelContainer}>
            <Text style={AppStyle.Base.label}>{label}</Text>
        </View>
        <View style={AppStyle.Base.outlinedTextInput}><Dropdown label={label} value={value} items={items} onSelect={(item) => onSelect(item)} /></View>
    </View>
);

export { OutlinedTextInput, OutlinedSelectInput };