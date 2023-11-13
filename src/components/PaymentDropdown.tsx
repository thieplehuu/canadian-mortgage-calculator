import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import { BottomSheet } from '@rneui/themed';
import AppStyle from '../theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

interface Props {
    label: string;
    value: { label: string; value: string },
    items: Array<{ label: string; value: string }>;
    carretAnimated: boolean,
    onSelect: (item: { label: string; value: string }) => void;
}
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const PaymentDropdown: FC<Props> = ({ value, label, items, carretAnimated = false, onSelect }) => {
    const DropdownButton = useRef(null);
    const [selected, setSelected] = useState(value);
    const [bottomSheetVisible, showBottomSheet] = useState(false);


    const toggleDropdown = (): void => {
        showBottomSheet(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        showBottomSheet(false);
    };

    const animatedValue = useRef(new Animated.Value(0)).current;
    const [isTop, setIsTop] = useState(true);

    const startAnimation = (toValue: number) => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            setIsTop(!isTop);
        })
    }

    useEffect(() => {
        startAnimation(isTop ? 1 : 0);
    }, [isTop]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
        extrapolate: 'clamp'
    })

    return (
        <Dropdown
            selectedTextStyle={AppStyle.Base.label}
            itemTextStyle={AppStyle.Base.label}
            iconStyle={{
                width: 20,
                height: 20,
            }}
            data={items}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            keyboardAvoiding={true}
            renderRightIcon={() => (
                <View>
                    {carretAnimated ? <AnimatedIcon name={"caretdown"} size={16} color="#4F4A45"
                        style={[styles.animatedContainer, { transform: [{ translateY }] }]}
                    /> : <Icon name={"caretdown"} size={16} color="#4F4A45"
                    />
                    }
                </View>
            )}
            onChange={item => {
                onSelect(item)
            }}
        />
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
        color: "#4F4A45",
        textTransform: "uppercase",
        opacity: 0.5
    },
    icon: {
        marginRight: 10,
    },
    iconColor: {
        color: "#4F4A45"
    },
    dropdownContent: {
        backgroundColor: "#ffffff",
        padding: 12
    },
    item: {
        marginTop: 8,
        color: "#4F4A45"
    },
    animatedContainer: {
    }
});

export default PaymentDropdown;