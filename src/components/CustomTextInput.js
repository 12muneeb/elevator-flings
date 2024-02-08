import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Platform,Keyboard
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import CustomText from '../components/CustomText';
import {appIcons} from '../assets';
import {colors, size, family} from '../utils';
import appStyles from '../screens/appStyles';
import Shadows from '../helpers/Shadows';

export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderColor,
    borderStyles,
    borderRadius = 5,
    TextInputStyling,
    hideLeftIcon = false,
    verticalLine,
    label,
    error,
    multiline,
    maxLength,
    margintop,
  } = props;

  const [errorFocusedIcon, setErrorFocusedIcon] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const renderErrorView = () => {
    return <CustomText text={error} style={styles.error} />;
  };
  useEffect(() => {
    if (error && error !== undefined) {
      setErrorFocusedIcon(!errorFocusedIcon);
    }
  }, [error]);
  return (
    <View
      style={{
        width: '100%',
      }}>
      <View
        style={[
          {
            alignSelf: 'center',
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius,
            paddingHorizontal: 12,
            paddingVertical: 2,
            height: multiline ? 150 : 50,
            marginVertical: 0,
            backgroundColor: colors.gray,
            height:55

          },
          // !isFocused ? { ...Shadows.shadow3 } : null,
          containerStyle,
        ]}>
        {!hideLeftIcon && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props?.leftIcon && (
              <Image
                source={props?.leftIcon}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor:
                    isFocused || errorFocusedIcon
                      ? colors.secondary
                      : colors.gray,
                  marginHorizontal: 8,
                }}
              />
            )}

            {verticalLine && (
              <Image
                source={appIcons.verticalLine}
                style={{
                  width: 5,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 8,
                  marginTop: 2,
                }}
              />
            )}
          </View>
        )}

        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: colors.border,
            },
            borderStyles,
          ]}>
          {label && isFocused && (
            <Text
              style={{
                position: 'absolute',
                bottom: Platform.OS == 'android' ? 44 : 27,
                left: -30,
                backgroundColor: colors.white,
                paddingHorizontal: 1,
                color: colors.black,
                ...appStyles.font13,
                ...appStyles.family_SofiaPro_Regular,
              }}>
              {label}
            </Text>
          )}
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={props?.placeholderColor || colors.black}
            style={[
              {
                flex: 1,
                color: colors.black,
                ...appStyles.font13,
                ...appStyles.family_SofiaPro_Regular,
              },
            ]}
            secureTextEntry={hidden}
            autoCapitalize="none"
            numberOfLines={multiline ? 10 : undefined}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            maxLength={maxLength}
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.eye : appIcons.eyeNot}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  marginRight: 8,
                  tintColor: colors.gray,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error ? renderErrorView() : null}
    </View>
  );
}
export function ProfileTextInput(props) {
  const {icon, color} = props;
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        // backgroundColor: colors.cardBackground,
      }}>
      <Image
        source={icon}
        style={{width: 15, height: 15, resizeMode: 'contain'}}
      />

      <TextInput
        onChange={props?.onchange}
        editable={props?.Editable}
        style={[styles.textInput2, props?.TextInputStyling]}
        value={props?.Value}
        keyboardType={props?.type}
        color={color}
        label={props.label}
        inputPadding={10}
        inputStyle={{fontSize: 16}}
        labelStyle={{color: colors.grey}}
        onSubmitEditing={props.onSubmitEditing}
        numberOfLines={props?.numberOfLines}
        multiline={props?.multiline}
        textAlignVertical={props?.multiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
}
export function CustomPhoneInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {
    label,
    verticalLine,
    hideLeftIcon = false,
    containerStyle,
    error,
  } = props;
  const [errorFocusedIcon, setErrorFocusedIcon] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const renderErrorView = () => {
    return <CustomText text={error} style={styles.error} />;
  };
  useEffect(() => {
    if (error && error !== undefined) {
      setErrorFocusedIcon(!errorFocusedIcon);
    }
  }, [error]);
  console.log('error', error);
  return (
    <View style={{width: '100%', marginTop: 18}}>
      {/* <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
        {placeholder}
      </Text> */}
      <View
        style={[
          {
            alignSelf: 'center',
            width: '87%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 5,
            paddingHorizontal: 7,
            paddingVertical: 5,
            height: 50,
            marginVertical: 0,
            borderWidth: 1,
            borderColor: isFocused ? colors.primary : colors.black,
          },
          // !isFocused ? { ...Shadows.shadow5 } : null,
          containerStyle,
        ]}>
        {/* {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: colors.iconcolor,
              marginHorizontal: 10,
              // marginTop: 5,
            }}
          />
        ) : null} */}

        {!hideLeftIcon && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props?.leftIcon && (
              <Image
                source={props?.leftIcon}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor:
                    isFocused || errorFocusedIcon
                      ? colors.secondary
                      : colors.gray,
                  marginHorizontal: 8,
                }}
              />
            )}

            {verticalLine && (
              <Image
                source={appIcons.verticalLine}
                style={{
                  width: 5,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 8,
                  marginTop: 2,
                }}
              />
            )}
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // borderLeftWidth: 1,
            // borderLeftColor: colors.border,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {label && isFocused && (
              <Text
                style={{
                  position: 'absolute',
                  bottom: Platform.OS == 'android' ? 41 : 27,
                  left: -35,
                  backgroundColor: colors.white,
                  paddingHorizontal: 1,
                  color: colors.black,
                  ...appStyles.font12,
                }}>
                {label}
              </Text>
            )}
            <TextInputMask 
        
              onFocus={handleFocus}
              onBlur={handleBlur}
              type={'cel-phone'}
              style={{
                flex: 1,
                color: colors.black,
                paddingLeft: 10,
                ...appStyles.font12,
              }}
              onChangeText={phoneNumberFormat => {
                let phoneNumber = phoneNumberFormat
                  .toString()
                  .replace(/\D+/g, '');
                props?.onChangePhoneInput(phoneNumberFormat, phoneNumber);
              }}
              maxLength={
                props?.formattedPhoneNumber.toString()?.startsWith('1') ? 18 : 19
              }
              options={
                props?.phoneNumber?.startsWith('1')
                  ? {
                      dddMask: '9 (999) 999 - ',
                    }
                  : {
                      dddMask: '(999) 999 - ',
                    }
              }
              {...props}
            />
            {props.verify && (
              <Text
                style={{
                  color: colors.red,
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                }}>
                Verify
              </Text>
            )}
          </View>
          {props.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.Visible : appIcons.Unvisible}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error ? renderErrorView() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  textInput: {
    height: 40,
    width: 250,
  },
  textInput2: {
    height: 50,
    width: '100%',
    color: 'red',
    ...appStyles.family_Jost_Regular,
    ...appStyles.font15,
    color: colors.background,
    marginHorizontal: -10,
  },
  focused: {
    backgroundColor: colors.black,
  },
  label: {
    marginTop: 10,
  },
  UnFocused: {
    borderWidth: 2,
    // borderColor: colors.secondary,
  },
  error: {
    color: colors.red,
    fontFamily: family.SofiaProMedium,
    fontSize: size.small,
    marginTop: 5,
    textAlign: 'left',
  },
});
