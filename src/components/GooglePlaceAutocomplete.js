import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GEOCODE_API_KEY } from '../config/WebService';
import { colors, WP } from '../utils';
import appStyles from '../screens/appStyles';
import Img from './Img';
import { appIcons } from '../assets';

const { width } = Dimensions.get('screen');

const GooglePlaceAutocomplete = ({
  callback,
  wrapperStyles,
  inputStyles,
  placeholder,
  iconColor,
  label,
  title,
  titleStyle,
  titleViewstyle,
  titleText,
  backgroundColor,
  rightIcon,
  onDelete,
  index,
  image
}) => {
  const renderRightButton = () => {
    if (rightIcon) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onDelete(index)}
          style={{
            // top: getStatusBarHeight() + 1,
            position: 'absolute',
            // right: 10,
            width: 30,
            alignSelf: 'flex-end',
            marginLeft: '90%',
            alignItems: 'flex-end',
            height: 30,
            borderRadius: 10,
            backgroundColor: colors.secondary,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={rightIcon}
            style={{
              width: 12,
              height: 12,
              tintColor: colors.black,
            }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.geoLocationView, wrapperStyles]}>
      {/*       
      {title && (
          <View style={[{}, titleViewstyle]}>
            <Text style={{ color: 'black' }}>
              {titleText}
            </Text>
          </View>
        )} */}
      {image && (
        <Image
          source={image}
          style={{
            width: 40,
            height: 40, // Adjust the height as per your requirements
            resizeMode: 'contain',
            tintColor: colors.primary,
            marginRight: 8, // Added marginRight to create space between image and input
          }}
        />
      )}
      <GooglePlacesAutocomplete
        enableHighAccuracyLocation
        fetchDetails
        disableScroll
        backgroundColor
        rightIcon
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
        listViewDisplayed={false}
        onDelete={() => this.deletePoint(index)} // Add the onDelete prop

        placeholder={placeholder ? placeholder : 'Add Location'}
        placeholderTextColor={colors.black}
        onPress={(data, details = null) => {
          const { formatted_address, geometry } = details;
          callback(formatted_address, geometry, label);
        }}
        renderRightButton={renderRightButton} // Render the right button conditionally
        styles={{
          textInput: {
            borderRadius: 10,
            height: 50,
            // color: colors.primary,
            backgroundColor: backgroundColor,
            width: WP('100%'),
            right: 6,
            color: colors.black,
            ...appStyles.font13,
            ...appStyles.family_SofiaPro_Regular,
            paddingRight:20
          },
          description: { color: colors.black },
        }}
        textInputProps={{
          placeholderTextColor: colors.black,
        }}
        query={{
          key: GEOCODE_API_KEY,
          language: 'en',
        }}
      />
      <Img
        local
        src={appIcons.location}
        style={styles.locationIcon}
        resizeMode={"contain"}
      />
    </View>
  );
};

export default GooglePlaceAutocomplete;

const styles = StyleSheet.create({
  geoLocationView: {
    width: WP('90%'),
    marginTop: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    // height: 55,
    paddingHorizontal: 10,
    ...appStyles.directionRow,
    ...appStyles.alignCenter
  },
  textInput: {
    flex: 1,
    height: 55,
    color: colors.black,
    borderRadius: 10,
    backgroundColor: colors.card,
    width: width,
    ...appStyles.family_Jost_Regular,
  },

  locationIcon:{
    position:"absolute",
    width:18,
    height:18,
    right:10,
    top:18
  }
});
