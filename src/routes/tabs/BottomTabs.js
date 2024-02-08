import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/TabbarComponent';
import {colors} from '../../utils';

//Screens
import Home from '../../screens/Main/Home';


const Tab = createBottomTabNavigator();

export default UserAppStack = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: colors.gray},
          animation: 'simple_push',
          headerShown: false,
        }}
        tabBar={props => <TabBar {...props} />}
        initialRouteName={'Home'}>
        <Tab.Screen name="Home" component={Home} />
 
      </Tab.Navigator>
    </>
  );
};
