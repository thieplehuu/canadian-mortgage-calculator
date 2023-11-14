import React, { FC, useEffect, useRef, useState } from 'react';
import {
    View,
    Animated,
    Easing,
    Text,
} from 'react-native';
import AppStyle from '../theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

interface Props {
    label: string;
    value: { label: string; value: string },
    items: Array<{ label: string; value: string }>;
    carretAnimated: boolean,
    onSelect: (item: { label: string; value: string }) => void;
}
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const PaymentDropdown: FC<Props> = ({ value, items, carretAnimated = false, onSelect }) => {

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
        <View>
            <Menu onSelect={value => console.log(`Selected number: ${value}`)}>
                <MenuTrigger>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1
                    }}>
                        <Text style={AppStyle.Base.label}>{value.label}</Text>
                        <View style={{ marginLeft: 12 }}>
                            {carretAnimated ? <AnimatedIcon name={"caretdown"} size={16} color="#4F4A45"
                                style={{ transform: [{ translateY }] }}
                            /> : <Icon name={"caretdown"} size={16} color="#4F4A45"
                            />
                            }
                        </View>
                    </View>
                </MenuTrigger>
                <MenuOptions customStyles={{ optionsContainer: { padding: 0 } }}>
                    {
                        items.map((item: any) => {
                            return (<MenuOption
                                style={{ padding: 0 }}
                                key={item.value}
                                value={item}
                                onSelect={() => {
                                    {
                                        onSelect(item);
                                    }
                                }}><View style={{ padding: 8, backgroundColor: item.value == value.value ? "#F1EFEF" : "white" }}><Text style={AppStyle.Base.label}>{item.label}</Text></View></MenuOption>)
                        })
                    }
                </MenuOptions>
            </Menu>
        </View>

    );
};

export default PaymentDropdown;