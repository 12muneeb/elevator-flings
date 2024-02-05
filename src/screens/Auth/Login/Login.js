import { Formik } from 'formik';
import React, { Component, createRef } from 'react';
import {
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { appIcons, appLogos } from '../../../assets/index';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import { loginCurrentUser } from '../../../redux/actions/authAction';
import { colors, family, size } from '../../../utils';
import { loginValidations } from '../../../utils/validation';
import styles from './styles';
import NavService from '../../../helpers/NavService';
import CTextfield from '../../../components/CTextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationPopUp: false,
    };
    this.loginForm = createRef(null);
  }



  render() {
    const { email, password } = this.state;
    const OnCreate = () => {
      NavService.navigate('Signup');
    }
    const onForget = () => {
      NavService.navigate('ForgotPassword')
    }
    return (
      <CustomBackground
        showLogo={false}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.loginForm}
            onSubmit={values => this.onSubmit(values)}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidations}>
            {({ handleChange, values, handleSubmit, errors, resetForm }) => {
              return (
                <View style={[styles.container, { marginTop: 20 }]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <View style={styles.content}>
                    <CustomText
                      text="Welcome back!"
                      color={colors.white}
                      size={size.h4}
                      font={family.SofiaProBold}
                    />
                    <View
                      style={styles.subcontent}>
                      <CustomText
                        text="Login below or"
                        color={colors.white}
                        size={size.small}
                        font={family.SofiaProRegular}
                      />
                      <TouchableOpacity activeOpacity={0.8} onPress={OnCreate}>
                        <CustomText
                          text=" Create an Account"
                          color={colors.primary}
                          size={size.small}
                          font={family.SofiaProBold}
                          style={styles.textStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.postion}>
                    <CTextfield
                      ref={email}
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
                      values={values?.email}
                      error={errors?.email}
                    />
                    <CTextfield
                      ref={password}
                      secureTextEntry={true}
                      inputLabel='Passoword'
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
                    <TouchableOpacity activeOpacity={0.8} onPress={onForget} style={styles.forgot}>
                      <CustomText
                        text="Forgot Password?"
                        color={colors.white}
                        size={size.small}
                        font={family.SofiaProBold}
                        style={styles.textStyle}
                      />
                    </TouchableOpacity>
                    <CustomButton
                      title="Sign in"
                      onPress={() => handleSubmit()}
                      buttonStyle={styles.loginBtn}
                      textStyle={styles.loginTitle}
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
const actions = { loginCurrentUser };
export default connect(null, actions)(Login);
