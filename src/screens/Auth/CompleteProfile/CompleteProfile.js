import React, {Component, createRef} from 'react';
import {Text, View, Pressable, Platform, Keyboard} from 'react-native';
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
import {completeValidations} from '../../../utils/validation';
import {colors} from '../../../utils';
import {completeProfile} from '../../../redux/actions/authAction';
import appStyles from '../../appStyles';
import ConfirmationModal from '../../../containers/Modal/ConfirmationModal';
import styles from './styles';

class CompleteProfile extends Component {
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
    this.props.completeProfile(payload);
  };

  render() {
    const {bussinessProfileImage, phoneNumber, verificationPopUp} = this.state;

    const updateImageInGallery = (path, mime, type) => {
      this.setState({bussinessProfileImage: {path, mime, type}});
    };
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Complete Profile'}
        onBack={() => NavService.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.signupForm}
            onSubmit={values => this.onSubmit(values)}
            onReset={() => console.log('resetForm')}
            initialValues={{
              bussinessProfileImage: '',
              fullName: '',
              bussinessName: '',
              einNo: '',
              phoneNumber: '',
            }}
            validationSchema={completeValidations}>
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
                      <CustomTextInput
                        leftIcon={appIcons.bussinessName}
                        placeholder={'Bussniness Name'}
                        value={values?.bussinessName}
                        onChangeText={handleChange('bussinessName')}
                        label={'Bussniness Name'}
                        error={errors?.bussinessName}
                        maxLength={30}
                      />
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
                    </View>
                    <CustomButton
                      title="Submit"
                      onPress={() => handleSubmit()}
                      buttonStyle={styles.signUpBtn}
                      textStyle={styles.signUpTitle}
                    />
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

const actions = {completeProfile};
export default connect(null, actions)(CompleteProfile);
