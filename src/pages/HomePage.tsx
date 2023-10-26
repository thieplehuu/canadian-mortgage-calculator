import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Button, Card, Image, ListItem } from '@rneui/themed';
import AppStyle from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import ContactForm from '../components/ContactForm';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {

    const [bottomSheetVisible, showBottomSheet] = useState(false);
    const navigation = useNavigation();
    const goto = async (page: string) => {
        navigation.navigate(page as never)
    }
    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: "#ffffff" }}>
            <ScrollView>
                <View>
                    <View style={AppStyle.StyleMain.row}>
                        <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#816CEC', '#F4ABED']} style={AppStyle.StyleMain.panelContent}>
                                <Text style={AppStyle.TextStyle.text1}>5.50%</Text>
                                <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                                <Text style={AppStyle.TextStyle.text2}>5 Years</Text>
                            </LinearGradient>
                        </Card>
                        <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.25, y: 0 }} colors={['#43C6AC', '#F8FFAE']} style={AppStyle.StyleMain.panelContent}>
                                <Text style={AppStyle.TextStyle.text1}>5.89%</Text>
                                <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                                <Text style={AppStyle.TextStyle.text2}>3 Years</Text>
                            </LinearGradient>
                        </Card>
                        <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#2193B0', '#6DD5ED']} style={AppStyle.StyleMain.panelContent}>
                                <Text style={AppStyle.TextStyle.text1}>6.40%</Text>
                                <Text style={AppStyle.TextStyle.text2}>Variable</Text>
                                <Text style={AppStyle.TextStyle.text2}>5 Year</Text>
                            </LinearGradient>
                        </Card>
                        <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EF629F', '#F5D8B3']} style={AppStyle.StyleMain.panelContent}>
                                <Text style={AppStyle.TextStyle.text1}>6.95%</Text>
                                <Text style={AppStyle.TextStyle.text2}>Prime</Text>
                                <Text style={AppStyle.TextStyle.text2}>Rate</Text>
                            </LinearGradient>
                        </Card>
                    </View >
                    <View style={AppStyle.StyleMain.row}>
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
                                            <Image style={sectionStyle.image} source={require("../../assets/images/image3.png")} />
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
                            }}><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#bfeeef', '#f4f8fd']} style={AppStyle.StyleMain.sectionContent}>
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
                    </View>
                </View >
            </ScrollView>
            <View style={AppStyle.StyleMain.bottomContainer}>
                <View style={AppStyle.StyleMain.stretch}>
                    <Button containerStyle={AppStyle.StyleMain.buttonContainer} buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
                        title="Contact"
                        onPress={() => showBottomSheet(true)} />
                </View>
            </View>
            <BottomSheet modalProps={{}} isVisible={bottomSheetVisible}>
                <View>
                    <View style={AppStyle.StyleMain.bottomSheetHeader}>
                        <Icon name={"close"} size={16}
                            onPress={() => showBottomSheet(false)}
                        />
                    </View>
                    <ContactForm />
                </View>
            </BottomSheet>
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
