import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ProfileImage from './ProfileImage';
import CustomText from './CustomText';
import {colors} from '../utils';
import NavService from '../helpers/NavService';
import {ASSETS_URL} from '../config/WebService';
import appStyles from '../screens/appStyles';
import {appImages} from '../assets';

function MessageList(props) {
  const {item} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => NavService.navigate('Chat', {groupInfo: item})}
      style={styles.mainCont}>
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
        <View style={styles.flexColumn}>
          <CustomText text={item?.name} style={styles.username} />
          <CustomText text={item?.last_message} style={styles.message} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MessageList;

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

  flexColumn: {
    ...appStyles.directionColumn,
  },

  profileImgView: {
    backgroundColor: "transparent",
    height: 35,
    width: 35,
    marginTop: 0
  },

  profileImg: {
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 35,
    width: 35
  },

  username: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginHorizontal: 12,
    textTransform: 'capitalize',
  },

  message: {
    color: colors.black,
    ...appStyles.font11,
    ...appStyles.family_SofiaPro_Regular,
    marginHorizontal: 12,
  },

  badge: {
    width: 15,
    height: 15,
    backgroundColor: colors.secondary,
    ...appStyles.justifyCenter,
    ...appStyles.alignCenter,
    borderRadius: 100,
    position: 'absolute',
    right: 8,
    top: 8,
  },

  badgeTitle: {
    color: colors.white,
    ...appStyles.font10,
    ...appStyles.family_SofiaPro_Regular,
  },
});
