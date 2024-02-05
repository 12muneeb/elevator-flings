import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomModal from '../../../components/CustomModal';
import {colors} from '../../../utils';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import appStyles from '../../../screens/appStyles';

function AddModal(props) {
  const {isModalVisible = false, togglePopup = () => {}} = props;

  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <View style={[styles.flexRow, styles.subCont]}>
          <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
            <Img
              local
              src={appIcons.close}
              style={styles.closeIcon}
              tintColor={colors.primary}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Add New Event"
          onPress={() => {
            togglePopup();
            NavService.navigate('AddNewEvent');
          }}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.btnTitle}
        />
        <CustomButton
          title="Add New Property"
          onPress={() => {
            togglePopup();
            NavService.navigate('AddNewProperty');
          }}
          buttonStyle={styles.buttonStyle1}
          textStyle={styles.btnTitle}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  closeIcon: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  subCont: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
  },

  closeBtn: {
    position: 'absolute',
    right: 15,
  },

  closeIcon: {
    width: 13,
    height: 13,
  },

  buttonStyle: {
    width: '90%',
    height: 45,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonStyle1: {
    width: '90%',
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginBottom: 20,
  },

  btnTitle: {
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Medium,
  },
});

export default AddModal;
