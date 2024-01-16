import React, {useEffect, useState} from 'react';
import AppStyle from '../theme';
import {SafeAreaView, View} from 'react-native';
import {Button, Slider, Text} from '@rneui/themed';
import {
  OutlinedCurrencyInput,
  OutlinedSelectInput,
  PercentTextInput,
} from '../components/OutlinedInput';
import {StyleSheet} from 'react-native';
import {
  moneyFormat,
  rateToString,
  moneyRound,
  calculateMortgage,
  Separator,
} from '../utils';
import {
  amortizations,
  maxQuota,
  minQuota,
  paymentPeriods,
} from '../stores/initial';
import {API_URL} from '../constants/urls';
import DownPaymentRadio from '../components/DownPaymentRadio';
import {useToast} from 'react-native-toast-notifications';
import {ApplyDialog} from '../components/ApplyDialog';
import PaymentDropdown from '../components/PaymentDropdown';
import DropShadow from 'react-native-drop-shadow';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function PurchasePage() {
  const [amount, setAmount] = useState(800000);
  const [dPayment, setDPayment] = useState([
    {rate: 0, percent: 20},
    {rate: 0, percent: 25},
    {rate: 0, percent: 30},
    {rate: 0, percent: 35},
  ]);
  const [amortization, setAmotization] = useState(amortizations[0]);
  const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
  const [rate, setRate] = useState(5.59);
  const [DminAmount, setDMinAmount] = useState(0);
  const [dPerc, setDPerc] = useState(0);
  const [insurance, setInsurance] = useState(0);
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
      //setResult(
      //    calculateMortgage(amount, json.rate.fixedrate5years, amortization.value, paymentPeriod.value)
      //);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadRates();
    setResult(
      calculateMortgage(
        amount - amount * (dPayment[dPerc].percent / 100),
        rate,
        amortization.value,
        paymentPeriod.value,
      ),
    );
    DownPaymentCalc(amount, DminAmount);
  }, [rate, DminAmount]);
  useEffect(() => {
    let value;
    if (amount <= 500000) {
      value = amount * 0.05;
    } else if (amount <= 999999) {
      value = (amount - 500000) * 0.1 + 25000;
    } else {
      value = amount * 0.2;
    }
    setDMinAmount(value);
  }, []);

  const downPaymentUpdate = (e: any) => {
    let value;
    if (e <= 500000) {
      value = e * 0.05;
    } else if (e <= 999999) {
      value = (e - 500000) * 0.1 + 25000;
    } else {
      value = e * 0.2;
    }
    setDMinAmount(value);
    return value;
  };

  const DownPaymentCalc = (value: any, dPayValue: any) => {
    let arr = [];
    if (value < 1000000) {
      arr = [
        {rate: 0.04, percent: (dPayValue / value) * 100},
        {rate: 0.031, percent: 10},
        {rate: 0.028, percent: 15},
        {rate: 0, percent: 20},
      ];
    } else {
      arr = [
        {rate: 0, percent: 20},
        {rate: 0, percent: 25},
        {rate: 0, percent: 30},
        {rate: 0, percent: 35},
      ];
    }
    setInsurance(arr[dPerc].rate);
    setResult(
      calculateMortgage(
        value -
          value * (arr[dPerc].percent / 100) +
          (value - dPayValue) * arr[dPerc].rate,
        rate,
        amortization.value,
        paymentPeriod.value,
      ),
    );
    setDPayment(arr);
  };

  const onChangeMortgate = (value: any) => {
    setAmount(value);
    setResult(
      calculateMortgage(
        value -
          value * (dPayment[dPerc].percent / 100) +
          (amount - DminAmount) * insurance,
        rate,
        amortization.value,
        paymentPeriod.value,
      ),
    );

    let dPaymentUpdatedValue = downPaymentUpdate(value);
    DownPaymentCalc(value, dPaymentUpdatedValue);
  };

  const onChangeRate = (value: any) => {
    setRate(value);
  };

  const onChangeAmortization = (item: any) => {
    setAmotization(item);
    setResult(
      calculateMortgage(
        amount -
          amount * (dPayment[dPerc].percent / 100) +
          (amount - DminAmount) * insurance,
        rate,
        item.value,
        paymentPeriod.value,
      ),
    );
  };

  const onChangePaymentPeriod = (item: any) => {
    setPaymentPeriod(item);
    setResult(
      calculateMortgage(
        amount - amount * (dPayment[dPerc].percent / 100),
        rate,
        amortization.value,
        item.value,
      ),
    );
  };

  const dRateUpdate = (index: number) => {
    setInsurance(dPayment[index].rate);
    setDPerc(index);
    setResult(
      calculateMortgage(
        amount -
          amount * (dPayment[index].percent / 100) +
          (amount - DminAmount) * dPayment[index].rate,
        rate,
        amortization.value,
        paymentPeriod.value,
      ),
    );
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
            label="Purchase Price"
            value={amount}
            precision={0}
            onTextChange={text => onChangeMortgate(text)}
            onLostFocus={value => {
              if (value < minQuota) {
                setAmount(minQuota);
                setResult(
                  calculateMortgage(
                    minQuota -
                      minQuota * (dPayment[dPerc].percent / 100) +
                      (amount - DminAmount) * insurance,
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
                    maxQuota -
                      maxQuota * (dPayment[dPerc].percent / 100) +
                      (amount - DminAmount) * insurance,
                    rate,
                    amortization.value,
                    paymentPeriod.value,
                  ),
                );
              }
            }}
          />
          <Slider
            value={amount}
            thumbStyle={{height: 16, width: 16, backgroundColor: '#816CEC'}}
            trackStyle={{height: 4, backgroundColor: 'transparent'}}
            minimumTrackTintColor="#816CEC"
            maximumTrackTintColor="#816CEC"
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
              <Text>{moneyRound(minQuota, true, true)}</Text>
            </View>
            <View style={{alignSelf: 'stretch'}}></View>
            <View style={{alignContent: 'flex-end'}}>
              <Text>{moneyRound(maxQuota, true, true)}</Text>
            </View>
          </View>
          <View style={AppStyle.TextStyle.Label}>
            <Text style={AppStyle.TextStyle.h1}>Down Payment</Text>
          </View>
          <View style={styles.DownPaymentSection}>
            <DownPaymentRadio
              items={dPayment}
              value={dPayment[0]}
              amount={amount}
              onSelect={index => dRateUpdate(index)}
            />
          </View>
          <View style={AppStyle.TextStyle.Label}>
            <Text style={AppStyle.TextStyle.h1}>
              Total Mortgage{' '}
              {insurance
                ? '(Insurance $' +
                  Separator((amount - DminAmount) * insurance, true) +
                  ')'
                : '(Insurance $0)'}
            </Text>
          </View>
          <View style={AppStyle.TextStyle.Label}>
            <Text style={AppStyle.TextStyle.text6}>
              $
              {Separator(
                amount -
                  amount * (dPayment[dPerc].percent / 100) +
                  (amount - DminAmount) * insurance,
                true,
              )}
            </Text>
          </View>
          <PercentTextInput
            label="Rates"
            minimumValue={0}
            maximumValue={100}
            value={rateToString(rate)}
            onTextChange={text => onChangeRate(text)}
          />

          <OutlinedSelectInput
            label="Amortization"
            value={amortization}
            items={amortizations}
            onSelect={item => onChangeAmortization(item)}
          />
          <View style={{height: 80, width: '100%'}}></View>
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
                  title="Begin Your Journey"
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
          screen: 'purchase',
          amount: amount,
          amortization: amortization.value,
          period: paymentPeriod.value,
          rate: rate,
          result: result,
          dpayment: dPayment,
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

const styles = StyleSheet.create({
  DownPaymentSection: {
    height: 80,
    marginTop: 12,
  },
});
