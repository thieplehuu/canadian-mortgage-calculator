/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import LoginPage from './src/pages/LoginPage';
import OTPVerifyPage from './src/pages/OTPVerifyPage';


const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen options={{
          headerShown: false
        }} name="LoginPage" component={LoginPage} />
        <Stack.Screen name="OTPVerifyPage" component={OTPVerifyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
