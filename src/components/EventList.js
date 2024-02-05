import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import Img from './Img';
import CustomText from './CustomText';
import appStyles from '../screens/appStyles';
import {colors} from '../utils';
import {appIcons} from '../assets';
import GroupImages from './GroupImages';
import NavService from '../helpers/NavService';
import {ASSETS_URL, GOOGLE_MAPS_URL} from '../config/WebService';
import {openLink} from '../helpers/BrowserUrl';

const {width} = Dimensions.get('window');

const EventList = props => {
  const {onPress, item, screenName} = props;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        source={
          item?.attachment
            ? {uri: ASSETS_URL + item?.attachment[0]?.attachment}
            : null
        }
        style={styles.property}
        imageStyle={{borderRadius: 10}}>
        {screenName != 'Properties' && (
          <View style={[styles.flexRow, styles.eventDetailCont]}>
            <CustomText
              text={`Time: ${moment(item?.start_datetime).format(
                'hh:mm A',
              )} to ${moment(item?.end_datetime).format('hh:mm A')}`}
              style={styles.time}
            />
            <View style={[styles.flexRow, {...appStyles.justifyCenter}]}>
              <CustomText text={`Event: ${item?.type}`} style={styles.time} />
              <GroupImages
                images={item?.coming_users}
                onPress={() =>
                  NavService.navigate('EventUsersList', {
                    coming_users: item?.coming_users,
                    event_id: item?.id,
                  })
                }
              />
            </View>
          </View>
        )}
      </ImageBackground>
      <View style={[styles.flexRow, styles.headingCont]}>
        <CustomText
          text={item?.title ? item?.title : item?.name}
          style={styles.heading}
        />
        <CustomText
          text={
            screenName == 'Properties'
              ? `${item?.capicity}, Capacity`
              : `Category: ${item?.category?.title}`
          }
          style={styles.content}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          openLink(GOOGLE_MAPS_URL + `${item?.longitude},${item?.latitude}`)
        }
        style={[styles.flexRow, styles.contentCont]}>
        <Img local src={appIcons.marker} style={styles.markerIcon} />
        <CustomText text={item?.location} style={styles.content} />
      </TouchableOpacity>
      <CustomText text={item?.description} style={styles.description} />
    </TouchableOpacity>
  );
};

export default EventList;

const styles = StyleSheet.create({
  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  flatListCont: {
    marginVertical: 15,
    paddingBottom: width * 0.25,
  },

  property: {
    ...appStyles.w100,
    height: 200,
    borderRadius: 10,
  },

  headingCont: {
    ...appStyles.justifySpaceBetween,
    marginTop: 15,
  },

  heading: {
    color: colors.black,
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

  contentCont: {
    marginTop: 10,
    marginBottom: 5,
  },

  markerIcon: {
    width: 12,
    height: 14,
    marginRight: 10,
  },

  content: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 3,
  },

  description: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 3,
    lineHeight: 20,
  },

  time: {
    color: colors.white,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 5,
  },

  eventDetailCont: {
    ...appStyles.justifySpaceBetween,
    paddingHorizontal: 10,
    marginTop: 170,
  },
});
