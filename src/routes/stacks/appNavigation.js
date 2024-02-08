import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import UserAppStack from '../tabs/BottomTabs';
import Home from '../../screens/Main/Home';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="UserAppStack"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitleAllowFontScaling: true,
          animation: 'slide_from_right',
          gestureEnabled: false,
        }}>
        <Stack.Screen name="UserAppStack" component={UserAppStack} />
        <Stack.Screen name="Home" component={Home} />
       
      </Stack.Navigator>
   
    </>
  );
};

export default AppNavigation;
