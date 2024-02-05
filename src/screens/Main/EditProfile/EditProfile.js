import React, {Component} from 'react';
import {ScrollView, View, Keyboard} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import styles from './styles';
import ProfileImage from '../../../components/ProfileImage';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils';
import {logoutUser, updateProfile} from '../../../redux/actions/authAction';
import {connect} from 'react-redux';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import Img from '../../../components/Img';
import ImagePicker from '../../../components/ImagePicker';
import appStyles from '../../appStyles';
import Toast from 'react-native-toast-message';
import OutlineInput from '../../../components/OutlineInput';
import {ASSETS_URL} from '../../../config/WebService';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bussinessProfileImage: null,
      fullName: this?.props?.user?.full_name,
      editFullName: '',
      phoneNumber: this?.props?.user?.phone_number,
      formattedPhoneNumber: '',
    };
  }

  onSubmit = () => {
    const {
      editFullName,
      phoneNumber,
      formattedPhoneNumber,
      bussinessProfileImage,
    } = this.state;
    const {user} = this.props;
    if (
      editFullName == '' &&
      bussinessProfileImage == null &&
      formattedPhoneNumber == ''
    ) {
      Toast.show({
        text1: 'Please update something',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      if (editFullName !== '') {
        payload.append('full_name', editFullName);
      }
      if (formattedPhoneNumber !== '') {
        payload.append('phone_number', formattedPhoneNumber);
      }
      if (bussinessProfileImage !== null) {
        payload.append('profile_image', {
          uri: bussinessProfileImage?.path,
          name: `Profile${Date.now()}.${bussinessProfileImage?.mime.slice(
            bussinessProfileImage?.mime.lastIndexOf('/') + 1,
          )}`,
          type: bussinessProfileImage?.mime,
        });
      }
      Keyboard.dismiss();
      this.props.updateProfile(payload, true);
    }
  };

  render() {
    const {fullName, phoneNumber, bussinessProfileImage} = this.state;
    const {user} = this.props;
    return (
      <AppBackground title={'Edit My Profile'} back marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainCont}>
            <ImagePicker
              onImageChange={(path, mime, type) => {
                this.setState({bussinessProfileImage: {path, mime, type}});
              }}
              style={{
                ...appStyles.alignCenter,
                ...appStyles.justifyCenter,
              }}>
              <ProfileImage
                name={user?.full_name}
                innerAsset={bussinessProfileImage == null ? true : false}
                size={110}
                imageUri={
                  bussinessProfileImage == null && user?.profile_image == ''
                    ? appImages.testimage
                    : user?.profile_image !== '' &&
                      bussinessProfileImage == null
                    ? {uri: ASSETS_URL + user?.profile_image}
                    : bussinessProfileImage?.path
                }
                viewStyle={styles.profileView}
                style={styles.profileImage}
              />
              <View style={styles.uploadCont}>
                <Img
                  local
                  src={appIcons.upload}
                  style={styles.uploadIcon}
                  resizeMode={'contain'}
                />
              </View>
              <CustomText
                text="Upload Bussiness Logo"
                style={styles.bussinesslogoTitle}
              />
            </ImagePicker>
            <View>
              <OutlineInput
                label={'Full Name'}
                placeholder={'Full Name'}
                leftIcon="account"
                value={fullName}
                onChangeText={value => {
                  this.setState({fullName: value, editFullName: value});
                }}
                maxLength={30}
              />
              <CustomPhoneInput
                placeholder={'Phone Number'}
                label={'Phone Number'}
                placeholderTextColor={colors.black}
                formattedPhoneNumber={this.state.formattedPhoneNumber} // Pass the prop from component's state
                phoneNumber={phoneNumber}
                onChangePhoneInput={(phoneNumberFormat, phoneNumber) =>
                  this.setState({
                    formattedPhoneNumber: phoneNumberFormat,
                    phoneNumber: phoneNumber,
                  })
                }
                value={phoneNumber}
                // verticalLine
                leftIcon={appIcons.phone}
                containerStyle={styles.input}
              />
            </View>
            <CustomButton
              title="Update Profile"
              buttonStyle={[styles.btnStyle, {marginBottom: 70}]}
              textStyle={styles.btnTitle}
              onPress={this.onSubmit}
            />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const actions = {logoutUser, updateProfile};
export default connect(mapStateToProps, actions)(Profile);
