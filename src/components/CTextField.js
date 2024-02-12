import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { appIcons } from '../assets';
import { colors, size } from '../utils';
import CustomText from './CustomText';
import appStyles from '../screens/appStyles';

const CTextfield = (props) => {
  const [color, setColor] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const {
    inputContainerStyle,
    inputLabel,
    type,
    onPress,
    error,
    value,
    placeholder,
    secureTextEntry,
    placeholderTextColor,
    mode,
    multiLine,
    numberOfLines,
    icon,
    iconColor,
    outlineColor,
    bgColor,
    keyboardType,
    activeOutlineColor,
    onChangeText,
    labelStyle,
  } = props;

  const toggleSecure = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const renderErrorView = () => {
    return <CustomText text={error} color={colors.red} size={size.small} />;
  };

  const renderInputView = () => {
    return (
      <View>
        <TextInput
          value={value}
          label={inputLabel}
          labelStyle={[
            labelStyle,
            isFocused && { color: colors.white },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          mode={mode}
          multiline={multiLine}
          numberOfLines={numberOfLines}

          keyboardType={keyboardType}
          onChangeText={onChangeText}
          left={
            icon && (
              <TextInput.Icon
                icon={icon}
                iconColor={iconColor}
                style={styles.leftIcon}
                size={responsiveFontSize(2.6)}
              />
            )
          }
          theme={{
            colors: {
              primary: isFocused ? colors.white : colors.lightpurple,
              text: isFocused ? colors.white : placeholderTextColor,
              placeholder: placeholderTextColor,
            },
          }}
          activeOutlineColor={activeOutlineColor}
          outlineColor={outlineColor}
          outlineStyle={{ borderRadius: 10 }}
          style={styles.inputField}
          textColor={colors?.white}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => {
            setColor(colors.yellow);
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          right={
            secureTextEntry && (
              <TextInput.Icon
                icon={isPasswordVisible ? appIcons.eye : appIcons.eyeNot}
                onPress={toggleSecure}
                size={responsiveFontSize(2.6)}
                style={styles.rightIcon}
              />
            )
          }
        />
        {error ? renderErrorView() : null}
      </View>
    );
  };

  return <View style={{ ...inputContainerStyle }}>{type === 'view' ? renderSelectionView() : renderInputView()}</View>;
};

export default CTextfield;

const styles = StyleSheet.create({
  leftIcon: {
    borderRightWidth: 1,
    borderRadius: 0,
    borderColor: colors.white,
    paddingRight: 8,
    marginTop: responsiveScreenHeight(1.4),
  },
  rightIcon: {
    marginTop: responsiveScreenHeight(1.4),
  },
  inputField: {
    marginTop: 5,
    height: responsiveScreenHeight(6),
    color: colors.white,
    backgroundColor: colors.lightpurple,
    color: colors.white,
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },
});
