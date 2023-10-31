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
import OTPVerifyPage from './src/pages/OTPVerifyPage';
import HomePage from './src/pages/HomePage';
import MortgagePage from './src/pages/MortgagePage';
import PurchasePage from './src/pages/PurchasePage';
import RefinancePage from './src/pages/RefinancePage';
import ConsolidationPage from './src/pages/ConsolidationPage';
import PreQualifierPage from './src/pages/PreQualifierPage';
import EnquityPage from './src/pages/EnquityPage';
import store from './src/stores';
import { Provider } from 'react-redux';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <Provider store={store}><NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen options={{
          headerShown: false
        }} name="LoginPage" component={LoginPage} />
        <Stack.Screen name="OTPVerifyPage" component={OTPVerifyPage} />
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
        <Stack.Screen name="EnquityPage"
          component={EnquityPage}
          options={{ title: 'Enquity' }} />
      </Stack.Navigator>
    </NavigationContainer></Provider>
  );
}

export default App;
