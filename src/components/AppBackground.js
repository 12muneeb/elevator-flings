import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {appIcons, appImages} from '../assets';
import {ASSETS_URL} from '../config/WebService';
import {colors} from '../utils';
import NavService from '../helpers/NavService';
import appStyles from '../screens/appStyles';
import ProfileImage from './ProfileImage';
import CustomText from './CustomText';

function AppBackground({
  children,
  title,
  back = false,
  menu = false,
  nav = '',
  rightIcon = appIcons.bell,
  marginHorizontal = true,
  childrenContainerStyle = {},
  username,
  message = false,
  marginBottom,
  setting = false,
  settingsPress = () => {},
  profile = false,
  edit = false,
  rightIconNav = () => {
    NavService.navigate('Notification');
  },
  notification = false,
}) {
  const currentUser = useSelector(({authReducer}) => authReducer?.user);
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          marginTop: getStatusBarHeight() * 1.4,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: marginBottom ? marginBottom : 30,
        }}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              nav.length
                ? NavService.navigate(nav)
                : back
                ? NavService.goBack()
                : username
                ? null
                : NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              backgroundColor: menu ? colors.primary : 'transparent',
              borderRadius: menu ? 10 : 0,
              left: 8,
              width: username ? undefined : 45,
              height: 45,
              justifyContent: 'center',
              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.secondary,
                }}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.white,
                }}
              />
            )}

            {username && (
              <Text
                style={{
                  color: colors.black,
                  ...appStyles.font16,
                  ...appStyles.family_SofiaPro_Regular,
                  marginLeft: 20,
                }}>
                {username}
              </Text>
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                ...appStyles.font16,
                ...appStyles.family_SofiaPro_Regular,
                color: colors.black,
              }}>
              {title}
            </Text>
          </View>
          {message && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Message');
              }}
              style={{
                position: 'absolute',
                right: 55,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: "red"
              }}>
              <Image
                source={appIcons.message}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
              {/* <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.primary,
                  ...appStyles.justifyCenter,
                  ...appStyles.alignCenter,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 2,
                  top: 6,
                }}>
                <CustomText
                  text={1}
                  style={{
                    color: colors.white,
                    ...appStyles.font10,
                    ...appStyles.family_SofiaPro_Regular,
                  }}
                />
              </View> */}
            </TouchableOpacity>
          )}
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: colors.primary,
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 23,
                  height: 23,
                  borderRadius: 12,
                  resizeMode: 'contain',
                }}
              />
              {/* <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.secondary,
                  ...appStyles.justifyCenter,
                  ...appStyles.alignCenter,
                  borderRadius: 100,
                  position: 'absolute',
                  right: 5,
                  top: 6,
                }}>
                <CustomText
                  text={1}
                  style={{
                    color: colors.white,
                    ...appStyles.font10,
                    ...appStyles.family_SofiaPro_Regular,
                  }}
                />
              </View> */}
            </TouchableOpacity>
          )}

          {edit && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('EditProfile');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: colors.primary,
              }}>
              <Image
                source={appIcons.edit}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor: colors.darkGray,
                }}
              />
            </TouchableOpacity>
          )}

          {setting && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={settingsPress}
              style={{
                position: 'absolute',
                right: 60,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: colors.primary,
              }}>
              <Image
                source={appIcons.setting}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          )}
          {profile && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: colors.primary,
              }}>
              <ProfileImage
                name={'UserName'}
                size={20}
                innerAsset={currentUser?.profile_image !== null ? false : true}
                imageUri={
                  currentUser?.profile_image !== null
                    ? ASSETS_URL + currentUser?.profile_image
                    : appImages.testimage
                }
                viewStyle={{
                  backgroundColor: 'transparent',
                  borderColor: colors.secondary,
                  borderWidth: 2,
                  height: 33,
                  width: 33,
                  marginTop: 0,
                }}
                style={{
                  height: 33,
                  width: 33,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
        </>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
