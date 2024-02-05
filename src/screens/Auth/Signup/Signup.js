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
import OutlineInput from '../../../components/OutlineInput';
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


    const OnCreate = () => {
      NavService.navigate('Login');
    }
    const onSubmit = () => {
     NavService.navigate('Otp')
    }
    return (
      <CustomBackground
        showLogo={false}
        onBack={() => NavService.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.signupForm}
            onSubmit={values => console.log('values', values)}

            onReset={() => console.log('resetForm')}
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signupValidations}>
            {({
              handleChange,
              values,
              handleSubmit,
              setFieldValue,
              errors,
              resetForm,
            }) => {
              console.log('errors', values);
              return (
                <>
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
                        toggleSecure
                        values={values}
                        error={errors?.password}
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
                        toggleSecure
                        values={values}
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
                        toggleSecure
                        values={values}
                        error={errors?.confirmPassword}

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

                </>
              );
            }}
          </Formik>
        </View>
      </CustomBackground>
    );
  }
}

const actions = { signUpUser };
export default connect(null, actions)(Signup);
