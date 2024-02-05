import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import moment from 'moment';
import {colors} from '../utils';
import CustomText from './CustomText';
import appStyles from '../screens/appStyles';
import Img from './Img';
import {appIcons} from '../assets';

const {width} = Dimensions.get('screen');

function NotificationList({item}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={null}
      style={styles.mainCont}>
      <View style={styles.flexRow}>
        <View style={styles.flexColumn}>
          <View style={styles.flexRow}>
            <CustomText text={item?.title} style={styles.username} />
            <Img
              local
              src={appIcons.calendar}
              style={styles.icon}
              resizeMode={'contain'}
            />
            <CustomText
              text={moment(item?.created_at).format('YYYY-MM-DD')}
              style={styles.username}
            />
          </View>

          <CustomText text={item?.description} style={styles.message} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NotificationList;

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

  username: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Medium,
    marginLeft: 12,
    marginRight: 15,
    textTransform: 'capitalize',
    maxWidth: width * 0.44,
    marginVertical: 2,
  },

  message: {
    color: colors.black,
    ...appStyles.font11,
    ...appStyles.family_SofiaPro_Regular,
    marginHorizontal: 12,
    textTransform: 'capitalize',
    maxWidth: width * 0.44,
    marginVertical: 2,
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

  icon: {
    width: 15,
    height: 15,
  },
});
