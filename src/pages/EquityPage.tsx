import React, {useEffect, useState} from 'react';
import AppStyle from '../theme';
import {SafeAreaView, View} from 'react-native';
import {Button, Slider, Text} from '@rneui/themed';
import {OutlinedCurrencyInput} from '../components/OutlinedInput';
import {moneyFormat, moneyRound, round2TwoDecimals} from '../utils';
import {API_URL} from '../constants/urls';
import {useToast} from 'react-native-toast-notifications';
import {ApplyDialog} from '../components/ApplyDialog';
import DropShadow from 'react-native-drop-shadow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function EquityPage() {
  const [property, setProperty] = useState(1000000);
  const [mortgage, setMortgate] = useState(200000);
  const [remortgage, setReMortgate] = useState(0);
  const [equity, setEquity] = useState([]);
  const [ratev, setRatev] = useState(10.95);
  const [mortgatePercent, setMortgatePercent] = useState(0);
  const [reMortgatePercent, setReMortgatePercent] = useState(0);
  const [result, setResult] = useState(0);
  const [bottomSheetVisible, showBottomSheet] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState('KEYBOARD_HIDE');
  const toast = useToast();

  const remortgagemax = property * 0.8;
  const loadRates = async () => {
    try {
      const response = await fetch(API_URL + '/rate', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setRatev(json.lender.heloc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRates();
    caculator(property, mortgage, remortgage);
  }, []);

  const onChangeProperty = (value: any) => {
    setProperty(value);
    caculator(value, mortgage, remortgage);
  };

  const onChangeMortgate = (value: any) => {
    setMortgate(value);
    caculator(property, value, remortgage);
  };

  const onChangeReMortgate = (value: any) => {
    setReMortgate(value);
    caculator(property, mortgage, value);
  };

  const calculateEquity = (
    property: any,
    mortgage: any,
    rateValue: any,
    percentage: any,
  ) => {
    const perc = percentage / 100;
    const rate = rateValue / 100;
    const loan = property * perc - mortgage;
    const monthly = (loan * rate) / 12;
    const amount = {
      loan: loan,
      monthly: round2TwoDecimals(monthly),
    };
    if (monthly > 0) {
      return amount;
    }
  };

  const caculator = (
    property: number,
    mortgage: number,
    remortgage: number,
  ) => {
    //console.log(remortgage);
    const rates = [
      {rate: 3.99, perc: 65},
      {rate: 4.99, perc: 70},
      {rate: 6.99, perc: 75},
      {rate: 9.99, perc: 80},
      {rate: 11.99, perc: 85},
      {rate: 12.99, perc: 90},
    ];
    let arr: any[] = [];
    rates.forEach(rate => {
      let value = calculateEquity(property, mortgage, rate.rate, rate.perc);
      if (value && arr.length < 6) {
        arr.push(value);
      }
    });
    setEquity(arr);
    let x = remortgage;
    console.log(mortgage);
    console.log(remortgage);
    console.log(x);
    console.log(ratev);
    if (x > 0) {
      let result = (x * (ratev / 100)) / 12;
      console.log(ratev);
      setResult(result);
    }

    let mortgatePercent = (mortgage * 100) / property;
    setMortgatePercent(mortgatePercent);
    let reMortgatePercent = 80 - mortgatePercent;
    setReMortgatePercent(reMortgatePercent);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <KeyboardAwareScrollView
        onKeyboardWillShow={(frames: Object) => {
          setKeyboardStatus('KEYBOARD_SHOW');
        }}
        onKeyboardWillHide={(frames: Object) => {
          setKeyboardStatus('KEYBOARD_HIDE');
        }}
        onKeyboardDidShow={(frames: Object) => {
          setKeyboardStatus('KEYBOARD_SHOW');
        }}
        onKeyboardDidHide={(frames: Object) => {
          setKeyboardStatus('KEYBOARD_HIDE');
        }}>
        <View style={AppStyle.StyleMain.container}>
          <OutlinedCurrencyInput
            label="Property Value"
            value={property}
            precision={0}
            onTextChange={text => onChangeProperty(text)}
            onLostFocus={(value: number) => {}}
          />

          <OutlinedCurrencyInput
            label="Current Mortgage Balance"
            value={mortgage}
            precision={0}
            onTextChange={text => onChangeMortgate(text)}
            onLostFocus={(value: number) => {}}
          />

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: mortgatePercent.toString() + '%',
                alignItems: 'stretch',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'yellow',
                  height: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>

            <View
              style={{
                width: reMortgatePercent.toString() + '%',
                alignItems: 'stretch',
              }}>
              <Slider
                thumbStyle={{height: 16, width: 16, backgroundColor: '#816CEC'}}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                }}
                minimumTrackTintColor="#57D9A3"
                maximumTrackTintColor="#57D9A3"
                value={remortgage}
                onValueChange={value => onChangeReMortgate(value)}
                minimumValue={0}
                maximumValue={remortgagemax}
                step={5000}
                thumbProps={{
                  children: (
                    <View style={AppStyle.Base.sliderThumbContainer}>
                      <View style={AppStyle.Base.sliderThumb} />
                    </View>
                  ),
                }}
              />
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'stretch',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'red',
                  height: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: (mortgatePercent + 7).toString() + '%',
                alignItems: 'flex-end',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text>{moneyRound(mortgage, true, true)}</Text>
            </View>
            <View
              style={{
                width: reMortgatePercent.toString() + '%',
                alignItems: 'flex-end',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text>{moneyRound(remortgagemax, true, true)}</Text>
            </View>
          </View>

          <View style={AppStyle.StyleMain.row}>
            <View style={AppStyle.TextStyle.Label}>
              <Text style={{lineHeight: 30}}>Borrow:</Text>
            </View>
            <View style={[AppStyle.TextStyle.Label, {marginLeft: 12}]}>
              <Text style={AppStyle.TextStyle.text7}>
                {moneyFormat(remortgage)}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {keyboardStatus == 'KEYBOARD_HIDE' ? (
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
              <View style={AppStyle.StyleMain.footerLeftColumn}>
                <Text style={AppStyle.TextStyle.text5}>Monthly Payment</Text>
                <Text style={AppStyle.TextStyle.text6}>
                  {moneyFormat(result)}*
                </Text>
              </View>
              <View style={AppStyle.StyleMain.footerRightColumn}>
                <Button
                  containerStyle={[
                    AppStyle.StyleMain.buttonContainer,
                    {flex: 1},
                  ]}
                  buttonStyle={AppStyle.StyleMain.buttonStyle}
                  title="Secure Your Loan"
                  onPress={() => {
                    showBottomSheet(true);
                  }}
                />
              </View>
            </View>
          </DropShadow>
        </View>
      ) : (
        <View></View>
      )}
      <ApplyDialog
        visible={bottomSheetVisible}
        data={{
          screen: 'equity',
          property: property,
          currentmortgage: mortgage,
          loan: remortgage,
          monthly: (remortgage * ratev) / 12,
        }}
        onConfirm={(message: string) => {
          showBottomSheet(false);
          toast.show(message, {
            type: 'success',
            placement: 'center',
            duration: 2000,
            animationType: 'zoom-in',
          });
        }}
        onClose={() => {
          showBottomSheet(false);
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
      />
    </SafeAreaView>
  );
}
