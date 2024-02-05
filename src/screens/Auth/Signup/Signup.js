import React, {Component, createRef} from 'react';
import {Text, View, Pressable, Keyboard} from 'react-native';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import {appIcons, appImages} from '../../../assets/index';
import ProfileImage from '../../../components/ProfileImage';
import OutlineInput from '../../../components/OutlineInput';
import ImagePicker from '../../../components/ImagePicker';
import Img from '../../../components/Img';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import {signupValidations} from '../../../utils/validation';
import {colors} from '../../../utils';
import {signUpUser} from '../../../redux/actions/authAction';
import appStyles from '../../appStyles';
import ConfirmationModal from '../../../containers/Modal/ConfirmationModal';
import styles from './styles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bussinessProfileImage: null,
      phoneNumber: '',
      formattedPhoneNumber: '',
      verificationPopUp: false,
    };
    this.signupForm = createRef(null);
  }
  // onSubmit = async (values) => {
  //   let payload = {...values};
  //   payload['user_type'] = 'business';
  //   console.log('payload',payload)
  //   // this.props.signUpUser(payload);
  // }
  componentDidMount() {
    const {screen} = this.props.route.params;
    if (screen == 'Otp') {
      this.setState({verificationPopUp: true});
    }
  }
  onSubmit = values => {
    const {bussinessProfileImage, phoneNumber} = this.state;
    let payload = new FormData();
    if (values?.email !== '') {
      payload.append('email', values?.email);
    }
    if (values?.password !== '') {
      payload.append('password', values?.password);
    }

    payload.append('user_type', 'business');

    if (values?.fullName !== '') {
      payload.append('full_name', values?.fullName);
    }
    if (values?.bussinessName !== '') {
      payload.append('business_name', values?.bussinessName);
    }
    if (values?.einNo !== '') {
      payload.append('ein_number', values?.einNo);
    }
    if (values?.phoneNumber !== '') {
      payload.append('phone_number', values?.phoneNumber);
    }
    if (bussinessProfileImage !== '') {
      payload.append('profile_image', {
        uri: bussinessProfileImage?.path,
        name: `Profile${Date.now()}.${bussinessProfileImage?.mime.slice(
          bussinessProfileImage?.mime.lastIndexOf('/') + 1,
        )}`,
        type: bussinessProfileImage?.mime,
      });
    }
    // NavService.navigate('Otp',{
    //   screenName: 'signup',
    // })
    Keyboard.dismiss();
    this.props.signUpUser(payload);
  };

  render() {
    const {bussinessProfileImage, phoneNumber, verificationPopUp} = this.state;

    const updateImageInGallery = (path, mime, type) => {
      this.setState({bussinessProfileImage: {path, mime, type}});
    };
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Sign Up'}
        onBack={() => NavService.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.signupForm}
            onSubmit={values => this.onSubmit(values)}
            onReset={() => console.log('resetForm')}
            initialValues={{
              bussinessProfileImage: '',
              fullName: '',
              email: '',
              bussinessName: '',
              einNo: '',
              password: '',
              confirmPassword: '',
              phoneNumber: '',
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
                  <View style={[styles.container, {marginTop: 20}]}>
                    <ImagePicker
                      onImageChange={(path, mime, type) => {
                        updateImageInGallery(path, mime, type);
                        setFieldValue('bussinessProfileImage', path);
                      }}
                      style={{
                        ...appStyles.alignCenter,
                        ...appStyles.justifyCenter,
                      }}>
                      <ProfileImage
                        name={'UserName'}
                        innerAsset
                        imageUri={
                          bussinessProfileImage == null
                            ? appImages.profileImage
                            : {uri: bussinessProfileImage.path}
                        }
                        viewStyle={styles.profileImgView}
                        style={
                          bussinessProfileImage == null
                            ? styles.profileImg
                            : styles.bussinessProfileImage
                        }
                      />
                      <View style={styles.uploadIconCont}>
                        <Img
                          local
                          src={appIcons.upload}
                          style={styles.uploadIcon}
                        />
                      </View>
                      <CustomText
                        text={
                          errors?.bussinessProfileImage
                            ? errors?.bussinessProfileImage
                            : 'Upload Business Logo'
                        }
                        style={{
                          marginVertical: 15,
                          color: errors?.bussinessProfileImage
                            ? colors.red
                            : colors.black,
                          ...appStyles.family_SofiaPro_Regular,
                          ...appStyles.font14,
                        }}
                      />
                    </ImagePicker>
                    <View>
                      <OutlineInput
                        label="Full Name"
                        placeholder={'Full Name'}
                        leftIcon="account"
                        value={values?.fullName}
                        onChangeText={handleChange('fullName')}
                        error={errors?.fullName}
                        maxLength={30}
                      />
                      <OutlineInput
                        label="Email"
                        placeholder={'Email'}
                        leftIcon="email"
                        value={values?.email}
                        onChangeText={handleChange('email')}
                        error={errors?.email}
                        keyboardType={'email-address'}
                        maxLength={35}
                      />
                      <OutlineInput
                        label="Business Name"
                        placeholder={'Business Name'}
                        leftIcon={appIcons.bussinessName}
                        value={values?.bussinessName}
                        onChangeText={handleChange('bussinessName')}
                        error={errors?.bussinessName}
                        keyboardType={'default'}
                        maxLength={35}
                      />
                      {/* <CustomTextInput
                        leftIcon={appIcons.bussinessName}
                        placeholder={''}
                        value={}
                        onChangeText={handleChange('')}
                        label={'Bussniness Name'}
                        error={}
                        maxLength={30}
                      /> */}
                      <OutlineInput
                        label="Ein No"
                        placeholder={'Ein No'}
                        leftIcon="card-account-details-outline"
                        value={values?.einNo}
                        onChangeText={handleChange('einNo')}
                        error={errors?.einNo}
                        maxLength={9}
                        keyboardType="numeric"
                      />
                      <CustomPhoneInput
                        placeholder={'Phone Number'}
                        label={'Phone Number'}
                        error={errors?.phoneNumber}
                        placeholderTextColor={colors.black}
                        formattedPhoneNumber={this.state.formattedPhoneNumber} // Pass the prop from component's state
                        phoneNumber={phoneNumber}
                        onChangePhoneInput={(
                          phoneNumberFormat,
                          phoneNumber,
                        ) => {
                          this.setState({
                            formattedPhoneNumber: phoneNumberFormat,
                            phoneNumber: phoneNumber,
                          });
                          setFieldValue('phoneNumber', phoneNumberFormat);
                        }}
                        value={values?.phoneNumber}
                        // verticalLine
                        leftIcon={appIcons.phone}
                      />
                      <OutlineInput
                        label="Password"
                        placeholder={'Password'}
                        leftIcon="lock"
                        value={values?.password}
                        onChangeText={handleChange('password')}
                        error={errors?.password}
                        secureTextEntry
                        rightIcon="eye"
                        righticon="eye-off"
                        maxLength={30}
                      />
                      <OutlineInput
                        label="Confirm Password"
                        placeholder={'Confirm Password'}
                        leftIcon="lock"
                        value={values?.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        secureTextEntry
                        error={errors?.confirmPassword}
                        rightIcon="eye"
                        righticon="eye-off"
                        maxLength={30}
                      />
                    </View>
                    <CustomButton
                      title="Sign Up"
                      onPress={() => handleSubmit()}
                      buttonStyle={styles.signUpBtn}
                      textStyle={styles.signUpTitle}
                    />
                  </View>
                  <View style={styles.bottomView}>
                    <Text style={styles.textNormal}>
                      Already have an account?{' '}
                    </Text>
                    <Pressable
                      onPress={() => {
                        resetForm();
                        NavService.navigate('Login');
                      }}>
                      <Text style={styles.textNormalWithColor}>Login</Text>
                    </Pressable>
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

const actions = {signUpUser};
export default connect(null, actions)(Signup);
