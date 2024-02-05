import React, {useRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import ReactNativePickerModule from 'react-native-picker-module';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import {size, colors} from '../utils';

export default function DropDownPicker({
  data = [],
  onSelected = () => {
    null;
  },
  onCancel = () => null,
  value = '',
  title = '',
  showLabel = false,
  labelFont = 'SofiaProBlack',
  dropdownTitleFont = 'SofiaProRegular',
  stateKey = '',
  arrowcolor = '',
  placeHolderColor = 'red',
  containerStyle = {},
  dropDownLabelAlignment = {},
}) {
  const pickerRef = useRef(null);
  return (
    <>
      {showLabel && (
        <CustomText
          text={title}
          style={dropDownLabelAlignment}
          font={labelFont}
          size={size.normal}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss()
          setTimeout(()=>{
            pickerRef.current?.show()
          },1000)
   
        }}
        activeOpacity={0.8}
        style={containerStyle}>
        <CustomText
          text={value ? value : title}
          size={15}
          color={placeHolderColor}
          font={dropdownTitleFont}
        />
        <IonIcons
          color={'black'}
          name="chevron-down-outline"
          size={size.large}
          onPress={() => {
            Keyboard.dismiss()
             pickerRef.current?.show();
          }}
        />
        <ReactNativePickerModule
          ref={pickerRef}
          value={value}
          title={title}
          items={data}
          titleStyle={{
            color: Platform.OS == 'android' ? colors.darkGray : colors.black,
          }}
          tintColor={Platform.OS == 'android' ? colors.darkGray : colors.black}
          itemStyle={{
            color: colors.darkGray,
          }}
          selectedColor={colors.darkGray}
          confirmButtonEnabledTextStyle={{
            color:
              Platform.OS == 'android' ? colors.background : colors.primary,
          }}
          confirmButtonDisabledTextStyle={{
            color: colors.border,
          }}
          cancelButtonTextStyle={{
            color: Platform.OS == 'android' ? colors.background : colors.black,
          }}
          confirmButtonStyle={{
            backgroundColor: colors.background,
          }}
          cancelButtonStyle={{
            backgroundColor: colors.background,
          }}
          contentContainerStyle={{
            backgroundColor: colors.background,
          }}
          onCancel={() => {
            Keyboard.dismiss;
            onCancel();
          }}
          onValueChange={value => {
            console.log(value, 'value');
            onSelected(stateKey, value);
            Keyboard.dismiss;
          }}
        />
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
