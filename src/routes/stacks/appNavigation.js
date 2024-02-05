// @app
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// react-redux
import {useSelector} from 'react-redux';
// drawerComponentt
import UserAppStack from '../tabs/BottomTabs';
// @stack screens
import Home from '../../screens/Main/Home';
import Profile from '../../screens/Main/Profile/Profile';
import Properties from '../../screens/Main/Home/TabbarComponents/Properties/Properties';
import PastEvents from '../../screens/Main/PastEvents/PastEvents';
import PropertyDetail from '../../screens/Main/PropertyDetail/PropertyDetail';
import EventPosted from '../../screens/Main/Home/TabbarComponents/EventPosted/EventPosted';
import EventDetail from '../../screens/Main/EventDetail';
import EventUsersList from '../../screens/Main/EventUsersList';
import AddNewEvent from '../../screens/Main/AddNewEvent/AddNewEvent';
import AddNewProperty from '../../screens/Main/AddNewProperty/AddNewProperty';
import Message from '../../screens/Main/Message/Message';
import Chat from '../../screens/Main/Chat.js/Chat';
import Notification from '../../screens/Main/Notification/Notification';
import EditProperty from '../../screens/Main/EditProperty/EditProperty';
import EditEvent from '../../screens/Main/EditEvent/EditEvent';
import EditProfile from '../../screens/Main/EditProfile/EditProfile';
import ChangePassword from '../../screens/Main/ChangePassword/ChangePassword';
import AddModal from '../../containers/Modal/AddModal';
// redux actions
import {togglePropertyAddModal} from '../../redux/actions/appAction';

const Stack = createNativeStackNavigator();

const AppNavigation = ({initialRoute}) => {
  const showModal = useSelector(({appReducer}) => appReducer?.addModal);
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
        <Stack.Screen name="Properties" component={Properties} />
        <Stack.Screen name="EventPosted" component={EventPosted} />
        <Stack.Screen name="PastEvents" component={PastEvents} />
        <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="EventUsersList" component={EventUsersList} />
        <Stack.Screen name="AddNewEvent" component={AddNewEvent} />
        <Stack.Screen name="EditEvent" component={EditEvent} />
        <Stack.Screen name="AddNewProperty" component={AddNewProperty} />
        <Stack.Screen name="EditProperty" component={EditProperty} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
      <AddModal
        isModalVisible={showModal}
        togglePopup={() => togglePropertyAddModal(false)}
      />
    </>
  );
};

export default AppNavigation;
