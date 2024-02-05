import React from 'react';
import {View, Dimensions} from 'react-native';

export default function MyDivider({
  height = 1,
  width = Dimensions.get('window').width - 40,
  backgroundColor = '#9E9F9F',
  style = {},
}) {
  return (
    <View
      style={{
        height: height,
        width,
        backgroundColor: backgroundColor,
        opacity: 0.5,
        ...style,
      }}
    />
  );
}
