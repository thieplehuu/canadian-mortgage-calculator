import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";
import { FC } from "react";

interface Props {
    label: string;
    value: string;
    onTextChange: (text: string) => void;
}

const OutlinedTextInput: FC<Props> = ({ label, value, onTextChange, ...props }) => (
    <View style={AppStyle.Base.outlinedInputContainer}>
        <View style={AppStyle.Base.outlinedLabelContainer}>
            <Text>{label}</Text>
        </View>
        <TextInput style={AppStyle.Base.outlinedTextInput} value={String(value)} onChangeText={(text) => onTextChange(text)} />
    </View>
);

export { OutlinedTextInput };