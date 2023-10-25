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
import MortgageCalculatorPage from './src/pages/MortgageCalculatorPage';
import PurchasePage from './src/pages/PurchasePage';
import RefinancePage from './src/pages/RefinancePage';
import ConsolidationPage from './src/pages/ConsolidationPage';
import PreQualifierPage from './src/pages/PreQualifierPage';


const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
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
          component={MortgageCalculatorPage} 
          options={{ title: 'Mortgage Calculator' }}/>
        <Stack.Screen 
          name="PurchasePage" 
          component={PurchasePage} 
          options={{ title: 'Purchase' }}/>
        <Stack.Screen name="RefinancePage" 
          component={RefinancePage} 
          options={{ title: 'Refinance' }}/>
        <Stack.Screen name="ConsolidationPage" 
          component={ConsolidationPage} 
          options={{ title: 'Consolidation' }}/>
        <Stack.Screen name="PreQualifierPage" 
          component={PreQualifierPage} 
          options={{ title: 'Pre-Qualifier' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
