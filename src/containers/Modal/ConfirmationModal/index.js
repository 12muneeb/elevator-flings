import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Platform} from 'react-native';
import Img from '../../../components/Img';
import CustomModal from '../../../components/CustomModal';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import {colors} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import appStyles from '../../../screens/appStyles';
import NavService from '../../../helpers/NavService';
import CustomTextInput from '../../../components/CustomTextInput';
import {Formik} from 'formik';
import OutlineInput from '../../../components/OutlineInput';
import {logoutValidations} from '../../../utils/validation';
import {connect} from 'react-redux';
import {logoutCurrentUser} from '../../../redux/actions/authAction';

function ConfirmationModal(props) {
  const {
    isModalVisible = false,
    togglePopup = () => {},
    currentfocus,
    Title,
    SubTitle,
    verificationPopUp,
    confirmationPopUp,
    deleteProfileBtn,
    screenName,
    onPress,
    btnTitle,
  } = props;

  let passform = useRef(null);

  const onSubmit = async values => {
    onPress(values);
  };
  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <View style={[styles.flexRow, styles.subCont]}>
          <CustomText text={Title} style={styles.Title} />
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
        <View style={{paddingHorizontal: 10}}>
          <CustomText text={SubTitle} style={styles.subTitle} />
        </View>

        {verificationPopUp && (
          <CustomButton
            title="Done"
            onPress={() => {
              togglePopup();
            }}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.btnTitle}
          />
        )}

        {confirmationPopUp && (
          <View style={[styles.flexRow, [styles.bottomBtnsView]]}>
            <CustomButton
              title={btnTitle}
              buttonStyle={[styles.bottomBtn]}
              textStyle={styles.btnTitle}
              onPress={onPress}
            />
            <CustomButton
              title={'Cancel'}
              buttonStyle={[styles.bottomBtn, styles.cancelBtn]}
              textStyle={[styles.btnTitle, {color: colors.black}]}
              onPress={togglePopup}
            />
          </View>
        )}

        {deleteProfileBtn && (
          <View style={{paddingBottom: 23,width:"90%"}}>
            <Formik
              innerRef={passform}
              initialValues={{
                password: '',
              }}
              onSubmit={values => onSubmit(values)}
             >
              {({handleChange, values, handleSubmit, errors, resetForm}) => {
                return (
                  <View style={{marginTop: 20}}>
                    <OutlineInput
                      label="Password"
                      placeholder={'Password'}
                      leftIcon="lock"
                      value={values?.password}
                      onChangeText={handleChange('password')}
                      // error={errors?.password}
                      secureTextEntry
                      rightIcon="eye"
                      righticon="eye-off"
                      maxLength={30}
                    />
                    <TouchableOpacity
                      style={styles.submit}
                      activeOpacity={0.9}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.btnTitle}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
          </View>
        )}
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
  cont: {
    borderWidth: 0,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  submit: {
    backgroundColor: colors.primary,
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 13,
    height: 13,
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

  Title: {
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Medium,
    color: colors.black,
  },

  closeBtn: {
    position: 'absolute',
    right: 15,
    width: 20,
    height: 20,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
  },

  closeIcon: {
    width: 13,
    height: 13,
  },

  subTitle: {
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Regular,
    color: colors.black,
    marginVertical: 5,
    textAlign: 'justify',
  },

  buttonStyle: {
    width: 100,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  btnTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Medium,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
  },

  bottomBtnsView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    marginVertical: 20,
  },

  bottomBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
  },

  cancelBtn: {
    ...Shadows.shadow0,
    backgroundColor: 'transparent',
    borderColor: colors.black,
    borderWidth: 1,
  },

  submitBtn: {
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    ...Shadows.shadow0,
    backgroundColor: colors.lightGray,
    borderWidth: 0,
  },
});

function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const actions = {logoutCurrentUser};
export default connect(mapStateToProps, actions)(ConfirmationModal);
