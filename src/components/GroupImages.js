import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Img from '../components/Img';
import {ASSETS_URL} from '../config/WebService';
import {colors} from '../utils';

const GroupImages = ({images, style, onPress, customContStyle, roundImage}) => {
  const groupImages =
    images?.length > 0 && images?.length > 3
      ? images?.slice(0, 2)
      : images?.length < 3
      ? images
      : [];
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.center, style]}>
        <View style={[styles.containerImage, customContStyle]}>
          {groupImages?.length > 0
            ? groupImages?.map((image, index) => {
                return (
                  <Img
                    key={index + 1}
                    local={false}
                    src={ASSETS_URL + image?.profile_image}
                    style={[styles.item, roundImage]}
                  />
                );
              })
            : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupImages;

const styles = StyleSheet.create({
  center: {
    marginLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerImage: {
    flexDirection: 'row',
    marginLeft: 25,
  },

  item: {
    borderRadius: 100,
    borderColor: colors.white,
    borderWidth: 1,
    height: 20,
    width: 25,
    marginLeft: -17,
  },
});
