// @app
// import * as React from 'react';
import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// @stack screens

import Login from '../../screens/Auth/Login';
import Signup from '../../screens/Auth/Signup';
import Otp from '../../screens/Auth/Otp';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import ResetPassword from '../../screens/Auth/ResetPassword/ResetPassword';
import PreLogin from '../../screens/AppStarter/PreLogin';
import CompleteProfile from '../../screens/Auth/CompleteProfile';
import Description from '../../screens/Auth/Description/Description';
import Descriptions from '../../screens/Auth/Descriptions';

const RootStack = createNativeStackNavigator();

const AuthNavigation = ({initialRoute}) => {
  return (
    <RootStack.Navigator
      initialRouteName={'PreLogin'}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        animation: 'slide_from_right',
        gestureEnabled: false,
      }}>
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="PreLogin"
        component={PreLogin}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Login"
        component={Login}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Signup"
        component={Signup}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Otp"
        component={Otp}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ResetPassword"
        component={ResetPassword}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CompleteProfile"
        component={CompleteProfile}
      />
       <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Description"
        component={Description}
      />
       <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Descriptions"
        component={Descriptions}
      />
    </RootStack.Navigator>
  );
};

export default AuthNavigation;
