import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/TabbarComponent';
import {colors} from '../../utils';

//Screens
import Home from '../../screens/Main/Home';
import Profile from '../../screens/Main/Profile';
import AddModal from '../../containers/Modal/AddModal';

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
        <Tab.Screen name="tabBar4" component={AddModal} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};
