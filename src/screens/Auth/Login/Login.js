import * as EmailValidator from 'email-validator';
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { appIcons, appLogos } from '../../../assets/index';
import CTextfield from '../../../components/CTextField';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import { colors, family, size } from '../../../utils';
import { loginCurrentUser } from '../../../redux/actions/authAction';
import styles from './styles';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      verificationPopUp: false,
    };
  }


  render() {
    const { email, password, } = this.state;
    const OnCreate = () => {
      NavService.navigate('Signup');
    };
    const onSubmit = () => {

      if (!email) {
        Toast.show({
          text1: 'Email address field can`t be empty.',
          type: 'error',
          visibilityTime: 3000,
        });
      }
      else if (!EmailValidator.validate(email)) {
        Toast.show({
          text1: 'Please enter a valid email address.',
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!password) {
        Toast.show({
          text1: 'Password field can`t be empty.',
          type: 'error',
          visibilityTime: 3000,
        });
      }
      else {
        const formdata = new FormData
        formdata.append('email', email)
        formdata.append('password', password)
        formdata.append('user_type', 'user')
        formdata.append('device_type', 'android')
        formdata.append('device_token', '1233')
        this.props.loginCurrentUser(formdata)

      }
    }
    const onForget = () => {
      NavService.navigate('ForgotPassword');
    };

    return (
      <CustomBackground
        showLogo={false}
        onBack={() => this.props.navigation.goBack()}
      >
        <View style={styles.container}>
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
              <View style={styles.subcontent}>
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
                inputLabel="Email"
                placeholder="email@example.com"
                placeholderTextColor={colors.white}
                mode={'outlined'}
                multiLine={false}
                numberOfLines={1}
                icon={appIcons?.email}
                iconColor={colors.primary}
                outlineColor={colors.white}
                bgColor={{ color: colors.white }}
                labelStyle={{color:colors.white}}
                activeOutlineColor={colors.primary}
                keyboardType={'email-address'}
                values={email}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <CTextfield
                secureTextEntry={true}
                inputLabel="Password"
                placeholderTextColor={colors.white}
                mode={'outlined'}
                multiLine={false}
                numberOfLines={1}
                icon={appIcons?.lock}
                iconColor={colors.primary}
                outlineColor={colors.white}
                bgColor={{ color: colors.white }}
                activeOutlineColor={colors.primary}
                values={password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onForget}
                style={styles.forgot}
              >
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
                onPress={onSubmit}
                buttonStyle={styles.loginBtn}
                textStyle={styles.loginTitle}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}


const actions = { loginCurrentUser };
export default connect(null, actions)(Login);
