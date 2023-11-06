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

interface Props {
    label: string;
    value: { label: string; value: string },
    items: Array<{ label: string; value: string }>;
    carretAnimated : boolean,
    onSelect: (item: { label: string; value: string }) => void;
}
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const Dropdown: FC<Props> = ({ value, label, items, carretAnimated = false, onSelect }) => {
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

    const startAnimation = (toValue : number) => {
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
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>

            <View>
                {carretAnimated ? <AnimatedIcon name={"caretdown"} size={16} color="#4F4A45"  
                    style={[styles.animatedContainer, { transform: [{ translateY }] }]}
                    onPress={() => showBottomSheet(true)}
                /> : <Icon name={"caretdown"} size={16} color="#4F4A45" 
                onPress={() => showBottomSheet(true)}/>
            }
            </View>
            <BottomSheet modalProps={{}} isVisible={bottomSheetVisible}>
                <View>
                    <View style={AppStyle.StyleMain.bottomSheetHeader}>
                        <Icon name={"close"} size={16} style={styles.icon} color="#4F4A45"
                            onPress={() => showBottomSheet(false)}
                        />
                    </View>
                    <View style={styles.dropdownContent}>
                        {
                            items.map((item: any) => {
                                return (
                                    <View key={item.value}><TouchableOpacity onPress={() => onItemPress(item)} style={styles.item}>
                                        <Text style={AppStyle.Base.label}>{item.label}</Text>
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

export default Dropdown;