import React, { Component } from 'react';
import { BackHandler, Image, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import { appIcons, appLogos } from '../../../assets/index';
import CTextfield from '../../../components/CTextField';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import { resendPassword } from '../../../redux/actions/authAction';
import { colors, family, size } from '../../../utils';
import styles from './styles';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleBackButtonClick = () => {
    this?.props?.navigation.navigate('Login');
    return true;
  };

  componentDidMount() {
    BackHandler?.addEventListener(
      'hardwareBackPress',
      this?.handleBackButtonClick,
    );
    return () => {
      BackHandler?.removeEventListener(
        'hardwareBackPress',
        this?.handleBackButtonClick,
      );
    };
  }



  render() {
    const { password, confirmPassword, old_password } = this.state;
    const onSubmit = () => {
      if (!old_password) {
        Toast.show({
          text1: 'Old Password field can\'t be empty.',
          type: 'error',
          visibilityTime: 3000
        });
      }
      else if (!password) {
        Toast.show({
          text1: 'Password field can\'t be empty.',
          type: 'error',
          visibilityTime: 3000
        });
      }
      else if (!confirmPassword) {
        Toast.show({
          text1: 'Repeat Password field can\'t be empty.',
          type: 'error',
          visibilityTime: 3000
        })
      }
      else if (password !== confirmPassword) {
        Toast.show({
          text1: 'Passwords do not match.',
          type: 'error',
          visibilityTime: 3000
        });
      } else {
        const formdata = new FormData
        formdata.append('new_password', password)
        formdata.append('old_password', old_password)
        this.props.resendPassword(formdata);
      }
    };

    return (
      <CustomBackground
        showLogo={false}
        titleText={'Reset Password'}
        onBack={() => NavService.navigate('Login')}>
        <View style={styles.container}>

          <View style={[styles.container, { marginTop: 20 }]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomText
              text="Create New Password"
              color={colors.white}
              size={size.h4}
              font={family.SofiaProBold}
            />
            <View style={styles.textNormal}>
            <CTextfield
                secureTextEntry={true}
                inputLabel='Enter Old Password'
                placeholderTextColor={colors.white}
                mode={'outlined'}
                multiLine={false}
                numberOfLines={1}
                icon={appIcons?.lock}
                iconColor={colors.primary}
                outlineColor={colors.white}
                bgColor={{ color: colors.white }}
                activeOutlineColor={colors.primary}
                values={old_password}
                onChangeText={(text) => this.setState({ old_password: text })}
              />
              <CTextfield
                secureTextEntry={true}
                inputLabel='Enter New Password'
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
                values={confirmPassword}
                onChangeText={(text) => this.setState({ confirmPassword: text })}
              />
              <CustomButton
                title="Continue"
                onPress={onSubmit}
                buttonStyle={styles.SubmitBtn}
                textStyle={styles.SubmitTitle}
              />
            </View>
          </View>

        </View>
      </CustomBackground>
    );
  }
}

const actions = { resendPassword };
export default connect(null, actions)(ResetPassword);