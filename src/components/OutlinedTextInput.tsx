import { Text, TextInput, View } from "react-native";
import AppStyle from "../theme";

const OutlinedTextInput = ({ label, ...props }) => (
    <View style={AppStyle.Base.outlinedInputContainer}>
        <View style={AppStyle.Base.outlinedLabelContainer}>
            <Text>{label}</Text>
        </View>
        <TextInput style={AppStyle.Base.outlinedTextInput} />
    </View>
);

export default OutlinedTextInput;