import React, { FC, ReactElement, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BottomSheet } from '@rneui/themed';
import AppStyle from '../theme';
import Icon from 'react-native-ico-material-design';

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);
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

            <Icon
                name="close-button"
                group="material-design"
                height="16"
                width="16"
            />
            <BottomSheet modalProps={{}} isVisible={bottomSheetVisible}>
                <View>
                    <View style={AppStyle.StyleMain.bottomSheetHeader}>
                        <Icon
                            name="close-button"
                            group="material-design"
                            height="16"
                            width="16"
                            onPress={() => showBottomSheet(false)}
                        />
                    </View>
                    <View style={styles.dropdownContent}>
                        {
                            data.map((item: any) => {
                                return (
                                    <View key={item.key}><TouchableOpacity key={item.key} onPress={() => onItemPress(item)} key={item.key} style={styles.item}>
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