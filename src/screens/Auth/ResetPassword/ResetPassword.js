import React, { Component, createRef } from 'react';
import { View, Image, BackHandler, Keyboard } from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import OutlineInput from '../../../components/OutlineInput';
import NavService from '../../../helpers/NavService';
import { appIcons, appLogos } from '../../../assets/index';
import { resetValidations } from '../../../utils/validation';
import styles from './styles';
import { Formik } from 'formik';
import { resendPassword } from '../../../redux/actions/authAction';
import { connect } from 'react-redux';
import CustomText from '../../../components/CustomText';
import { colors, family, size } from '../../../utils';
import CTextfield from '../../../components/CTextField';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resetForm = createRef(null);
  }

  //BACK HANDLER
  handleBackButtonClick = () => {
    this?.props?.navigation.navigate('Login');
    return true;
  };

  componentDidMount() {
    BackHandler?.addEventListener(
      'hardwareBackPress',
      this?.handleBackButtonClick,
    );
    return () => {
      BackHandler?.removeEventListener(
        'hardwareBackPress',
        this?.handleBackButtonClick,
      );
    };
  }



  render() {
    const { password, confirmPassword } = this.state;
    const onSubmit = () => {
      NavService.navigate('Login')
    }
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Reset Password'}
        onBack={() => NavService.navigate('Login')}>
        <View style={styles.container}>
          <Formik
            innerRef={this.resetForm}
            onSubmit={values => this.onSubmit(values)}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={resetValidations}>
            {({ handleChange, values, handleSubmit, errors, resetForm }) => {
              return (
                <View style={[styles.container, { marginTop: 20 }]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <CustomText
                    text="Create New Password"
                    color={colors.white}
                    size={size.h4}
                    font={family.SofiaProBold}
                  />
                  <View style={styles.textNormal}>
                    <CTextfield
                      ref={password}
                      secureTextEntry={true}
                      inputLabel='Enter New Password'
                      placeholderTextColor={colors.white}
                      mode={'outlined'}
                      multiLine={false}
                      numberOfLines={1}
                      icon={appIcons?.lock}
                      iconColor={colors.primary}
                      outlineColor={colors.white}
                      bgColor={{ color: colors.white }}
                      activeOutlineColor={colors.primary}
                      values={values?.password}
                      error={errors?.password}
                    />
                    <CTextfield
                      ref={confirmPassword}
                      secureTextEntry={true}
                      inputLabel='Repeat Password'
                      placeholderTextColor={colors.white}
                      mode={'outlined'}
                      multiLine={false}
                      numberOfLines={1}
                      icon={appIcons?.lock}
                      iconColor={colors.primary}
                      outlineColor={colors.white}
                      bgColor={{ color: colors.white }}
                      activeOutlineColor={colors.primary}
                      values={values?.confirmPassword}
                      error={errors?.confirmPassword}
                    />
                    <CustomButton
                      title="Continue"
                      onPress={onSubmit}
                      buttonStyle={styles.SubmitBtn}
                      textStyle={styles.SubmitTitle}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </CustomBackground>
    );
  }
}

const actions = { resendPassword };
export default connect(null, actions)(ResetPassword);
