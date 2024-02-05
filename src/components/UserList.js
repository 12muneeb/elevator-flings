import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from './CustomButton';
import ProfileImage from './ProfileImage';
import CustomText from './CustomText';
import ConfirmationModal from '../containers/Modal/ConfirmationModal';
import Shadows from '../helpers/Shadows';
import {ASSETS_URL} from '../config/WebService';
import {colors} from '../utils';
import {appImages} from '../assets';
import appStyles from '../screens/appStyles';

const UserList = props => {
  const {
    onPress,
    item,
    screenName,
    onBlockPress,
    unBlockPress,
    onRemoveUserPress,
    containerStyles,
  } = props;
  const [currentSelectedStatus, setCurrentSelectedStatus] = useState('');
  const [status, setStatus] = useState('pending');
  const [accepted, setAccepted] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const onPressRemove = () => {
    setisModalVisible(!isModalVisible);
    setTimeout(() => {
      if (currentSelectedStatus == 'block') {
        onBlockPress(currentSelectedStatus);
      } else if (currentSelectedStatus == 'unblock') {
        onBlockPress(currentSelectedStatus);
      } else if (currentSelectedStatus == 'remove') {
        onRemoveUserPress(item);
      }
    }, 850);
  };
  console.log('item', item);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onPress;
      }}
      style={[styles.mainCont, containerStyles]}>
      <View style={[styles.flexRow, {...appStyles.justifySpaceBetween}]}>
        <View style={styles.flexRow}>
          <ProfileImage
            name={item?.full_name}
            size={20}
            innerAsset={item?.profile_image !== null ? false : true}
            imageUri={
              item?.profile_image !== null
                ? ASSETS_URL + item?.profile_image
                : appImages.testimage
            }
            viewStyle={styles.profileImgView}
            style={styles.profileImg}
          />
          <CustomText text={item?.full_name} style={styles.username} />
        </View>

        {status === 'pending' ? (
          <View style={styles.flexRow}>
            {!accepted && (
              <CustomButton
                title={
                  screenName == 'Blocked Profiles'
                    ? 'Unblock'
                    : item?.status == 'Block'
                    ? 'Unblock'
                    : 'Block User'
                }
                onPress={() => {
                  if (screenName == 'Blocked Profiles') {
                    unBlockPress();
                  } else {
                    setCurrentSelectedStatus(
                      item?.status == 'Block' ? 'unblock' : 'block',
                    );
                    setisModalVisible(!isModalVisible);
                  }
                }}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.btnTitle}
              />
            )}

            {screenName !== 'Blocked Profiles' && (
              <CustomButton
                title={'Remove User'}
                onPress={() => {
                  setCurrentSelectedStatus('remove');
                  setisModalVisible(!isModalVisible);
                }}
                buttonStyle={[styles.buttonStyle, styles.rejectBtn]}
                textStyle={[styles.btnTitle, {color: colors.black}]}
              />
            )}

            {/* {accepted && (
              <CustomButton
                title={
                  screenName == 'Blocked Profiles'
                    ? 'Unblocked'
                    : 'User Blocked'
                }
                buttonStyle={styles.buttonStyle}
                textStyle={styles.btnTitle}
              />
            )} */}
          </View>
        ) : null}
      </View>
      <ConfirmationModal
        isModalVisible={isModalVisible}
        togglePopup={() => setisModalVisible(!isModalVisible)}
        Title={'Are you Sure?'}
        SubTitle={
          currentSelectedStatus == 'block'
            ? 'You want to block this user.'
            : currentSelectedStatus == 'unblock'
            ? 'You want to unblock this user.'
            : 'You want to remove this user.'
        }
        screenName={screenName}
        btnTitle={
          currentSelectedStatus == 'block'
            ? 'Block'
            : currentSelectedStatus == 'unblock'
            ? 'UnBlock'
            : 'Remove'
        }
        onPress={() => onPressRemove()}
        confirmationPopUp
      />
    </TouchableOpacity>
  );
};

export default UserList;

const styles = StyleSheet.create({
  mainCont: {
    // width: 300,
    ...appStyles.w_80,
    ...appStyles.justifyCenter,
    height: 60,
    backgroundColor: colors.lightGray,
    marginVertical: 5,
    borderRadius: 10,
    padding: 8,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  profileImgView: {
    backgroundColor: 'transparent',
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 30,
    width: 30,
    marginTop: 0,
  },

  profileImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  statusText: {
    color: 'black',
    alignSelf: 'center',
    ...appStyles.font14,
    marginRight: 10,
    textDecorationLine: 'underline',
    ...appStyles.family_Jost_Bold,
  },

  username: {
    color: colors.black,
    ...appStyles.font12,
    ...appStyles.family_SofiaPro_Medium,
    marginHorizontal: 5,
  },

  buttonStyle: {
    ...Shadows.shadow0,
    width: 70,
    height: 30,
    borderRadius: 5,
  },

  btnTitle: {
    ...appStyles.family_SofiaPro_Medium,
    ...appStyles.font10,
  },

  rejectBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.black,
    borderWidth: 1,
    marginLeft: 5,
  },
});
