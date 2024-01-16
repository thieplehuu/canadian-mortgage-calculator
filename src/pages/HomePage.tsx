import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card} from '@rneui/themed';
import AppStyle from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {ContactDialog} from '../components/ContactDialog';
import DropShadow from 'react-native-drop-shadow';
import {Dimensions} from 'react-native';
import ScaleImage from '../components/ScaleImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [rates, setRates] = useState({
    fixedrate5years: '5.59',
    fixedrate3years: '6.29',
    variablerate: '6.30',
    primerate: '7.20',
  });
  const [menus, setMenus] = useState({
    pre_qualifier: {label: '', description: ''},
    purchase: {label: '', description: ''},
    mortgage_calculator: {label: '', description: ''},
    refinance: {label: '', description: ''},
    equity: {label: '', description: ''},
    consolidation: {label: '', description: ''},
  });
  const [bottomSheetVisible, showBottomSheet] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const windowWidth = Dimensions.get('window').width;

  const loadRates = async () => {
    try {
      const response = await fetch(
        'https://api.mortgagemadebetter.com/wp-json/mmb/v1/rate',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      setRates(json.rate);
      setMenus(json.home_text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);
  const goto = async (page: string) => {
    navigation.navigate(page as never);
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 12, backgroundColor: '#ffffff'}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator style={{alignSelf: 'center'}} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View
              style={[
                AppStyle.StyleMain.row,
                {
                  justifyContent: 'space-between',
                  flex: 1,
                  marginBottom: 12,
                  marginTop: 12,
                },
              ]}>
              <Text style={[AppStyle.TextStyle.text10, {marginLeft: 4}]}>
                Rates Updated On {moment().format('Do MMMM YYYY')}
              </Text>
              <Icon
                style={{alignSelf: 'flex-end', marginRight: 20}}
                size={24}
                color="#4F4A45"
                name="user-circle"
                onPress={() => {
                  goto('ProfilePage');
                }}
              />
            </View>

            <View style={AppStyle.StyleMain.row}>
              <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#816CEC', '#F4ABED']}
                  style={AppStyle.StyleMain.panelContent}>
                  <Text style={AppStyle.TextStyle.text1}>
                    {rates.fixedrate5years}%
                  </Text>
                  <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                  <Text style={AppStyle.TextStyle.text2}>5 Years</Text>
                </LinearGradient>
              </Card>
              <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1.25, y: 0}}
                  colors={['#43C6AC', '#F8FFAE']}
                  style={AppStyle.StyleMain.panelContent}>
                  <Text style={AppStyle.TextStyle.text1}>
                    {rates.fixedrate3years}%
                  </Text>
                  <Text style={AppStyle.TextStyle.text2}>Fixed rate</Text>
                  <Text style={AppStyle.TextStyle.text2}>3 Years</Text>
                </LinearGradient>
              </Card>
              <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#2193B0', '#6DD5ED']}
                  style={AppStyle.StyleMain.panelContent}>
                  <Text style={AppStyle.TextStyle.text1}>
                    {rates.variablerate}%
                  </Text>
                  <Text style={AppStyle.TextStyle.text2}>Variable</Text>
                  <Text style={AppStyle.TextStyle.text2}>5 Year</Text>
                </LinearGradient>
              </Card>
              <Card containerStyle={AppStyle.StyleMain.panelContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#EF629F', '#F5D8B3']}
                  style={AppStyle.StyleMain.panelContent}>
                  <Text style={AppStyle.TextStyle.text1}>
                    {rates.primerate}%
                  </Text>
                  <Text style={AppStyle.TextStyle.text2}>Prime</Text>
                  <Text style={AppStyle.TextStyle.text2}>Rate</Text>
                </LinearGradient>
              </Card>
            </View>
            <View style={AppStyle.StyleMain.row}>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('MortgageCalculatorPage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#fcdadb', '#f9f9fe']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.mortgage_calculator.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.mortgage_calculator.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/mortgage_calculator.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('PurchasePage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#fef1e1', '#f8fcfb']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.purchase.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.purchase.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/purchase.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('RefinancePage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#b2d5fe', '#f7faff']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.refinance.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.refinance.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/refinance.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('ConsolidationPage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#e2d7f8', '#f7f5fd']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.consolidation.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.consolidation.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/consolidation.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('PreQualifierPage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#bfeeef', '#f4f8fd']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.pre_qualifier.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.pre_qualifier.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/pre_qualifier.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={AppStyle.StyleMain.sectionContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goto('EquityPage');
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#385A6447', '#F3D2F11F']}
                    style={AppStyle.StyleMain.sectionContent}>
                    <View
                      style={[sectionStyle.columns, {height: windowWidth / 4}]}>
                      <View style={sectionStyle.left}>
                        <View style={sectionStyle.content}>
                          <Text style={AppStyle.TextStyle.text3}>
                            {menus.equity.label}
                          </Text>
                          <Text style={AppStyle.TextStyle.text4}>
                            {menus.equity.description}
                          </Text>
                        </View>
                      </View>
                      <View style={sectionStyle.imageBackground}>
                        <ScaleImage
                          style={{
                            alignSelf: 'flex-end',
                            height: windowWidth / 4,
                          }}
                          source={require('../../assets/images/equity.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={{height: 80, width: '100%'}}></View>
            </View>
          </ScrollView>
          <View style={AppStyle.StyleMain.bottomContainer}>
            <DropShadow
              style={{
                width: '100%',
                top: 0,
                shadowColor: '#DCDCDC',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 1.5,
                shadowRadius: 3,
              }}>
              <View style={AppStyle.StyleMain.footerContainer}>
                <Button
                  containerStyle={[
                    AppStyle.StyleMain.buttonContainer,
                    {width: '100%', marginTop: 8, marginBottom: 8},
                  ]}
                  buttonStyle={AppStyle.StyleMain.buttonFullwidthStyle}
                  title="Contact"
                  onPress={() => showBottomSheet(true)}
                />
              </View>
            </DropShadow>
          </View>
          <ContactDialog
            visible={bottomSheetVisible}
            onConfirm={(message: string) => {
              showBottomSheet(false);
              toast.show(message, {
                type: 'success',
                placement: 'center',
                duration: 2000,
                animationType: 'zoom-in',
              });
            }}
            onError={(error: any) => {
              showBottomSheet(false);
              toast.show(error, {
                type: 'danger',
                placement: 'top',
                duration: 2000,
                animationType: 'zoom-in',
              });
            }}
            onClose={() => {
              showBottomSheet(false);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomePage;

const sectionStyle = StyleSheet.create({
  columns: {
    position: 'relative',
  },
  left: {
    width: '60%',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    alignContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  image: {
    alignSelf: 'flex-end',
  },
});
