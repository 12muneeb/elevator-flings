import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {appIcons} from '../assets';
import {colors} from '../utils';
import Img from './Img';
import appStyles from '../screens/appStyles';
import { useIsFocused } from '@react-navigation/native';

const Search = ({
  marginHorizontal,
  fetchSearchInfo,
  removeCurrentSearchInfo,
  searcIcon,
  placeHolder,
  containerStyle,
}) => {
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused()
  useEffect(() => {
    setSearch('');
    return () => {
      setSearch('');
    };
  }, [isFocused]);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          marginHorizontal: marginHorizontal ? 20 : 0,
          width: marginHorizontal ? '100%' : '99%',
          marginVertical: 15,
          height: 55,
        },
        containerStyle,
      ]}>
      <TextInput
        onChangeText={text => {
          if (text) {
            setSearch(text);
          } else {
            setSearch('');
            removeCurrentSearchInfo();
          }
        }}
        returnKeyType="search"
        placeholder={placeHolder ? placeHolder : 'Search'}
        value={search}
        placeholderTextColor={colors.gray}
        style={styles.textInput}
        maxLength={35}
        onSubmitEditing={() => fetchSearchInfo(search)}
      />

      {searcIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => fetchSearchInfo(search)}>
          <Img
            local
            style={{
              width: 18,
              height: 18,
              // marginRight: 10,
            }}
            src={appIcons.search}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    height: 45,
    marginHorizontal: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    alignSelf: 'center',
    // width: '100%',
  },
  textInput: {
    flex: 1,
    color: colors.black,
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: colors.gray,
  },
});
