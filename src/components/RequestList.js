import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ASSETS_URL} from '../config/WebService';
import CustomButton from './CustomButton';
import ProfileImage from './ProfileImage';
import CustomText from './CustomText';
import Shadows from '../helpers/Shadows';
import {colors} from '../utils';
import appStyles from '../screens/appStyles';

const RequestList = props => {
  const {onPress, item, screenName, handleAccept, handleReject} = props;
  const [status, setStatus] = useState('pending');
  const [accepted, setAccepted] = useState(false);

  if (status === 'rejected') {
    return null;
    // Return null to remove the card from rendering
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        onPress;
      }}
      style={styles.mainCont}>
      <View style={[styles.flexRow, {...appStyles.justifySpaceBetween}]}>
        <View style={styles.flexRow}>
          <ProfileImage
            name={item?.full_name}
            size={20}
            imageUri={ASSETS_URL + item?.profile_image}
            viewStyle={styles.profileImgView}
            style={styles.profileImg}
          />
          <CustomText text={item?.full_name} style={styles.username} />
        </View>

        {screenName == 'EventPosted' && status === 'pending' ? (
          <View style={styles.flexRow}>
            {!accepted && (
              <CustomButton
                title={'Accept'}
                onPress={handleAccept}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.btnTitle}
              />
            )}

            {!accepted && (
              <CustomButton
                title={'Reject'}
                onPress={handleReject}
                buttonStyle={[styles.buttonStyle, styles.rejectBtn]}
                textStyle={[styles.btnTitle, {color: colors.black}]}
              />
            )}

            {accepted && (
              <CustomButton
                title="Friend"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.btnTitle}
              />
            )}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RequestList;

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.w100,
    ...appStyles.justifyCenter,
    height: 60,
    backgroundColor: colors.lightGray,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  profileImgView: {
    backgroundColor: 'transparent',
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 35,
    width: 35,
    marginTop: 0,
  },

  profileImg: {
    height: 35,
    width: 35,
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
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Medium,
    marginHorizontal: 12,
  },

  buttonStyle: {
    ...Shadows.shadow0,
    width: 70,
    height: 30,
    borderRadius: 5,
  },

  btnTitle: {
    ...appStyles.family_SofiaPro_Medium,
    ...appStyles.font12,
  },

  rejectBtn: {
    backgroundColor: 'transparent',
    borderColor: colors.black,
    borderWidth: 1,
    marginLeft: 5,
  },
});
