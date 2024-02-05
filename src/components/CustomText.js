import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {family, colors} from '../utils';

const CustomText = ({
  text = '',
  size = 16,
  style = {},
  font = 'SofiaProLight',
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
}) => {
  const textInputStyles = style;
  const [textData, setTextData] = useState(text);

  useEffect(() => {
    if (expandable) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);

  const toggleExpandable = () => {
    if (textData.length == text.length) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  };

  const actionBtnLable =
    textData?.length == text?.length ? 'Show Less' : 'See more';
  return (
    <Text
      onPress={onPress ?? undefined}
      style={[
        {
          fontSize: size,
          color: color ?? colors.text,
          fontFamily: family[font],
          ...textInputStyles,
        },
      ]}>
      {textData}
      {expandable ? '  ' : ''}
      {expandable && (
        <Text
          onPress={toggleExpandable}
          style={{
            color: colors.notification,
            textDecorationLine: 'underline',
            fontFamily: family[font],
          }}>
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};

export default CustomText;
