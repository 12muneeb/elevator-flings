import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { appIcons } from '../assets';
import { colors, size } from '../utils';
import CustomText from './CustomText';

const CTextfield = props => {
  const [color, setColor] = React.useState(colors.white);
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
    toggleSecure,
    activeOutlineColor
  } = props;

  const renderErrorView = () => {
    return <CustomText text={error} color={colors.red} size={size.small} />;
  };

  const renderInputView = () => {
    return (
      <View>
        <TextInput
          value={value}
          label={inputLabel}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          mode={mode}
          multiline={multiLine}
          numberOfLines={numberOfLines}
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
              onSurfaceVariant: colors?.white,
              placeholder: '#fff',
            },
          }}
          activeOutlineColor={activeOutlineColor}
          outlineColor={outlineColor}
          outlineStyle={{ borderRadius: 10 }}
          style={[styles.inputField, bgColor]}
          textColor={colors?.white}
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            setColor(colors.yellow);
          }}
          right={
            secureTextEntry && (
              <TextInput.Icon
                icon={secureTextEntry ? appIcons.eye : appIcons.eyeNot}
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

  const renderSelectionView = () => {
    return (
      <TouchableOpacity style={[{ justifyContent: 'center' }]} onPress={onPress}>
        <CustomText text={value ? value : placeholder} color={colors.white} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ ...inputContainerStyle }}>
      {type === 'view' ? renderSelectionView() : renderInputView()}
      {error ? renderErrorView() : null} 
    </View>
  );
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
    backgroundColor: colors.lightpurple,
    marginTop: 5,
    height: responsiveScreenHeight(6),
    color: colors.white,
  },
});
