import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors, family, size} from '../utils';
import appStyles from '../screens/appStyles';
import CustomText from './CustomText';

function OutlineInput(props) {
  const {
    label,
    leftIcon,
    rightIcon,
    placeholder,
    onChangeText,
    value,
    error,
    keyboardType,
    righticon,
    maxLength,
    defaultValue,
  } = props;

  useEffect(() => {
    if (error && error !== undefined) {
      setIsFocused(!isFocused);
    }
  }, [error]);

  const [isFocused, setIsFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const renderErrorView = () => {
    return <CustomText text={error} style={styles.error} />;
  };
  return (
    <View style={{marginTop: 13}}>
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        mode="outlined"
        label={label}
        placeholder={placeholder}
        contentStyle={{
          width: 220,
          alignItems: 'center',
          color: colors.black,
          ...appStyles.font13,
          ...appStyles.family_SofiaPro_Regular,
        }}
        style={{
          backgroundColor: colors.white,
          color: colors.black,
          ...appStyles.font13,
          ...appStyles.family_SofiaPro_Regular,
        }}
        secureTextEntry={props?.rightIcon ? !hidden : false}
        left={
          <TextInput.Icon
            icon={leftIcon}
            iconColor={isFocused ? colors.secondary : colors.darkGray}
            size={22}
          />
        }
        right={
          <TextInput.Icon
            icon={hidden ? rightIcon : righticon}
            iconColor={isFocused ? colors.secondary : colors.darkGray}
            size={22}
            onPress={() => setHidden(!hidden)}
          />
        }
        activeOutlineColor={colors.primary}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
        defaultValue={defaultValue}
      />
      {error ? renderErrorView() : null}
    </View>
  );
}

export default OutlineInput;

const styles = StyleSheet.create({
  error: {
    width: 330,
    color: colors.red,
    fontFamily: family.SofiaProMedium,
    fontSize: size.small,
    marginTop: 5,
    textAlign: 'left',
  },
});
