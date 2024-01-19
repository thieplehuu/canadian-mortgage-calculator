/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './src/pages/LoginPage';
import {OTPVerifyPage} from './src/pages/OTPVerifyPage';
import HomePage from './src/pages/HomePage';
import MortgagePage from './src/pages/MortgagePage';
import PurchasePage from './src/pages/PurchasePage';
import RefinancePage from './src/pages/RefinancePage';
import ConsolidationPage from './src/pages/ConsolidationPage';
import PreQualifierPage from './src/pages/PreQualifierPage';
import store from './src/stores';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import EquityPage from './src/pages/EquityPage';
import {MenuProvider} from 'react-native-popup-menu';
import SplashPage from './src/pages/SplashPage';
import ProfilePage from './src/pages/ProfilePage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <ToastProvider offset={50} textStyle={{fontSize: 16}}>
      <Provider store={store}>
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SplashPage"
              screenOptions={{
                headerBackTitleVisible: false,
                contentStyle: {
                  backgroundColor: '#FFFFFF',
                },
                headerLeft: ()=>(<Icon name="arrow-left" size={18}/>)
              }}>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="SplashPage"
                component={SplashPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="LoginPage"
                component={LoginPage}
              />
              <Stack.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{title: 'My Profile'}}
              />
              <Stack.Screen
                name="OTPVerifyPage"
                component={OTPVerifyPage}
                options={{title: 'Verification Code'}}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  title: 'Home Page',
                }}
                name="HomePage"
                component={HomePage}
              />
              <Stack.Screen
                name="MortgageCalculatorPage"
                component={MortgagePage}
                options={{title: 'Mortgage Payment Calculator'}}
              />
              <Stack.Screen
                name="PurchasePage"
                component={PurchasePage}
                options={{title: 'New Purchase Calculator'}}
              />
              <Stack.Screen
                name="RefinancePage"
                component={RefinancePage}
                options={{title: 'Refinance Calculator'}}
              />
              <Stack.Screen
                name="ConsolidationPage"
                component={ConsolidationPage}
                options={{title: 'Consolidation Calculator'}}
              />
              <Stack.Screen
                name="PreQualifierPage"
                component={PreQualifierPage}
                options={{title: 'Pre-Approval Calculator'}}
              />
              <Stack.Screen
                name="EquityPage"
                component={EquityPage}
                options={{title: 'Equity Loan Calculator'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MenuProvider>
      </Provider>
    </ToastProvider>
  );
}

export default App;
