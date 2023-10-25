import React, { FC, ReactElement, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BottomSheet } from '@rneui/themed';
import AppStyle from '../theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [selected, setSelected] = useState(undefined);
    const [bottomSheetVisible, showBottomSheet] = useState(false);

    const toggleDropdown = (): void => {
        showBottomSheet(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        showBottomSheet(false);
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>

            <FontAwesome6 name={"caret-down"} size={16} 
                onPress={() => showBottomSheet(false)}
            />
            <BottomSheet modalProps={{}} isVisible={bottomSheetVisible}>
                <View>
                    <View style={AppStyle.StyleMain.bottomSheetHeader}>
                        <FontAwesome6 name={"caret-down"} size={16} 
                            onPress={() => showBottomSheet(false)}
                        />
                    </View>
                    <View style={styles.dropdownContent}>
                        {
                            data.map((item: any) => {
                                return (
                                    <View key={item.value}><TouchableOpacity onPress={() => onItemPress(item)} style={styles.item}>
                                        <Text>{item.label}</Text>
                                    </TouchableOpacity></View>
                                );
                            })
                        }
                    </View>
                </View>
            </BottomSheet>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        zIndex: 1,
        textAlign: "left",
        alignContent: "flex-start"
    },
    buttonText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 13,
        color: "#000000",
        textTransform: "uppercase",
        opacity: 0.5
    },
    icon: {
        marginRight: 10,
    },
    dropdownContent: {
        backgroundColor: "#ffffff",
        padding: 12
    },
    item: {
        marginTop: 8,
    }
});

export default Dropdown;