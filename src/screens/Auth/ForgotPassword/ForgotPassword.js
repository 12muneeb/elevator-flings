import React, { Component, createRef } from 'react';
import { View, Image, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import { appIcons, appLogos } from '../../../assets';
import { forgotPassword } from '../../../redux/actions/authAction';
import { forgetValidation } from '../../../utils/validation';
import styles from './styles';
import NavService from '../../../helpers/NavService';
import CTextfield from '../../../components/CTextField';
import { colors, family, size } from '../../../utils';
import CustomText from '../../../components/CustomText';
import Toast from 'react-native-toast-message';
import * as EmailValidator from 'email-validator';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.forgotForm = createRef(null);
  }



  render() {
    const { email } = this.state;
    onSubmit = () => {
         if(!email){
            Toast.show({
              text1: 'Please enter your email address',
              type: 'error',
              visibilityTime: 3000,
            })
         } else if (!EmailValidator.validate(email)) {
          Toast.show({
            text1: 'Please enter a valid email address.',
            type: 'error',
            visibilityTime: 3000,
          });
        }
         
         else{
          NavService.navigate('Otp')
         }
    };
    return (
      <CustomBackground
        showLogo={false}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
         
          
                <View style={[styles.container]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <View style={styles.content}>
                    <CustomText
                      text="Forgot Password?"
                      color={colors.white}
                      size={size.h4}
                      font={family.SofiaProBold}
                    />
                    <CustomText
                      text="Enter Email"
                      color={colors.white}
                      size={size.small}
                      font={family.SofiaProRegular}
                    />
                  </View>
                  <View style={styles.textNormal}>
                    <CTextfield
                      secureTextEntry={false}
                      inputLabel='Email'
                      placeholder='email@example.com'
                      placeholderTextColor={colors.white}
                      mode={'outlined'}
                      multiLine={false}
                      numberOfLines={1}
                      icon={appIcons?.email}
                      iconColor={colors.primary}
                      outlineColor={colors.white}
                      bgColor={{ color: colors.white }}
                      activeOutlineColor={colors.primary}
                      values={email}
                      keyboardType={'email-address'}
                      onChangeText={(text) => this.setState({ email: text })}
                    />
                    <CustomButton
                      onPress={onSubmit}
                      title="Continue"
                      buttonStyle={styles.SubmitBtn}
                      textStyle={styles.SubmitTitle}
                    />
                  </View>
                </View>
          
       
        </View>
      </CustomBackground>
    );
  }
}

const actions = { forgotPassword };
export default connect(null, actions)(ForgotPassword);
