import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ProfileImage from './ProfileImage';
import CustomText from './CustomText';
import {colors} from '../utils';
import {ASSETS_URL} from '../config/WebService';
import appStyles from '../screens/appStyles';
import {appImages} from '../assets';

const {width} = Dimensions.get('window');

const Chats = props => {
  const {item, currentUser} = props;
  const isMine = currentUser?.id == item?.sender_id ? true : false;

  return (
    <View
      style={{
        ...appStyles.w100,
        marginBottom: 15,
        marginTop: 5,
        alignItems: 'flex-end',
        flexDirection: isMine ? 'row-reverse' : 'row',
      }}>
      <ProfileImage
        name={'UserName'}
        size={20}
        innerAsset={item?.profile_image !== null ? false : true}
        imageUri={
          item?.profile_image !== null
            ? ASSETS_URL + item?.profile_image
            : appImages.testimage
        }
        viewStyle={{
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          borderWidth: 2,
          height: 30,
          width: 30,
          marginTop: 0,
          marginLeft: isMine ? 8 : 0,
          marginRight: isMine ? 0 : 8,
          marginBottom: 10,
        }}
        style={{
          height: 30,
          width: 30,
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          alignItems: isMine ? 'flex-end' : 'flex-start',
          top: 25,
        }}>
        <View
          style={{
            backgroundColor: isMine ? colors.primary : colors.secondary,
            borderRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: isMine ? 0 : 10,
            borderBottomLeftRadius: isMine ? 10 : 0,
            width: width - 160,
            padding: 10,
          }}>
          <Text style={{color: colors.white}}>{item.message}</Text>
        </View>
        <View
          style={{
            width: width - 160,
            flexDirection: isMine ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomText
              text={isMine ? 'You' : item?.full_name}
              style={styles.username}
            />
          </View>
          <View>
            <Text
              style={{
                color: colors.darkGray,
                ...appStyles.font12,
                ...appStyles.family_SofiaPro_Regular,
                marginVertical: 6,
              }}>
              {item?.createdAt}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  username: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginVertical: 5,
  },
});
