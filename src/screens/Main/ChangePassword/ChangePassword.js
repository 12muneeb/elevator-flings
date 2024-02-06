import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import styles from './styles';
import { schema } from '../../../utils/validation';
import { connect } from 'react-redux';
import { changePassword } from '../../../redux/actions/authAction';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  };

  onSubmit = () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = this.state;

    if (!currentPassword) {
      Toast.show({
        text1: `Current Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!newPassword) {
      Toast.show({
        text1: `New Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (currentPassword == newPassword)
      return Toast.show({
        text1: "Current password and new password can't be same",
        type: 'error',
        visibilityTime: 3000,
      });
    else if (!schema.validate(newPassword)) {
      Toast.show({
        text1:
          'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!confirmPassword) {
      Toast.show({
        text1: `Confirm Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (newPassword != confirmPassword) {
      Toast.show({
        text1: 'New Password and Confirm Password must be same.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        new_password: newPassword,
        old_password:currentPassword
      };
      this.props.changePassword(payload);
    }
  };


  render() {
    const { currentPassword, newPassword, confirmPassword, } = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Change Password'}
      >
        <View style={styles.container}>
          <View style={[styles.container, { marginTop: 20 }]}>
            <View style={styles.textNormal}>
              <OutlineInput
                label="Current Password"
                placeholder={'Current Password'}
                leftIcon="lock"
                value={currentPassword}
                onChangeText={value => this.setState({ currentPassword: value })}
                secureTextEntry
                rightIcon="eye"
                righticon="eye-off"
              />
              <OutlineInput
                label="New Password"
                placeholder={'New Password'}
                leftIcon="lock"
                value={newPassword}
                onChangeText={value => this.setState({ newPassword: value })}
                secureTextEntry
                rightIcon="eye"
                righticon="eye-off"
              />
              <OutlineInput
                label="Confirm Password"
                placeholder={'Confirm Password'}
                leftIcon="lock"
                value={confirmPassword}
                onChangeText={value => this.setState({ confirmPassword: value })}
                secureTextEntry
                rightIcon="eye"
                righticon="eye-off"
              />
              <CustomButton
                title="Change Password"
                onPress={this.onSubmit}
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


const actions = {changePassword};
export default connect(null, actions)(ChangePassword);