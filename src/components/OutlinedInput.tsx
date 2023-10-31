import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC, useRef, useState } from "react";
import Dropdown from "./Dropdown";

interface TextInputProps {
    label: string;
    value: string;
    type: string;
    onTextChange: (text: string) => void;
}

const OutlinedTextInput: FC<TextInputProps> = ({ label, value, type, onTextChange, ...props }) => {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const refInput = useRef();
    const onSetEditing = (edit: boolean) => {
        value = value.replace(/%/g, "")
        console.log(value);
        setEditing(edit)
        setEditValue(value)
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
                {editing ? (<TextInput ref={refInput} value={editValue} onChangeText={(text) => onTextChange(text)} onBlur={() => onBlur()} />) : (<Text onPress={() => onSetEditing(true)}>{value}</Text>)}
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