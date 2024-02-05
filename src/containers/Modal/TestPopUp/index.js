import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
  Keyboard,
} from 'react-native';
import CustomModal from '../../../components/CustomModal';
import appStyles from '../../../screens/appStyles';
import styles from './styles';

const {width} = Dimensions.get('screen');

const TestPopUp = ({
  isModalVisible = false,
  currentfocus,
  onSubmit = () => {},
  togglePopup = () => {},
}) => {
  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.viewstyle4}>
        <Text>test popup</Text>
      </View>
    </CustomModal>
  );
};

export default AddNewCard;
