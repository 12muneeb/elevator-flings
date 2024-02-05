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


  render() {
    const {bussinessProfileImage, phoneNumber, verificationPopUp} = this.state;

    const updateImageInGallery = (path, mime, type) => {
      this.setState({bussinessProfileImage: {path, mime, type}});
    };
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Set Profile'}
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
                  <View style={[styles.container, {marginTop: 50}]}>
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
                            ? appIcons.user
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
                          src={appIcons.plus}
                          style={styles.uploadIcon}
                          tintColor={colors.white}
                          resizeMode={'contain'}
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
                
                    <CustomButton
                      title="Continue"
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
