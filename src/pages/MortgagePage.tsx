import React, {useEffect, useState} from 'react';
import AppStyle from '../theme';
import {View, Text, SafeAreaView} from 'react-native';
import {Button, Input, Slider} from '@rneui/themed';
import {
  OutlinedCurrencyInput,
  OutlinedSelectInput,
  PercentTextInput,
} from '../components/OutlinedInput';
import {
  moneyFormat,
  rateToString,
  moneyRound,
  calculateMortgage,
} from '../utils';
import {
  amortizations,
  inititalQuota,
  maxQuota,
  minQuota,
  paymentPeriods,
} from '../stores/initial';
import {API_URL} from '../constants/urls';
import {useToast} from 'react-native-toast-notifications';
import {ApplyDialog} from '../components/ApplyDialog';
import PaymentDropdown from '../components/PaymentDropdown';
import DropShadow from 'react-native-drop-shadow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function MortgagePage() {
  const [rate, setRate] = useState(0.0);
  const [amortization, setAmotization] = useState(amortizations[0]);
  const [amount, setAmount] = useState(inititalQuota);
  const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
  const [result, setResult] = useState(0);
  const [bottomSheetVisible, showBottomSheet] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState('KEYBOARD_HIDE');
  const toast = useToast();
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
      setRate(json.rate.fixedrate5years);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRates();
    setResult(
      calculateMortgage(
        inititalQuota,
        rate,
        amortization.value,
        paymentPeriod.value,
      ),
    );
  }, []);

  const onChangeMortgate = (value: any) => {
    setAmount(value);
    setResult(
      calculateMortgage(value, rate, amortization.value, paymentPeriod.value),
    );
  };
  const onChangeRate = (value: any) => {
    setRate(value);
    setResult(
      calculateMortgage(amount, value, amortization.value, paymentPeriod.value),
    );
  };

  const onChangeAmortization = (item: any) => {
    setAmotization(item);
    setResult(calculateMortgage(amount, rate, item.value, paymentPeriod.value));
  };

  const onChangePaymentPeriod = (item: any) => {
    setPaymentPeriod(item);
    setResult(calculateMortgage(amount, rate, amortization.value, item.value));
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
            label="Mortgage Amount"
            value={amount}
            precision={0}
            onTextChange={text => onChangeMortgate(text)}
            onLostFocus={value => {
              if (value < minQuota) {
                setAmount(minQuota);
                setResult(
                  calculateMortgage(
                    minQuota,
                    rate,
                    amortization.value,
                    paymentPeriod.value,
                  ),
                );
              }
              if (value > maxQuota) {
                setAmount(maxQuota);
                setResult(
                  calculateMortgage(
                    maxQuota,
                    rate,
                    amortization.value,
                    paymentPeriod.value,
                  ),
                );
              }
            }}
          />
          <Slider
            thumbStyle={{height: 16, width: 16, backgroundColor: '#816CEC'}}
            trackStyle={{height: 4, backgroundColor: 'transparent'}}
            minimumTrackTintColor="#816CEC"
            maximumTrackTintColor="#816CEC"
            value={amount}
            step={maxQuota / 1000}
            minimumValue={minQuota}
            maximumValue={maxQuota}
            thumbProps={{
              children: (
                <View style={AppStyle.Base.sliderThumbContainer}>
                  <View style={AppStyle.Base.sliderThumb} />
                </View>
              ),
            }}
            onValueChange={value => onChangeMortgate(value)}
          />
          <View style={AppStyle.Base.sliderLabelContainer}>
            <View style={{alignContent: 'flex-start'}}>
              <Text style={AppStyle.Base.label}>
                {moneyRound(minQuota, true, true)}
              </Text>
            </View>
            <View style={{alignSelf: 'stretch'}}></View>
            <View style={{alignContent: 'flex-end'}}>
              <Text style={AppStyle.Base.label}>
                {moneyRound(maxQuota, true, true)}
              </Text>
            </View>
          </View>
          <PercentTextInput
            label="Rates"
            value={rateToString(rate)}
            minimumValue={0}
            maximumValue={100}
            onTextChange={text => onChangeRate(text)}
          />

          <OutlinedSelectInput
            label="Amortization"
            value={amortization}
            items={amortizations}
            onSelect={item => onChangeAmortization(item)}
          />
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
                <PaymentDropdown
                  label="Biweekly Payment"
                  value={paymentPeriod}
                  items={paymentPeriods}
                  onSelect={(item: any) => onChangePaymentPeriod(item)}
                  carretAnimated={true}
                />
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
                  title="Apply Now"
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
          screen: 'mortgage',
          amount: amount,
          amortization: amortization.value,
          period: paymentPeriod.value,
          rate: rate,
          result: result,
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
    </SafeAreaView>
  );
}
