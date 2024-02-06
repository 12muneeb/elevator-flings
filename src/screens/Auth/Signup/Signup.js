import React, { Component, createRef } from 'react';
import { Text, View, Pressable, Keyboard, Image, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import { appIcons, appImages, appLogos } from '../../../assets/index';
import ProfileImage from '../../../components/ProfileImage';
import ImagePicker from '../../../components/ImagePicker';
import Img from '../../../components/Img';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import { signupValidations } from '../../../utils/validation';
import { colors, family, size } from '../../../utils';
import { signUpUser } from '../../../redux/actions/authAction';
import appStyles from '../../appStyles';
import ConfirmationModal from '../../../containers/Modal/ConfirmationModal';
import styles from './styles';
import CTextfield from '../../../components/CTextField';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationPopUp: false,
    };
    this.signupForm = createRef(null);
  }



  render() {
    const { email, password, confirmPassword } = this.state;
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
      else if (password !== confirmPassword) {
        Toast.show({
          text1: 'Passwords do not match.',
          type: 'error',
          visibilityTime: 3000
        });
      }
      else {
        NavService.navigate('Otp')
      }
    }

    const OnCreate = () => {
      NavService.navigate('Login');
    }
  
    return (
      <CustomBackground
        showLogo={false}
        onBack={() => NavService.goBack()}>
        <View style={styles.container}>
        
                  <View style={[styles.container, { marginTop: 20 }]}>

                    <View style={styles.logoStyle}>
                      <Image style={styles.appLogo} source={appLogos.appLogo} />
                    </View>
                    <View style={styles.content}>
                      <CustomText
                        text="Create account"
                        color={colors.white}
                        size={size.h4}
                        font={family.SofiaProBold}
                      />
                      <View
                        style={styles.subcontent}>
                        <CustomText
                          text="Enter your account details below"
                          color={colors.white}
                          size={size.small}
                          font={family.SofiaProRegular}
                        />
                        <TouchableOpacity activeOpacity={0.8} onPress={OnCreate}>
                          <CustomText
                            text=" Login"
                            color={colors.primary}
                            size={size.small}
                            font={family.SofiaProBold}
                            style={styles.textStyle}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>

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
                        toggleSecure
                        values={email}
                        onChangeText={(text) => this.setState({ email: text })}
                        keyboardType={'email-address'}
                      />
                      <CTextfield
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
                        toggleSecure
                        values={password}
                        onChangeText={(text) => this.setState({ password: text })}
                      />
                      <CTextfield
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
                        toggleSecure
                        values={confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}

                      />
                      <CustomButton
                        title="Sign Up"
                        onPress={onSubmit}
                        buttonStyle={styles.signUpBtn}
                        textStyle={styles.signUpTitle}
                      />
                    </View>
                    <View style={styles.bottomcontainer}>
                      <CustomText
                        text="Or Signup With"
                        color={colors.white}
                        size={size.large}
                        font={family.SofiaProBold}
                      />
                      <View style={styles.imagecontainer}>
                        <TouchableOpacity style={styles.imgtouchable} activeOpacity={0.8}>
                          <Img local src={appImages.facebook} resizeMode={'contain'} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imgtouchable} activeOpacity={0.8}>
                          <Img local src={appImages.google} resizeMode={'contain'} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imgtouchable} activeOpacity={0.8}>
                          <Img local src={appImages.apple} resizeMode={'contain'} style={styles.img} />
                        </TouchableOpacity>

                      </View>
                    </View>
                  </View>

             
        </View>
      </CustomBackground>
    );
  }
}

const actions = { signUpUser };
export default connect(null, actions)(Signup);
