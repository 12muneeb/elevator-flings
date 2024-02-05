import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
// import { ImageSource } from 'react-native-vector-icons/Icon';
// import { themes } from '../../theme/colors';
// import { CText } from '../../uiComponents'
// import GlobalStyle from '../../assets/stylings/GlobalStyle';
// import { icons } from '../../assets/imgs';
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import CustomText from './CustomText';
import { colors, size } from '../utils';
import { appIcons } from '../assets';

const CTextfield = props => {
  const [color, setColor] = React.useState(colors.white);
  const {
    inputContainerStyle,
    inputInnerContainerStyle,
    inputLabel,
    inputLabelStyle,
    inputSubLabel,
    inputSubLabelStyle,
    type,
    onPress,
    selectedCountry,
    textStyle,
    disabled,
    leftIconName,
    toggleLeftIconFunc,
    leftIconButtonStyle,
    iconStyle,
    inputErrorStyle,
    error,
    toggleRightIconFunc,
    rightIconButtonStyle,
    rightIconName,
    rightButton,
    style,
    value,
    countryView,
    countryViewLoading = false,
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
    return (
    //   <CText style={{ ...GlobalStyle.errorTextStyle, ...inputErrorStyle }}>
    //     {error}
    //   </CText>
    <CustomText text={error} color={colors.white} size={size.small} />
    );
  };
  const renderInputView = () => {
    return (
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
            colors:{
                onSurfaceVariant:colors?.white,
                placeholder:'#fff',
                
            },
            
        
        }}
        activeOutlineColor={activeOutlineColor}
        outlineColor={outlineColor}
        outlineStyle={{ borderRadius: 10 }}
        style={[styles.inputField, bgColor]}
        textColor={colors?.white}
        secureTextEntry={secureTextEntry}
        // onFocus={() => {
        //   setColor(colo)
        // }}
        right={
          secureTextEntry && (
            <TextInput.Icon
              icon={secureTextEntry ? appIcons.eye : appIcons.eyeNot}
            //   iconColor={themes['light'].colors.grey}
              onPress={toggleSecure}
              size={responsiveFontSize(2.6)}
              style={styles.rightIcon}
            />
          )
        }
      />
    );
  };
  const renderSelectionView = () => {
    return (
      <TouchableOpacity
        style={[
        //   { ...GlobalStyle.inputStyle, ...style },
          { justifyContent: 'center' },
        ]}
        onPress={onPress}>
        {/* <CText
          style={[
            { ...GlobalStyle.inputTextStyle, ...textStyle },
            !value && { color: themes['light'].colors.bgBlue },
          ]}>
          {value ? value : placeholder}
        </CText> */}
        <CustomText text= {value ? value : placeholder} color={colors.white}/>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{  ...inputContainerStyle, }}>
   
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
    // borderColor: themes['light'].colors.grey,
    borderColor:colors.white,
    paddingRight: 8,
    marginTop: responsiveScreenHeight(1.4)
  },
  rightIcon: {
    marginTop: responsiveScreenHeight(1.4)
  },
  inputField: {
    // backgroundColor: themes['light'].colors.white,
    backgroundColor:colors.lightpurple,
    marginTop: 5,
    height: responsiveScreenHeight(6),
    color:colors.white
    
  }
});