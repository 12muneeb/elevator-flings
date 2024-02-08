import React, {Component} from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';
import {appIcons} from '../../../assets/index';
import CTextfield from '../../../components/CTextField';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import ImagePicker from '../../../components/ImagePicker';
import Img from '../../../components/Img';
import ProfileImage from '../../../components/ProfileImage';
import NavService from '../../../helpers/NavService';
import {completeProfile} from '../../../redux/actions/authAction';
import {colors, family} from '../../../utils';
import appStyles from '../../appStyles';
import styles from './styles';
import UploadCard from './UploadCard';
import CustomTextInput from '../../../components/CustomTextInput';
class CompleteProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bussinessProfileImage: null,
      isDatePickerVisible: false,
      name: '',
      Dob: '',
      selected: '',
    };
  }
  // onSubmit = async (values) => {
  //   let payload = {...values};
  //   payload['user_type'] = 'business';
  //   console.log('payload',payload)
  //   // this.props.signUpUser(payload);
  // }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleDateConfirm = date => {
    const formattedDate = date.toISOString().split('T')[0];
    this.setState({Dob: formattedDate});
    this.hideDatePicker();
  };

  render() {
    const {fullName, bussinessProfileImage, Dob, selected} = this.state;
    const data = [
      {key: '0', value: 'Male'},
      {key: '1', value: 'Female'},
    ];
    const onSubmit = () => {
      NavService.navigate('Description');
    };
    const updateImageInGallery = (path, mime, type) => {
      this.setState({bussinessProfileImage: {path, mime, type}});
    };

    return (
      <CustomBackground
        showLogo={false}
        titleText={'Set Profile'}
        onBack={() => NavService.goBack()}>
        <View style={styles.container}>
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
            </ImagePicker>
            <View style={{marginTop: '10%', gap: 15}}>
              <UploadCard />
              <CTextfield
                secureTextEntry={false}
                inputLabel="Name"
                placeholderTextColor={colors.gray}
                mode={'outlined'}
                multiLine={false}
                numberOfLines={1}
                iconColor={colors.primary}
                outlineColor={colors.gray}
                bgColor={{backgroundColor: colors.gray}}
                activeOutlineColor={colors.primary}
                toggleSecure
                values={fullName}
                onChangeText={text => this.setState({fullName: text})}
              />
              <CustomTextInput
                showSoftInputOnFocus={false}
                containerStyle={{
                  backgroundColor: colors.gray,
                  borderRadius: 10,
                }}
                maxLength={30}
                placeholder={'Exp Date'}
                value={this.state.Dob}
                placeholderColor={colors.lightGray}
                borderRadius={20}
                borderColor={colors.primary}
                onFocus={this.showDatePicker}
                handlePress={this.showDatePicker}
                inputStyle={{color: colors.lightGray}}
              />

              <SelectList
                setSelected={selected =>
                  this.setState({selected: data[selected]?.value})
                }
                fontFamily={family.SofiaProBold}
                data={data}
                arrowicon={
                  <Img
                    local
                    src={appIcons.downArrow}
                    style={styles.dropdownIcon}
                    resizeMode={'contain'}
                    tintColor={colors.lightGray}
                  />
                }
                search={false}
                boxStyles={styles.dropdown}
                placeholder="Gender"
                disabledCheckBoxStyles={styles.label}
                dropdownStyles={styles.label}
                dropdownTextStyles={styles.inputlabel}
                inputStyles={styles.inputlabel}
              />

              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleDateConfirm}
                onCancel={this.hideDatePicker}
                minimumDate={new Date()}
              />
              <CustomButton
                title="Continue"
                onPress={onSubmit}
                buttonStyle={styles.signUpBtn}
                textStyle={styles.signUpTitle}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

const actions = {completeProfile};
export default connect(null, actions)(CompleteProfile);
