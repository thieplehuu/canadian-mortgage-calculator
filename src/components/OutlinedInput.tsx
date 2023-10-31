import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC, useState } from "react";
import Dropdown from "./Dropdown";

interface TextInputProps {
    label: string;
    value: string;
    onTextChange: (text: string) => void;
}

const OutlinedTextInput: FC<TextInputProps> = ({ label, value, onTextChange, ...props }) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const onSetEditing = (value: boolean) => {
        setEditing(value)
    }
    return (
        <View style={AppStyle.Base.outlinedInputContainer}>
            <View style={AppStyle.Base.outlinedLabelContainer}>
                <Text style={AppStyle.Base.label}>{label}</Text>
            </View>
            <View style={AppStyle.Base.outlinedTextInput}>
                {editing ? (<TextInput value={editValue} onChangeText={(text) => onTextChange(text)} />) : (<Text onPress={() => onSetEditing(true)}>{value}</Text>)}
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

export { OutlinedTextInput, OutlinedSelectInput };