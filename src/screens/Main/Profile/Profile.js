import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import AppBackground from '../../../components/AppBackground';
import ProfileImage from '../../../components/ProfileImage';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils';
import {openLink} from '../../../helpers/BrowserUrl';
import Img from '../../../components/Img';
import ConfirmationModal from '../../../containers/Modal/ConfirmationModal';
import UserListModal from '../../../containers/Modal/UserListModal';
import {
  getBlockedUsers,
  toggleBlockListUser,
} from '../../../redux/actions/appAction';
import {
  logoutUser,
  deleteCurrentUser,
  logoutCurrentUser,
  updateProfile,
} from '../../../redux/actions/authAction';
import NavService from '../../../helpers/NavService';
import {ASSETS_URL} from '../../../config/WebService';
import styles from './styles';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      blockedListModal: false,
      refreshing: false,
      blockedUsersList: [],
      password: '',
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchBlockusers();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchBlockusers = () => {
    this.props.getBlockedUsers(users => {
      this.setState({blockedUsersList: users});
    });
  };
  onUpdateNotification = type => {
    const param = {type:"notification",on:type}
    let payload = new FormData();
    payload.append('push_notification', type);
    this.props.updateProfile(payload, false,param);
  };
  onSubmit = async values => {
    const params = {
      key: 'password',
      value: values?.password,
    };
    console.log('payload', params);
    this.setState({modalVisible: !this.state.modalVisible}, () => {
      this.props.deleteCurrentUser(params);
    });
  };
  unBlockPress = user => {
    let payload = {block_user_id: user?.block_user_id, type: 'unblock'};
    console.log('payload', payload);
    this.props.toggleBlockListUser(payload, response => {
      if (response?.status == 1) {
        this.fetchBlockusers();
      }
    });
  };
  render() {
    const {modalVisible, blockedListModal, blockedUsersList, refreshing} =
      this.state;
    const {user} = this.props;

    return (
      <AppBackground title={'My Profile'} edit message marginHorizontal={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                this.setState({refreshing: true});
                await this.fetchBlockusers();
                this.setState({refreshing: false});
              }}
            />
          }>
          <View style={styles.mainCont}>
            <ProfileImage
              name={user?.business_name}
              innerAsset
              size={110}
              imageUri={
                user?.profile_image
                  ? {uri: ASSETS_URL + user?.profile_image}
                  : appImages.testimage
              }
              viewStyle={styles.profileView}
              style={styles.profileImage}
            />
            <CustomText text={user?.full_name} style={styles.userName} />
            <View style={styles.infoCont}>
              <View style={[styles.flexRow, styles.infoSubCont]}>
                <CustomText text="Bussiness Name" style={styles.userName} />
                <CustomText
                  text={user?.business_name}
                  style={styles.userName}
                />
              </View>
              {user?.email && (
                <>
                  <View style={styles.horizontalLine} />
                  <View style={[styles.flexRow, styles.infoSubCont]}>
                    <CustomText text="Email Address" style={styles.userName} />
                    <CustomText text={user?.email} style={styles.userName} />
                  </View>
                </>
              )}
              <View style={styles.horizontalLine} />
              <View style={[styles.flexRow, styles.infoSubCont]}>
                <CustomText text="Phone Number" style={styles.userName} />
                <CustomText
                  text={`+${user?.phone_number}`}
                  style={styles.userName}
                />
              </View>
            </View>
            <View style={[styles.flexRow, styles.notiCont]}>
              <CustomText text={'Notifcations'} style={styles.notiTitle} />
              <ToggleSwitch
                isOn={user?.push_notification == 1 ? true : false}
                onToggle={() =>
                  this.onUpdateNotification(
                    user?.push_notification == 1 ? 0 : 1,
                  )
                }
                trackOnStyle={styles.trackonstyle}
                trackOffStyle={styles.trackoff}
                thumbOnStyle={styles.thumb}
                thumbOffStyle={styles.thumboff}
                onColor={colors.primary}
                offColor={colors.secondary}
                size="small"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                this.setState({blockedListModal: !blockedListModal})
              }
              style={[styles.flexRow, styles.btn]}>
              <CustomText text={'Blocked Profiles'} style={styles.btnTitle} />
              <Img
                local
                src={appIcons.rightArrow}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {user?.is_social == 0 ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => NavService.navigate('ChangePassword')}
                  style={[styles.flexRow, styles.btn]}>
                  <CustomText
                    text={'Change Password'}
                    style={styles.btnTitle}
                  />
                  <Img
                    local
                    src={appIcons.rightArrow}
                    style={styles.arrowIcon}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </>
            ) : (
              []
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => openLink('https://google.com')}
              style={[styles.flexRow, styles.btn]}>
              <CustomText
                text={'Terms and Conditions'}
                style={styles.btnTitle}
              />
              <Img
                local
                src={appIcons.rightArrow}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => openLink('https://google.com')}
              style={[styles.flexRow, styles.btn]}>
              <CustomText text={'Privacy Poilicy'} style={styles.btnTitle} />
              <Img
                local
                src={appIcons.rightArrow}
                style={styles.arrowIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>

            <CustomButton
              title="Delete Account"
              buttonStyle={[
                styles.btnStyle,
                {backgroundColor: colors.secondary},
              ]}
              textStyle={styles.btnTitle}
              onPress={() => this.setState({modalVisible: !modalVisible})}
            />
            <CustomButton
              title="Logout"
              buttonStyle={[styles.btnStyle, {marginBottom: 70}]}
              textStyle={styles.btnTitle}
              onPress={() => {
                this.props.logoutCurrentUser();
              }}
            />
            <ConfirmationModal
              isModalVisible={modalVisible}
              Title="Are you sure"
              currentfocus={this}
              SubTitle="Do you really want to delete your profile?"
              deleteProfileBtn
              onPress={values => this.onSubmit(values)}
              togglePopup={() => this.setState({modalVisible: !modalVisible})}
            />
            <UserListModal
              isModalVisible={blockedListModal}
              togglePopup={() =>
                this.setState({blockedListModal: !blockedListModal})
              }
              Title={'Blocked Profiles'}
              users={blockedUsersList}
              confirmationPopUp
              screenName={'Blocked Profiles'}
              unBlockPress={this.unBlockPress}
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
const actions = {
  logoutUser,
  logoutCurrentUser,
  deleteCurrentUser,
  updateProfile,
  getBlockedUsers,
  toggleBlockListUser,
};
export default connect(mapStateToProps, actions)(Profile);
