import React, { Component } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { appIcons, appLogos } from '../../../assets/index';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import { colors, family, size } from '../../../utils';
import styles from './styles';
import NavService from '../../../helpers/NavService';
import CTextfield from '../../../components/CTextField';
import Toast from 'react-native-toast-message';

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
    const { email, password } = this.state;
    const OnCreate = () => {
      NavService.navigate('Signup');
    };
   const onSubmit = () => {
      const { email, password } = this.state;
    
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
      }else if(!password){
        Toast.show({
          text1: 'Password field can`t be empty.',
          type: 'error',
          visibilityTime: 3000,
        });
      }
      else{
Alert.alert('ss')
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
                activeOutlineColor={colors.primary}
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

// const actions = { loginCurrentUser };
export default connect()(Login);
