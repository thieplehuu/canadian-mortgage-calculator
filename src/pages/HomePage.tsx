import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Button, Card, Image, ListItem } from '@rneui/themed';
import AppStyle from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import { ContactForm } from '../components/ContactForm';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { ContactDialog } from '../components/ContactDialog';

const HomePage = () => {

    const [isLoading, setLoading] = useState(false);
    const [rates, setRates] = useState({});
    const [bottomSheetVisible, showBottomSheet] = useState(false);
    const navigation = useNavigation();
    const toast = useToast();

    const loadRates = async () => {
        try {
            const response = await fetch('https://api.mortgagemadebetter.com/wp-json/mmb/v1/rate', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setRates(json.rate);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadRates();
    }, []);
    const goto = async (page: string) => {
        navigation.navigate(page as never)
    }
    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: "#ffffff" }}>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator style={{ alignSelf: "center" }} /></View>
            ) : (<><ScrollView>
                <View style={AppStyle.StyleMain.row}>
                    <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#816CEC', '#F4ABED']} style={AppStyle.StyleMain.panelContent}>
                            <Text style={AppStyle.TextStyle.text1}>{rates.fixedrate5years}%</Text>
                            <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                            <Text style={AppStyle.TextStyle.text2}>5 Years</Text>
                        </LinearGradient>
                    </Card>
                    <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.25, y: 0 }} colors={['#43C6AC', '#F8FFAE']} style={AppStyle.StyleMain.panelContent}>
                            <Text style={AppStyle.TextStyle.text1}>{rates.fixedrate3years}%</Text>
                            <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                            <Text style={AppStyle.TextStyle.text2}>3 Years</Text>
                        </LinearGradient>
                    </Card>
                    <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#2193B0', '#6DD5ED']} style={AppStyle.StyleMain.panelContent}>
                            <Text style={AppStyle.TextStyle.text1}>{rates.variablerate}%</Text>
                            <Text style={AppStyle.TextStyle.text2}>Variable</Text>
                            <Text style={AppStyle.TextStyle.text2}>5 Year</Text>
                        </LinearGradient>
                    </Card>
                    <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EF629F', '#F5D8B3']} style={AppStyle.StyleMain.panelContent}>
                            <Text style={AppStyle.TextStyle.text1}>{rates.primerate}%</Text>
                            <Text style={AppStyle.TextStyle.text2}>Prime</Text>
                            <Text style={AppStyle.TextStyle.text2}>Rate</Text>
                        </LinearGradient>
                    </Card>
                </View><View style={AppStyle.StyleMain.row}>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("MortgageCalculatorPage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fcdadb', '#f9f9fe']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Mortgage Calculator</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image1.png")} />
                                    </View>
                                </View>
                            </LinearGradient></TouchableOpacity>

                    </View>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("PurchasePage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fef1e1', '#f8fcfb']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Purchase</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image2.png")} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("RefinancePage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#b2d5fe', '#f7faff']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Refinance</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image3.png")} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("ConsolidationPage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e2d7f8', '#f7f5fd']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Consolidation</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image4.png")} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("PreQualifierPage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#bfeeef', '#f4f8fd']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Pre-Qualifier</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image5.png")} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={AppStyle.StyleMain.sectionContainer}>
                        <TouchableOpacity onPress={() => {
                            goto("EnquityPage");
                        }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#385A6447', '#F3D2F11F']} style={AppStyle.StyleMain.sectionContent}>
                                <View style={sectionStyle.columns}>
                                    <View style={sectionStyle.left}>
                                        <View style={sectionStyle.content}>
                                            <Text style={AppStyle.TextStyle.text3}>Enquity</Text>
                                            <Text style={AppStyle.TextStyle.text4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                        </View>
                                    </View>
                                    <View style={sectionStyle.right}>
                                        <Image style={sectionStyle.image} source={require("../../assets/images/image6.png")} />
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 80, width: "100%" }}>
                    </View>
                </View>
            </ScrollView>
                <View style={AppStyle.StyleMain.bottomContainer}>
                    <View style={AppStyle.StyleMain.stretch}>
                        <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
                            title="Contact"
                            onPress={() => showBottomSheet(true)} />
                    </View>
                </View>
                <ContactDialog
                    visible={bottomSheetVisible}
                    onConfirm={(message : string) => {
                        showBottomSheet(false);
                        toast.show(message, {
                            type: "success",
                            placement: "center",
                            duration: 2000,
                            animationType: "zoom-in",
                        });
                    }}
                    onError={(error: any) => {
                        showBottomSheet(false);
                        toast.show(error, {
                            type: "danger",
                            placement: "top",
                            duration: 2000,
                            animationType: "zoom-in",
                        });
                    }}                    
                    onClose={() => {
                        showBottomSheet(false);
                    }}
                />
            </>)}
        </SafeAreaView>
    );
};

export default HomePage;

const sectionStyle = StyleSheet.create({
    columns: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    left: {
        width: '50%'
    },
    right: {
        width: '50%'
    },
    content: {
        padding: 16
    },
    image: {
        width: "100%",
        height: "100%"
    }
})
