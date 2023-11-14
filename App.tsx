/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './src/pages/LoginPage';
import { OTPVerifyPage } from './src/pages/OTPVerifyPage';
import HomePage from './src/pages/HomePage';
import MortgagePage from './src/pages/MortgagePage';
import PurchasePage from './src/pages/PurchasePage';
import RefinancePage from './src/pages/RefinancePage';
import ConsolidationPage from './src/pages/ConsolidationPage';
import PreQualifierPage from './src/pages/PreQualifierPage';
import store from './src/stores';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'
import EquityPage from './src/pages/EquityPage';
import { MenuProvider } from 'react-native-popup-menu';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <ToastProvider
      offset={50}
      textStyle={{ fontSize: 16 }}
    >
      <Provider store={store}>
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginPage" screenOptions={{
              contentStyle: {
                backgroundColor: '#FFFFFF'
              }
            }}>
              <Stack.Screen options={{
                headerShown: false
              }} name="LoginPage" component={LoginPage} />
              <Stack.Screen name="OTPVerifyPage" component={OTPVerifyPage}
                options={{ title: 'Verification Code' }} />
              <Stack.Screen options={{
                headerShown: false
              }} name="HomePage" component={HomePage} />
              <Stack.Screen
                name="MortgageCalculatorPage"
                component={MortgagePage}
                options={{ title: 'Mortgage Calculator' }} />
              <Stack.Screen
                name="PurchasePage"
                component={PurchasePage}
                options={{ title: 'Purchase' }} />
              <Stack.Screen name="RefinancePage"
                component={RefinancePage}
                options={{ title: 'Refinance' }} />
              <Stack.Screen name="ConsolidationPage"
                component={ConsolidationPage}
                options={{ title: 'Consolidation' }} />
              <Stack.Screen name="PreQualifierPage"
                component={PreQualifierPage}
                options={{ title: 'Pre-Qualifier' }} />
              <Stack.Screen name="EquityPage"
                component={EquityPage}
                options={{ title: 'Equity' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </Provider>
    </ToastProvider>
  );
}

export default App;
